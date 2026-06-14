import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPlateById, toggleWatch, makeOffer, getOffers, respondToOffer } from '../api/plates';
import api from '../api/client';
const PlateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [plate, setPlate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerMsg, setOfferMsg] = useState('');
  const [offerSent, setOfferSent] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [offers, setOffers] = useState([]);
  const [showOffers, setShowOffers] = useState(false);
  useEffect(() => { const fetchPlate = async () => { try { const { data } = await getPlateById(id); setPlate(data); setIsWatching(data.is_watching || false); } catch (err) { setError('Plate not found'); } finally { setLoading(false); } }; fetchPlate(); }, [id]);
  const handleWatch = async () => { if (!user) { navigate('/login', { state: { from: `/plates/${id}` } }); return; } const r = await toggleWatch(id); setIsWatching(r.data.watching); };
  const handleOffer = async (e) => { e.preventDefault(); if (!user) { navigate('/login', { state: { from: `/plates/${id}` } }); return; } await makeOffer(id, { amount: parseFloat(offerAmount), message: offerMsg }); setOfferSent(true); };
  const loadOffers = async () => { const { data } = await getOffers(id); setOffers(data); setShowOffers(true); };
  const handleOfferResponse = async (offerId, status) => { await respondToOffer(offerId, status); loadOffers(); if (status === 'accepted') { const { data } = await getPlateById(id); setPlate(data); } };
  const fmt = (p) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);
  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!plate) return null;
  const isSeller = user && plate.seller_id === user.id;
  return (
    <div className="car-detail">
      <div className="gallery">
        <div className="main-image"><img src={plate.images?.[activeImage]?.url || '/placeholder-plate.jpg'} alt={plate.title} /></div>
        {plate.images?.length > 1 && <div className="thumbnails">{plate.images.map((img, i) => <button key={i} className={i === activeImage ? 'active' : ''} onClick={() => setActiveImage(i)}><img src={img.url} alt="" /></button>)}</div>}
      </div>
      <div className="info-section">
        <div className="plate-hero"><div className="plate-badge">{plate.plate_text}</div></div>
        <h1>{plate.title}</h1>
        <p className="price">{fmt(plate.price)}</p>
        {!isSeller && plate.status === 'available' && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <button className="btn-buy" onClick={handleWatch}>{isWatching ? 'Watching' : 'Watch'}</button>
          </div>
        )}
        <div className="specs-grid">
          <div><span>Jurisdiction</span><strong>{plate.jurisdiction}</strong></div>
          <div><span>Type</span><strong className="plate-type">{plate.type}</strong></div>
          <div><span>Condition</span><strong>{plate.condition}</strong></div>
          <div><span>Transferable</span><strong>{plate.transferable ? 'Yes' : 'No'}</strong></div>
          <div><span>Views</span><strong>{plate.views_count}</strong></div>
          <div><span>Watchers</span><strong>{plate.watchers_count}</strong></div>
        </div>
        {plate.description && <div className="description"><h3>Description</h3><p>{plate.description}</p></div>}
        {plate.categories?.length > 0 && <div className="description"><h3>Categories</h3><p>{plate.categories.map(c => c.name).join(', ')}</p></div>}
        {isSeller && <div className="seller-actions"><button onClick={loadOffers} className="btn-buy">View Offers ({plate.watchers_count})</button></div>}
        {showOffers && (
          <div className="description"><h3>Offers</h3>
            {offers.length === 0 ? <p>No offers yet</p> : offers.map(o => <div key={o.id} className="offer-item"><p><strong>{o.buyer_name}</strong> offered {fmt(o.amount)}</p><p>{o.message}</p><p className="status">{o.status}</p>{o.status === 'pending' && <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><button onClick={() => handleOfferResponse(o.id, 'accepted')}>Accept</button><button onClick={() => handleOfferResponse(o.id, 'rejected')}>Decline</button></div>}</div>)}
          </div>
        )}
        {!isSeller && plate.status === 'available' && (
          <div className="contact-box">
            <h3>Make an Offer</h3>
            {offerSent ? <p className="success">Offer sent! The seller will be in touch.</p> : (
              <form onSubmit={handleOffer}>
                <input type="number" placeholder="Your offer amount" value={offerAmount} onChange={e => setOfferAmount(e.target.value)} required style={{ width: '100%', padding: 12, marginBottom: 12, border: '1px solid #e0e0e0', borderRadius: 8 }} />
                <textarea placeholder="Message to seller (optional)" value={offerMsg} onChange={e => setOfferMsg(e.target.value)} rows={3} style={{ width: '100%', padding: 12, marginBottom: 12, border: '1px solid #e0e0e0', borderRadius: 8, resize: 'vertical' }} />
                <button type="submit" className="btn-buy">Send Offer</button>
              </form>
            )}
          </div>
        )}
        {plate.status === 'sold' && <div className="description"><p className="status sold">This plate has been sold.</p></div>}
      </div>
    </div>
  );
};
export default PlateDetail;

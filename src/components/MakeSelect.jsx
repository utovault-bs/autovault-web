import { useState, useEffect, useRef } from 'react';
const MAKES = ['Acura','Audi','BMW','Buick','Cadillac','Chevrolet','Chrysler','Dodge','Ford','GMC','Honda','Hyundai','Infiniti','Jaguar','Jeep','Kia','Land Rover','Lexus','Lincoln','Mazda','Mercedes-Benz','Mini','Mitsubishi','Nissan','Porsche','Ram','Subaru','Tesla','Toyota','Volkswagen','Volvo'];
const SIMPLE_SLUGS = { Acura:'acura',Audi:'audi',BMW:'bmw',Cadillac:'cadillac',Chevrolet:'chevrolet',Chrysler:'chrysler',Ford:'ford',Honda:'honda',Hyundai:'hyundai',Infiniti:'infiniti',Jeep:'jeep',Kia:'kia',Mazda:'mazda',Mini:'mini',Mitsubishi:'mitsubishi',Nissan:'nissan',Porsche:'porsche',Ram:'ram',Subaru:'subaru',Tesla:'tesla',Toyota:'toyota',Volkswagen:'volkswagen',Volvo:'volvo' };
const MakeLogo = ({ make, size }) => {
  const [errored, setErrored] = useState(false);
  if (!make) return null;
  const slug = SIMPLE_SLUGS[make];
  const src = slug ? `https://cdn.simpleicons.org/${slug}/eee` : '';
  return errored ? <span className="make-logo-fallback" style={{width: size||24,height: size||24}}>{make[0]}</span> : <img className="make-logo" src={src} alt={make} style={{width: size||24,height: size||24}} onError={() => setErrored(true)} loading="lazy" />;
};
const MakeSelect = ({ value, onChange, placeholder, required }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  const select = (v) => { onChange(v); setOpen(false); };
  return <div className="make-select-wrapper" ref={ref}><button type="button" className="make-select-trigger" onClick={() => setOpen(!open)}>{value ? <><MakeLogo make={value} size={24} /><span>{value}</span></> : <span className="make-placeholder">{placeholder || 'Select Make'}</span>}<svg className="make-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>{open && <div className="make-select-dropdown">{MAKES.map(m => <button key={m} type="button" className={`make-option${m === value ? ' selected' : ''}`} onClick={() => select(m)}><MakeLogo make={m} size={24} /><span>{m}</span>{m === value && <svg className="check" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}</button>)}</div>}{required && !value && <input tabIndex={-1} autoComplete="off" style={{position:'absolute',opacity:0,height:0,width:0}} required />}</div>;
};
export { MAKES, MakeSelect as default };

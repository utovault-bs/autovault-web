import { Link } from 'react-router-dom';
const TermsPage = () => (
  <div className="terms-page">
    <p className="terms-notice"><strong>Disclaimer:</strong> This is a template terms of service document and does not constitute legal advice. You should consult with a qualified attorney to ensure compliance with applicable laws.</p>
    <h1>Terms &amp; Conditions</h1>
    <p className="terms-effective">Last updated: June 2026</p>
    <section><h2>1. Acceptance of Terms</h2><p>By accessing or using AutoVault ("the Platform"), you agree to be bound by these Terms &amp; Conditions. If you do not agree, do not use the Platform.</p></section>
    <section><h2>2. Service Description</h2><p>AutoVault is a marketplace platform that connects buyers and sellers of used vehicles and license plates. AutoVault facilitates listings and communications but is not a party to any transaction between users. All transactions are solely between the buyer and seller.</p></section>
    <section><h2>3. Eligibility</h2><p>You must be at least 18 years old to use the Platform. By registering, you represent that all information you provide is accurate and complete.</p></section>
    <section><h2>4. Accounts</h2><p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use. AutoVault reserves the right to suspend or terminate accounts at its discretion.</p></section>
    <section><h2>5. Listings</h2><p>Sellers must provide accurate, truthful information about their listings, including condition, price, mileage, and title status. Sellers represent that they own the item or have legal authority to sell it. Prohibited items include stolen goods, counterfeit items, and any items whose sale violates applicable law.</p></section>
    <section><h2>6. Buying</h2><p>Buyers are responsible for conducting their own due diligence, including vehicle inspections, title checks, and verification of seller claims. AutoVault does not inspect, endorse, or guarantee any listing. All purchases are at the buyer's own risk.</p></section>
    <section><h2>7. Fees &amp; Payments</h2><p>Payments are processed through Stripe. Any applicable listing or transaction fees will be disclosed at the time of listing. AutoVault reserves the right to change its fee structure with reasonable notice.</p></section>
    <section><h2>8. Prohibited Conduct</h2><p>You agree not to: engage in fraud, misrepresent any information, harass other users, post prohibited or illegal items, attempt to circumvent platform fees, or use the Platform for any unlawful purpose.</p></section>
    <section><h2>9. Intellectual Property</h2><p>All content on the Platform, including logos, text, and design, is owned by AutoVault. Users grant AutoVault a non-exclusive license to display their listing content on the Platform.</p></section>
    <section><h2>10. Disclaimers</h2><p>The Platform is provided "as is" and "as available" without warranties of any kind, express or implied. AutoVault does not guarantee that listings are accurate, that transactions will be completed, or that the Platform will be uninterrupted or error-free.</p></section>
    <section><h2>11. Limitation of Liability</h2><p>To the fullest extent permitted by law, AutoVault shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform, including but not limited to disputes between users, failed transactions, or loss of data.</p></section>
    <section><h2>12. Indemnification</h2><p>You agree to indemnify and hold harmless AutoVault, its affiliates, and its employees from any claims, damages, or expenses arising from your use of the Platform, your violation of these terms, or your transactions with other users.</p></section>
    <section><h2>13. Dispute Resolution</h2><p>Any dispute arising out of or relating to these terms shall be resolved through binding arbitration in accordance with the American Arbitration Association's rules. The arbitration shall take place in the state of Delaware. You waive the right to participate in a class action.</p></section>
    <section><h2>14. Governing Law</h2><p>These terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.</p></section>
    <section><h2>15. Termination</h2><p>AutoVault may suspend or terminate your account at any time, with or without cause, without prior notice. Upon termination, your right to use the Platform immediately ceases.</p></section>
    <section><h2>16. Changes to Terms</h2><p>AutoVault reserves the right to modify these terms at any time. Changes will be posted on this page with an updated effective date. Continued use of the Platform after changes constitutes acceptance.</p></section>
    <section><h2>17. Contact</h2><p>For questions about these terms, contact us through the Platform or at the address listed on our website.</p></section>
    <p className="terms-back"><Link to="/">← Back to AutoVault</Link></p>
  </div>
);
export default TermsPage;

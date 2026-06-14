# AutoVault — Pages Feature Checklist

| Page | Route | Auth | Key Features |
|------|-------|------|-------------|
| **Browse** | `/` | Public | Full filter panel: make, fuel type, transmission, body style, price range (min/max). Sort: newest, price (asc/desc), year (asc/desc), mileage (asc). Pagination with prev/next. No-results state with tip to adjust filters. |
| **Login** | `/login` | Public | Email + password form. Error display for bad credentials. "Don't have an account? Create one" link to register. |
| **Register** | `/register` | Public | Name, email, phone (optional), password fields. Client-side validation (min 6 chars). Error display. "Already have an account?" link to login. |
| **Car Detail** | `/cars/:id` | Public | Image gallery — main image + thumbnail strip. Specs grid: mileage, transmission, fuel type, body style, exterior color, interior color, engine, drivetrain. Description section. Seller info (name). Buy Now button — redirects to login if unauthenticated, checkout if authenticated. "Ask a Question" message form. SOLD badge if unavailable. |
| **Sell Car** | `/sell` | Auth | Full listing form in 2-column grid: make (dropdown), model, year, trim, price, mileage, transmission, fuel type, body style, exterior color, interior color, engine. Single fields: drivetrain, description textarea. Image upload — multiple files, progress bar per upload batch. Submit creates listing and redirects to browse. |
| **Checkout** | `/checkout/:id` | Auth | Order summary card (car image + details + price). Card payment form: cardholder name, card number, expiry, CVC. Submit creates Stripe payment intent and confirms order. SOLD guard — prevents buying already-sold cars. |
| **Order Success** | `/order-success` | Auth | Green checkmark icon. "Purchase Successful!" heading. Amount paid display. "What's next" box — seller contacts within 24h. Links: Browse More Cars, View Messages. |
| **Messages** | `/messages` | Auth | Two-panel layout. Left: conversation list showing participant names + last message preview. Right: message thread with own/other message bubble styling. Send message input at bottom. Auto-scroll to latest message. |
| **Admin** | `/admin` | Admin only | Stats row: total cars, active listings, total users, revenue. Tab switcher: Users / Listings. Users table: name, email, role, listing count, delete button (non-admin only). Listings table: title (year/make/model), price, seller name, status, delete button. |

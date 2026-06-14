# AutoVault — Kimi AI Conversation Summary

## Why a Used Car Marketplace

The user wanted a dedicated used car marketplace to avoid the problems with Craigslist, Facebook Marketplace, and OfferUp — spam listings, unreliable sellers, no built-in payment or messaging, and a poor browsing experience. AutoVault was designed as a streamlined, all-in-one platform where buyers can search, message, and buy, and sellers can easily list their cars.

## Why These Pages Exist

### Browse (`/`)
The most important page. Car shopping is about narrowing down options — users don't want to scroll through everything. Heavy filtering (make, fuel type, transmission, body style, price range) and sorting (price, year, mileage) are essential. Pagination over infinite scroll because car shopping is methodical, not casual.

### Login / Register
Users need accounts to sell, buy, or message. The Kimi discussion emphasized keeping it simple — email + password, no social login complexity. Phone number is optional because some buyers/sellers prefer text communication.

### Car Detail (`/cars/:id`)
This is the decision page. The Kimi convo stressed showing **all specs at a glance** in a grid layout — no expansion clicks, no tabs hiding information. The image gallery with thumbnails is critical because car buyers judge condition from photos. The "Ask a Question" form directly below the buy button makes it easy to get answers without leaving the page.

### Sell Car (`/sell`)
The Kimi discussion focused on making listing easy but comprehensive. A 2-column grid for the form fields (vs a single long column) to reduce scroll fatigue. Image upload with progress feedback — car photos are large files and users need to know their upload is working. Required fields vs optional strikes a balance between completeness and ease of entry.

### Checkout (`/checkout/:id`)
Simplified checkout — no user account creation required beyond login, no shipping address (car is picked up), no tax calculations. Just an order summary and card form. The Kimi convo highlighted showing the car image + price in the summary so the buyer confirms they're buying the right car.

### Order Success
A confirmation page that tells the buyer what happens next. The Kimi discussion emphasized this as a trust-building moment — the buyer just paid thousands of dollars, and they need clear next steps. The "seller will contact within 24 hours" message sets expectations.

### Messages (`/messages`)
The Kimi convo called for a chat-app-style messaging interface, not email-style. Conversation list on the left, message thread on the right. Own messages styled differently (dark bubble) for clarity. This speeds up the back-and-forth that car deals require.

### Admin (`/admin`)
The user (as site owner) needs visibility into the platform. Stats cards for at-a-glance numbers, tabbed tables for full data. Delete buttons for moderation — remove spam listings or problem users. The Kimi discussion kept admin features minimal: no editing, just monitoring and removal.

## Key Design Decisions from the Conversation

1. **No heavy framework** — plain React with Vite, no TypeScript complexity, no CSS framework
2. **Snake_case API** — backend uses snake_case column names, frontend matches them directly
3. **Conversation-based messaging** — groups messages by car listing, tracks participants per conversation
4. **Stripe in test mode** — real payment infrastructure without needing a live merchant account
5. **Cloudinary for images** — handles resizing and CDN delivery without custom image processing
6. **Auth via JWT** — simple token-based auth stored in localStorage, no OAuth complexity
7. **Render + Vercel** — backend on Render (free tier with cold start), frontend on Vercel (zero-config deployment)

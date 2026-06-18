# VehiclePage — Design Spec

**Route**: `/`

The main vehicle marketplace page. Shows all vehicle types (cars, trucks, mini trucks).

---

## Layout (top to bottom)

1. **Navbar** — Logo + Vehicles | Budget ▾ ($5k/$10k/$15k/$20k) | Plates | Sell Car | Sell Plate | Sign In / Get Started

2. **Featured carousel**
   - Fading 5-image carousel of newest vehicles
   - Each card: image (left) + info (right) + "Featured" badge
   - Dot navigation below
   - Fetches ALL vehicle types (no body_style filter)

3. **Browse-header**
   - Title: "Find Your Next Car"
   - Subtitle: short description
   - **Removed**: "List Your Car" button (only on `/sell`)

4. **CarFilters**
   - Full filter panel (make, model, min/max price, body_style, transmission, fuel, location, etc.)

5. **View toggle**
   - "Grid" / "List" buttons
   - Right-aligned
   - Active state: red

6. **Car grid** — heading **"Recommended for You"** above the grid

7. **Pagination**

8. **Footer**

---

## States

| State | What shows |
|-------|-----------|
| Default (no hash) | Featured + browse-header + filters + toggle + grid + pagination + footer |
| Loading | Spinner |
| Empty results | "No cars found" message |
| Error | Error message |

---

## Colour Scheme (Root)

- Background: `#000`
- Surface: `#111`
- Text: `#fff`
- Accent: `#dc2626`
- Borders: `#333`

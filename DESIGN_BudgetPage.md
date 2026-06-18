# BudgetPage — Design Spec

**Route**: `/budget/:amount` (e.g. `/budget/5000`, `/budget/10000`, `/budget/15000`, `/budget/20000`)

Shows vehicles filtered by a selected budget amount. User clicks Budget▾ in navbar, selects an amount, and lands here with that amount pre-filled into the Max Price filter.

---

## Layout (top to bottom)

1. **Navbar** — Same as VehiclePage

2. **Browse-header**
   - Title: "Vehicles Under $X,XXX" (dynamic — shows the selected budget)
   - Subtitle: short description
   - **Removed**: "List Your Car" button (only on `/sell`)

3. **Budget buttons row**
   - Horizontal row of 4 red buttons:
     - **$5,000** | **$10,000** | **$15,000** | **$20,000**
   - Text matches the Budget dropdown menu items exactly
   - Styling: `#dc2626` background, white text, rounded corners (same as old "List Your Car" button)
   - Clicked button stays visually active/highlighted
   - **Click behavior**: Immediately fills the **Max Price** input in CarFilters below with the numeric value AND triggers the search

4. **CarFilters**
   - Same full filter panel as VehiclePage
   - Max Price input is pre-filled from the URL route param
   - Changing budget buttons above updates Max Price + re-fetches

5. **View toggle**
   - "Grid" / "List" buttons
   - Right-aligned
   - Active state: red

6. **Car grid** — heading **"Recommended for You"** above the grid

7. **Pagination**

8. **Footer**

---

## Hidden

- ❌ Featured carousel
- ❌ No additional budget grid sections

---

## States

| State | What shows |
|-------|-----------|
| Budget selected | Browse-header + budget buttons (active) + filters (pre-filled) + toggle + grid + pagination + footer |
| Loading | Spinner |
| Empty results | "No cars found" message |
| Error | Error message |

---

## Colour Scheme

Same root colours:
- Background: `#000`
- Surface: `#111`
- Text: `#fff`
- Accent: `#dc2626`
- Borders: `#333`

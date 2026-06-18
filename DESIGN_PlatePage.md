# PlatesBrowse Page — Design Spec

## Purpose
Marketplace for browsing and searching custom/license plates for sale.

---

## Layout (top to bottom)

1. **Navbar** — Same as everywhere.
2. **Browse-header** — Title ("License Plates for Sale") + optional subtitle.
3. **PlateFilters** — Filter panel for plates (category, type, search).
4. **Plate grid** — Grid of plate listing cards. Each card shows plate text, type badge, price.
5. **Pagination** — Page numbers below grid.
6. **Footer**

---

## Components

### PlateCard
- **Image**: Plate design/visual representation
- **Plate text**: Large monospace display (e.g. "CUSTOM01")
- **Type badge**: e.g. "Vanity", "Numeric"
- **Price**: Red accent colour, bold
- **Hover**: Border highlight, slight lift

### PlateFilters
- **Search**: Text input for plate text search
- **Category**: Dropdown (e.g. "All", "Vanity", "Numeric", "Special")
- **Sort**: Newest / Price low-high / Price high-low

---

## Colour Scheme
Same root colours as main site:
- Background: `#000`
- Surface: `#111`
- Text: `#fff`
- Accent: `#dc2626`
- Borders: `#333`

---

## Notes
- No changes needed — page is feature-complete as-is.
- Styling and layout mirror the car grid pattern for consistency.

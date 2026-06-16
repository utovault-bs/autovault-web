# AutoVault — Build Plan

## How to use
1. Work from top to bottom
2. After each step, run `npm run build` (frontend) or restart backend
3. Fix any errors before moving to next step
4. When all checkboxes are ticked, push to GitHub → Vercel deploys

---

## Phase 1 — Quick Wins ✅

### [x] 1. Reorder Budget Under $10K above Recommended
- **File:** `src/pages/BrowsePage.jsx`
- **Change:** Move `{budgetCars.length > 0 && (...)}` JSX block above `{recommended.length > 0 && (...)}`
- **Test:** Load homepage → Budget section should appear before Recommended section

### [x] 2. Remove brand logos from SellCar Make dropdown
- **File:** `src/pages/SellCar.jsx`
- **Changes:**
  - Remove `import MakeSelect from '../components/MakeSelect'`
  - Add inline `MAKES` array
  - Replace `<MakeSelect>` with plain `<select>` populated from MAKES
- **Test:** Visit /sell → Make dropdown should show plain text list (no logos)

### [x] 3. Restore License Plates (7 files + 2 edits)

#### Copy from `frontend/src/` → `src/`:
| File | Source | Destination |
|------|--------|-------------|
| PlatesBrowse page | `frontend/src/pages/PlatesBrowse.jsx` | `src/pages/PlatesBrowse.jsx` |
| PlateDetail page | `frontend/src/pages/PlateDetail.jsx` | `src/pages/PlateDetail.jsx` |
| SellPlate page | `frontend/src/pages/SellPlate.jsx` | `src/pages/SellPlate.jsx` |
| Plates API client | `frontend/src/api/plates.js` | `src/api/plates.js` |
| usePlates hook | `frontend/src/hooks/usePlates.js` | `src/hooks/usePlates.js` |
| PlateCard component | `frontend/src/components/PlateCard.jsx` | `src/components/PlateCard.jsx` |
| PlateFilters component | `frontend/src/components/PlateFilters.jsx` | `src/components/PlateFilters.jsx` |

#### Edit existing files:
- **`src/App.jsx`** — Add imports + routes:
  ```jsx
  import PlatesBrowse from './pages/PlatesBrowse';
  import PlateDetail from './pages/PlateDetail';
  import SellPlate from './pages/SellPlate';
  // Routes:
  <Route path="/plates" element={<PlatesBrowse />} />
  <Route path="/plates/:id" element={<PlateDetail />} />
  <Route path="/plates/sell" element={<ProtectedRoute><SellPlate /></ProtectedRoute>} />
  ```
- **`src/components/Navbar.jsx`** — Add `<Link to="/plates">Plates</Link>` after Browse link
- **Test:** Visit /plates → should render plate browse page. Click a plate → detail page. Visit /plates/sell → sell form.

#### Build check: `npm run build` — must pass with no errors

---

## Phase 2 — Make → Model Cascade ✅

### [x] 4. Database migration + seed
- **New file:** `backend/db/migrations/006_car_models.sql`
- **Seed data** — INSERT statements for ~300 make/model combos (30 makes × ~10 models each)
- **File:** `backend/server.js` — Add migration 006 runner after migration 005

### [x] 5. Backend API endpoint
- **File:** `backend/server.js`
- Add: `GET /api/models/:make` — query `car_models WHERE make = $1`, return model list
- Add `model` filter to `GET /api/cars` — `WHERE model = $model_param`

### [x] 6. ModelSelect component
- **New file:** `src/components/ModelSelect.jsx`
- Props: `make` (required), `value`, `onChange`, `placeholder`
- Behavior:
  - When `make` is empty → show disabled "All Models" option
  - When `make` changes → fetch `GET /api/models/{make}`, populate `<select>`
  - Show loading state while fetching

### [x] 7. Integrate ModelSelect into forms
- **File:** `src/components/CarFilters.jsx`
  - Add model filter dropdown (only visible when make filter is set)

#### Build check: `npm run build` — must pass

---

## Phase 3 — Additional Filters (Year, Mileage, Color, Condition) ✅

### [x] 8. Backend filter params
- **File:** `backend/server.js` — In `GET /api/cars` query builder, add WHERE conditions for:
  - `minYear` / `maxYear` → `WHERE year >= $n AND year <= $n`
  - `maxMileage` → `WHERE mileage <= $n`
  - `exterior_color` → `WHERE exterior_color = $n`
  - `condition` → `WHERE condition = $n`

### [x] 9. Frontend filter controls
- **File:** `src/components/CarFilters.jsx` — Add to filter grid:
  - **Year:** Two select dropdowns — "Min Year" and "Max Year" (30 years back from current)
  - **Max Mileage:** Select dropdown — presets: 5k, 10k, 20k, 30k, 50k, 75k, 100k
  - **Exterior Color:** `<select>` dropdown — 13 common colors
  - **Condition:** `<select>` dropdown — New, Used, Refurbished

#### Build check: `npm run build` — must pass

---

## Phase 4 — Distance, Location & Units ✅ (partially)

### [x] 11. Car location migration
- **New file:** `backend/db/migrations/007_car_location.sql`
- Adds: city, state, zip, latitude, longitude columns
- Seeds location data for all 14 existing cars (major US cities)
- **File:** `backend/server.js` — Add migration 007 runner

### [x] 14. Distance filter (backend)
- **File:** `backend/server.js` — In `GET /api/cars`, accept params:
  - `lat`, `lng`, `radius` (all required together for distance filter)
- Add Haversine distance calculation to WHERE clause
- Add `sortBy=distance` option — ORDER BY computed distance ASC

### [x] 15. Distance filter (frontend)
- **File:** `src/components/CarFilters.jsx`
  - "Use My Location" button (calls browser Geolocation API)
  - Radius dropdown: 10, 25, 50, 100, 200, 500 miles

### [x] 16. Sort by Distance
- **File:** `src/components/CarFilters.jsx` — "Nearest" option in sort dropdown

### [ ] 12. Location fields on Sell Car form
- **File:** `src/pages/SellCar.jsx` — Add City, State, ZIP fields
- On form submit: geocode ZIP to lat/lng using free Nominatim API
- Include `city`, `state`, `zip`, `lat`, `lng` in createCar API call

### [ ] 13. Location display on car detail
- **File:** `src/pages/CarDetail.jsx` — Add "Location: City, State" in specs grid

### [ ] 17. Localized units
- **File:** `src/components/CarCard.jsx`: Format mileage/currency based on locale
- **File:** `src/components/CarFilters.jsx`: Dynamic radius label (miles/km)

#### Build check: `npm run build` — must pass

---

## Final Verification

### [ ] 18. Build frontend
```bash
npm run build
```
- Must exit with 0, no warnings or errors

### [ ] 19. Test backend starts
```bash
cd backend && node server.js
```
- Must start without crashing (stop after confirming)

### [ ] 20. Git commit & push
```bash
git add <specific files>
git status --short   # SHOW TO USER FIRST
git diff --stat     # SHOW TO USER FIRST
git commit -m "message"
git push origin main
```

### [ ] 21. Verify Vercel deploy
- Wait for Vercel build to complete
- Open `https://autovault-web.vercel.app` — confirm all features work
- Check `/plates` page renders
- Check all filters work on browse page

---

## Build Code

Run after each phase:
```bash
npm run build
if ($?) { Write-Output "BUILD PASSED" } else { Write-Output "BUILD FAILED — fix before continuing" }
```

For backend:
```bash
cd backend
npm start
# Ctrl+C to stop after confirming it starts
```

---

## Git commit strategy
- One commit per phase (not per individual file)
- Show `git status --short` + `git diff --stat` before each commit
- Never use `git add -A` or `git add .` — always stage specific files

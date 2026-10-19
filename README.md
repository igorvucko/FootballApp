# ⚽ FootballApp

Završni rad – **Front-End developer / Front-End developerka** (Edunova)

React + Vite aplikacija za upravljanje nogometnim klubovima, igračima i utakmicama.  
Zadovoljava **sve kriterije ocjena 2, 3, 4 i 5** prema Pravilniku o vrednovanju.

📄 **Puna dokumentacija za predaju:** [DOKUMENTACIJA.md](./DOKUMENTACIJA.md)

---

## Brzi start

```bash
npm install
npm run dev
```

→ http://localhost:3000

```bash
npm run build    # produkcijski build → mapa dist/
```

---

## Što aplikacija radi

- **Klubovi** – CRUD, broj igrača, detalj s listom igrača (1:n)
- **Igrači** – CRUD, pretraga, filter po klubu, napredna validacija, detalj s nastupima
- **Utakmice** – CRUD, povezivanje igrača (n:n)
- **UX** – Toast, Loader, potvrda brisanja, empty state, RWD, accessibility

Podaci se čuvaju u **localStorage** (automatski seed pri prvom pokretanju).

---

## Tehnologije

React 18 · Vite 5 · React Router 6 · SCSS · ES6+ · localStorage (mock API)

---

## Struktura (sažetak)

```
src/
├── components/   layout, ui, players, teams, matches
├── pages/        Home, Teams, TeamDetail, Players, PlayerDetail, Matches, NotFound
├── services/     api, storage, teamService, playerService, matchService
├── hooks/        useFetch, useToast
├── context/      ToastContext
├── utils/        validators, formatters
└── styles/       SCSS partiali (varijable, mixini, base, components)
```

---

## Kriteriji vrednovanja (sažetak)

| Ocjena | Ključni elementi |
|--------|------------------|
| **2** | CRUD, ≥3 komponente, useState/useParams/useEffect, forme, .map(), validacija, RWD, Git+deploy |
| **3** | Router ≥2 rute, 1:n, **localStorage**, EmptyState, servisne datoteke, modularan kod |
| **4** | select+textarea, destrukturiranje/spread, **n:n**, logika vs prezentacija, reuse komponenti |
| **5** | mock API, onBlur/real-time validacija, ARIA + semantički HTML, SCSS varijable/mixini, Toast+Loader+Confirm |

Detaljna tablica → [DOKUMENTACIJA.md](./DOKUMENTACIJA.md)

---

## Deploy

1. `npm run build`
2. Upload sadržaja `dist/` na **edunovaX.reginaosijek.hr**
3. Git repozitorij s vidljivom commit poviješću

---

## Autor

Edunova – program Front-End developer / Front-End developerka  
Osijek, 2026.

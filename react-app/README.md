# Soundline: React kezdemény (frontend)

Egy kis React (Vite) alkalmazás, ami két GET lekérést mutat be az `src/App.jsx` fájlban:

| Lekérés | Mit csinál | Hol van a kódban |
|---|---|---|
| `GET /esemenyek` | betölti az összes eseményt, kártyákon mutatja | `useEffect` az `App.jsx` elején |
| `GET /esemenyek/:id` | egy eseményt kér le azonosító alapján (kártya gombja vagy beírt szám) | `betoltEsemenyt()` függvény |

A backend még nincs kész, ezért egy ideiglenes mock szerver (json-server) szolgálja ki ugyanezeket a címeket a `db.json` fájlból.

## Indítás

Kell hozzá a Node.js (LTS verzió, https://nodejs.org).

```
cd react-app
npm install
npm start
```

- az oldal: http://localhost:5173
- az ideiglenes API: http://localhost:3001/esemenyek (és http://localhost:3001/esemenyek/1)

Leállítás: `Ctrl + C` a terminálban.

## Fájlok

```
react-app/
  db.json          ideiglenes adatok a mock szerverhez
  index.html       az oldal váza (itt van a <div id="root">)
  src/main.jsx     elindítja az App-ot
  src/App.jsx      a lekérések és a megjelenítés (ez a lényeg)
  src/App.css      kinézet (ugyanazok a színek, mint a statikus oldalon)
  public/          logó és favicon
```

## Mit kell átírni, ha kész a backend

1. Az `App.jsx` tetején az `API` konstans legyen a backend címe (pl. `http://localhost:5000/api`).
2. A backendnek ugyanezeket a mezőneveket kell visszaadnia: `id`, `cim`, `tipus`, `datum`, `ido`, `hely`. Ha mást ad, vagy a backendet, vagy az `App.jsx`-ben a mezőneveket kell igazítani.
3. A backendben engedélyezni kell a CORS-t a `http://localhost:5173` címre, különben a böngésző blokkolja a lekérést.
4. A `db.json` és az `api` / `start` script ekkor már nem kell (a `dev` script elég).

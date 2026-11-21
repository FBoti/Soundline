import { useEffect, useState } from "react";
import "./App.css";

// A szerver (backend) címe. Ha elkészül a backend, csak ezt az egy sort kell átírni.
// Addig az "npm run api" parancs egy ideiglenes szervert indít a db.json fájlból.
const API = "http://localhost:3001";

const TIPUS_NEV = { proba: "Próba", fellepes: "Fellépés", egyeb: "Egyéb" };

// A hibaüzenetet érthetővé teszi (ha a szerver le van állítva, a böngésző TypeError-t ad)
function hibaSzoveg(hiba) {
  if (hiba instanceof TypeError) {
    return "A szerver nem érhető el. Elindult az API? (npm start)";
  }
  return hiba.message;
}

function App() {
  // --- Állapotok: ezekben tárolja a React, hogy mit mutasson az oldal ---

  // 1) Az események listája (GET /esemenyek)
  const [esemenyek, setEsemenyek] = useState([]);
  const [listaBetolt, setListaBetolt] = useState(true);
  const [listaHiba, setListaHiba] = useState("");

  // 2) Egyetlen esemény (GET /esemenyek/:id)
  const [esemeny, setEsemeny] = useState(null);
  const [esemenyHiba, setEsemenyHiba] = useState("");
  const [keresettId, setKeresettId] = useState(""); // amit a beviteli mezőbe írnak

  // 3) Csak megjelenítésre: melyik lekérést küldtük utoljára
  const [utolsoHivas, setUtolsoHivas] = useState("");

  // --- GET /esemenyek: az oldal megnyitásakor egyszer lefut ---
  useEffect(() => {
    async function betoltEsemenyeket() {
      setUtolsoHivas("GET " + API + "/esemenyek");
      try {
        const valasz = await fetch(API + "/esemenyek");
        if (!valasz.ok) {
          throw new Error("Hibás válasz a szervertől: " + valasz.status);
        }
        const adat = await valasz.json();
        setEsemenyek(adat);
      } catch (hiba) {
        setListaHiba(hibaSzoveg(hiba));
      } finally {
        setListaBetolt(false);
      }
    }
    betoltEsemenyeket();
  }, []);

  // --- GET /esemenyek/:id: egy esemény lekérése azonosító alapján ---
  async function betoltEsemenyt(id) {
    setEsemeny(null);
    setEsemenyHiba("");
    const url = API + "/esemenyek/" + encodeURIComponent(id);
    setUtolsoHivas("GET " + url);
    try {
      const valasz = await fetch(url);
      if (valasz.status === 404) {
        throw new Error("Nincs ilyen azonosítójú esemény: " + id);
      }
      if (!valasz.ok) {
        throw new Error("Hibás válasz a szervertől: " + valasz.status);
      }
      setEsemeny(await valasz.json());
    } catch (hiba) {
      setEsemenyHiba(hibaSzoveg(hiba));
    }
  }

  // A beviteli mező űrlapjának elküldése
  function keresesKuldes(e) {
    e.preventDefault();
    if (keresettId.trim() === "") {
      setEsemeny(null);
      setEsemenyHiba("Írj be egy azonosítót!");
      return;
    }
    betoltEsemenyt(keresettId.trim());
  }

  // --- Ez jelenik meg az oldalon ---
  return (
    <>
      <header className="fejlec">
        <div className="wrap">
          <img src="/logo-sotet-hatterre.png" alt="Soundline" />
          <span>React kezdemény: GET lekérések</span>
        </div>
      </header>

      <main className="wrap">
        <section>
          <h2>Események</h2>
          <p className="hivas">GET /esemenyek</p>

          {listaBetolt && <p>Betöltés...</p>}
          {listaHiba && <p className="hiba">{listaHiba}</p>}

          <div className="lista">
            {esemenyek.map((e) => (
              <div className="kartya" key={e.id}>
                <span className={"cimke cimke-" + e.tipus}>{TIPUS_NEV[e.tipus] || e.tipus}</span>
                <h3>{e.cim}</h3>
                <p>
                  {e.datum}, {e.ido}
                  <br />
                  {e.hely}
                </p>
                <button className="gomb" onClick={() => betoltEsemenyt(e.id)}>
                  Részletek
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Egy esemény azonosító alapján</h2>
          <p className="hivas">GET /esemenyek/:id</p>

          <form className="kereso" onSubmit={keresesKuldes}>
            <label htmlFor="azonosito">Azonosító</label>
            <input
              id="azonosito"
              type="number"
              value={keresettId}
              onChange={(e) => setKeresettId(e.target.value)}
              placeholder="Pl. 3"
            />
            <button className="gomb" type="submit">Lekérés</button>
          </form>

          {esemenyHiba && <p className="hiba">{esemenyHiba}</p>}

          {esemeny && (
            <div className="kartya reszlet">
              <span className={"cimke cimke-" + esemeny.tipus}>{TIPUS_NEV[esemeny.tipus] || esemeny.tipus}</span>
              <h3>{esemeny.cim}</h3>
              <p>Azonosító: {esemeny.id}</p>
              <p>Dátum: {esemeny.datum}</p>
              <p>Kezdés: {esemeny.ido}</p>
              <p>Helyszín: {esemeny.hely}</p>
            </div>
          )}

          <p className="utolso">Utolsó lekérés: <code>{utolsoHivas}</code></p>
        </section>
      </main>
    </>
  );
}

export default App;

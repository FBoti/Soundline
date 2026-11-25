import { useState } from "react";
import "../css/naptar.css";

const TIPUS_NEV = { proba: "Próba", fellepes: "Fellépés", egyeb: "Egyéb" };

const SZUROK = [
  ["mind", "Mind"],
  ["proba", "Próba"],
  ["fellepes", "Fellépés"],
  ["egyeb", "Egyéb"],
];

function Naptar({ esemenyek, listaBetolt, listaHiba, esemeny, esemenyHiba, naplo, betoltEsemenyt, bezarEsemeny, ujEsemeny }) {
  const [tipus, setTipus] = useState("mind");

  const [cim, setCim] = useState("");
  const [ujTipus, setUjTipus] = useState("proba");
  const [datum, setDatum] = useState("");
  const [ido, setIdo] = useState("");
  const [hely, setHely] = useState("");
  const [uzenet, setUzenet] = useState(null);

  const szurt = esemenyek.filter((e) => tipus === "mind" || e.tipus === tipus);

  function urlapKuldes(ev) {
    ev.preventDefault();
    if (cim === "" || datum === "") {
      setUzenet({ szoveg: "Adj meg legalább címet és dátumot!", hiba: true });
      return;
    }
    ujEsemeny({ cim, tipus: ujTipus, datum, ido, hely });
    setUzenet({ szoveg: "Az esemény hozzáadva.", hiba: false });
    setCim("");
    setUjTipus("proba");
    setDatum("");
    setIdo("");
    setHely("");
  }

  return (
    <>
      <section className="oldalfej">
        <div className="wrap">
          <h1>Események</h1>
          <p>Próbák, fellépések és közös programok.</p>
        </div>
      </section>

      <section className="szekcio">
        <div className="wrap">
          <div className="szuro">
            {SZUROK.map(([ertek, felirat]) => (
              <button
                key={ertek}
                className={tipus === ertek ? "kivalasztott" : ""}
                onClick={() => setTipus(ertek)}
              >
                {felirat}
              </button>
            ))}
          </div>

          {listaBetolt && <p>Betöltés...</p>}
          {listaHiba && <div className="uzenet hiba latszik">{listaHiba}</div>}

          {esemenyHiba && <div className="uzenet hiba latszik">{esemenyHiba}</div>}
          {esemeny && (
            <div className="esemeny esemeny-reszlet">
              <span className={"cimke cimke-" + esemeny.tipus}>{TIPUS_NEV[esemeny.tipus] || esemeny.tipus}</span>
              <h3>{esemeny.cim}</h3>
              <p>Azonosító: {esemeny.id}</p>
              <p>Dátum: {esemeny.datum}</p>
              <p>Kezdés: {esemeny.ido}</p>
              <p>Helyszín: {esemeny.hely}</p>
              <button className="gomb gomb-barna" onClick={bezarEsemeny}>Bezárás</button>
            </div>
          )}

          {szurt.map((e) => (
            <div className="esemeny" key={e.id}>
              <span className={"cimke cimke-" + e.tipus}>{TIPUS_NEV[e.tipus] || e.tipus}</span>
              <h3>{e.cim}</h3>
              <p>{e.datum}, {e.ido} - {e.hely}</p>
              <button className="gomb" onClick={() => betoltEsemenyt(e.id)}>Részletek</button>
            </div>
          ))}
          {!listaBetolt && !listaHiba && szurt.length === 0 && <p>Ilyen típusú esemény nincs.</p>}

          {naplo.length > 0 && (
            <div className="naplo">
              <h3>Lekérések (GET)</h3>
              {naplo.map((n, index) => (
                <details key={n.azonosito} className="naplo-tetel" open={index === 0}>
                  <summary>
                    <code>{n.metodus} {n.url}</code>
                    <span className={"statusz " + (n.statusz === 200 || n.statusz === "helyi" ? "ok" : "hiba")}>
                      {n.statusz} · {n.idopont}
                    </span>
                  </summary>
                  <pre>{n.adat ? JSON.stringify(n.adat, null, 2) : "(nincs válasz-törzs)"}</pre>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="szekcio szekcio-homok">
        <div className="wrap">
          <h2>Új esemény</h2>
          <p>Karmester/Admin jogosult az esemény létrehozásához</p>
          <form className="kartya urlap-szelesseg" id="uj-esemeny" onSubmit={urlapKuldes}>
            <label htmlFor="cim">Cím</label>
            <input id="cim" type="text" placeholder="Pl. Heti próba" value={cim} onChange={(e) => setCim(e.target.value)} />
            <label htmlFor="tipus">Típus</label>
            <select id="tipus" value={ujTipus} onChange={(e) => setUjTipus(e.target.value)}>
              <option value="proba">Próba</option>
              <option value="fellepes">Fellépés</option>
              <option value="egyeb">Egyéb</option>
            </select>
            <label htmlFor="datum">Dátum</label>
            <input id="datum" type="date" value={datum} onChange={(e) => setDatum(e.target.value)} />
            <label htmlFor="ido">Kezdés</label>
            <input id="ido" type="time" value={ido} onChange={(e) => setIdo(e.target.value)} />
            <label htmlFor="hely">Helyszín</label>
            <input id="hely" type="text" placeholder="Pl. Zeneiskola" value={hely} onChange={(e) => setHely(e.target.value)} />
            <button className="gomb gomb-barna" type="submit">Esemény hozzáadása</button>
            {uzenet && (
              <div className={"uzenet latszik" + (uzenet.hiba ? " hiba" : "")}>{uzenet.szoveg}</div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default Naptar;

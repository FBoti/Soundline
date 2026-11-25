import { useRef, useState } from "react";
import "../css/kottak.css";

import { MINDEN, SZOLAMOK, KEZDO_KOTTAK } from "../adatok.js";

function Kottak() {
  const [kottak, setKottak] = useState(KEZDO_KOTTAK);

  const [kereses, setKereses] = useState("");
  const [szolam, setSzolam] = useState("mind");

  const [fCim, setFCim] = useState("");
  const [fSzerzo, setFSzerzo] = useState("");
  const [bepipalt, setBepipalt] = useState([]);
  const fajlMezo = useRef(null);
  const [uzenet, setUzenet] = useState(null);

  const talalatok = kottak.filter((k) => {
    const szovegEgyezik = (k.cim + " " + k.szerzo).toLowerCase().includes(kereses.toLowerCase());
    const szolamEgyezik = szolam === "mind" || k.szolamok.includes(szolam) || k.szolamok.includes(MINDEN);
    return szovegEgyezik && szolamEgyezik;
  });

  function szolamValtas(nev) {
    let uj;
    if (nev === MINDEN) {
      uj = bepipalt.includes(MINDEN) ? [] : [...SZOLAMOK];
    } else if (bepipalt.includes(nev)) {
      uj = bepipalt.filter((x) => x !== nev && x !== MINDEN);
    } else {
      uj = [...bepipalt, nev];
      const mindenMas = SZOLAMOK.filter((x) => x !== MINDEN).every((x) => uj.includes(x));
      if (mindenMas) {
        uj.push(MINDEN);
      }
    }
    setBepipalt(uj);
  }

  function feltoltes(ev) {
    ev.preventDefault();
    const fajl = fajlMezo.current.files[0];

    if (fCim.trim() === "" || fSzerzo.trim() === "" || bepipalt.length === 0 || !fajl) {
      setUzenet({ szoveg: "Add meg a címet, a szerzőt, legalább egy szólamot, és válassz fájlt!", hiba: true });
      return;
    }

    setKottak([...kottak, { cim: fCim.trim(), szerzo: fSzerzo.trim(), szolamok: bepipalt, fajl: fajl.name }]);
    setUzenet({ szoveg: "A kotta hozzáadva.", hiba: false });
    setFCim("");
    setFSzerzo("");
    setBepipalt([]);
    fajlMezo.current.value = "";
  }

  return (
    <>
      <section className="oldalfej">
        <div className="wrap">
          <h1>Kották</h1>
          <p>Szűrj a saját szólamodra, és megtalálod, amit játszanod kell.</p>
        </div>
      </section>

      <section className="szekcio">
        <div className="wrap">
          <div className="kereses">
            <div>
              <label htmlFor="kereses">Keresés</label>
              <input id="kereses" type="text" placeholder="Cím vagy szerző" value={kereses} onChange={(e) => setKereses(e.target.value)} />
            </div>
            <div>
              <label htmlFor="szolam">Szólam</label>
              <select id="szolam" value={szolam} onChange={(e) => setSzolam(e.target.value)}>
                <option value="mind">Minden szólam</option>
                {SZOLAMOK.filter((s) => s !== MINDEN).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <p>{talalatok.length} kotta</p>
          <div>
            {talalatok.map((k, i) => (
              <div className="kotta" key={i}>
                <h3>{k.cim}</h3>
                <p>{k.szerzo} | {k.szolamok.join(", ")}</p>
              </div>
            ))}
          </div>

          <form className="kartya feltoltes" onSubmit={feltoltes}>
            <h3>Kotta feltöltése</h3>
            <label htmlFor="f-cim">Mű címe</label>
            <input id="f-cim" type="text" placeholder="Cím" value={fCim} onChange={(e) => setFCim(e.target.value)} />
            <label htmlFor="f-szerzo">Szerző</label>
            <input id="f-szerzo" type="text" placeholder="Szerző" value={fSzerzo} onChange={(e) => setFSzerzo(e.target.value)} />
            <label>Szólam</label>
            <div className="szolamok">
              {SZOLAMOK.map((s) => (
                <label key={s}>
                  <input type="checkbox" checked={bepipalt.includes(s)} onChange={() => szolamValtas(s)} /> {s}
                </label>
              ))}
            </div>
            <label htmlFor="f-fajl">Kotta fájl</label>
            <input id="f-fajl" type="file" accept=".pdf,image/*" ref={fajlMezo} />
            <button className="gomb gomb-barna" type="submit">Feltöltés</button>
            {uzenet && (
              <div className={"uzenet latszik" + (uzenet.hiba ? " hiba" : "")}>{uzenet.szoveg}</div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default Kottak;

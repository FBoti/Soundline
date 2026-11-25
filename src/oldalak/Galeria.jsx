import { useState } from "react";
import "../css/galeria.css";

import { KEPEK, ALBUMOK } from "../adatok.js";

function Galeria() {
  const [album, setAlbum] = useState("mind");

  const mutatott = KEPEK.filter((k) => album === "mind" || k.album === album);

  return (
    <>
      <section className="oldalfej">
        <div className="wrap">
          <h1>Galéria</h1>
          <p>A fellépések, próbák és közös programok pillanatai.</p>
        </div>
      </section>

      <section className="szekcio">
        <div className="wrap">
          <div className="szuro">
            {ALBUMOK.map(([ertek, felirat]) => (
              <button
                key={ertek}
                className={album === ertek ? "kivalasztott" : ""}
                onClick={() => setAlbum(ertek)}
              >
                {felirat}
              </button>
            ))}
          </div>

          <div className="kepek">
            {mutatott.map((k) => (
              <div className={"kep " + k.szin} key={k.cim}>{k.cim}</div>
            ))}
          </div>
          <p><i>A színes mezők a későbbi fotók helyét jelölik</i></p>
        </div>
      </section>
    </>
  );
}

export default Galeria;

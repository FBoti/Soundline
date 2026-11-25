import { useState } from "react";
import "../css/rolunk.css";

import { TAGOK } from "../adatok.js";

function TagKartya({ tag }) {
  const [nyitva, setNyitva] = useState(false);

  return (
    <div className="kartya tag">
      <img src="/img/tag-1.jpg" alt={tag.nev} />
      <h3>{tag.nev}</h3>
      <p className="szerep">{tag.szerep}</p>
      <button className="gomb gomb-barna" onClick={() => setNyitva(!nyitva)}>
        {nyitva ? "Kevesebb" : "Bővebben"}
      </button>
      {nyitva && (
        <div className="reszlet">
          <p><strong>E-mail:</strong> {tag.email}</p>
          <p><strong>Feladat a projektben:</strong> {tag.szerep}</p>
        </div>
      )}
    </div>
  );
}

function Rolunk() {
  return (
    <>
      <section className="oldalfej">
        <div className="wrap"><h1>Rólunk</h1></div>
      </section>

      <section className="szekcio">
        <div className="wrap">
          <div className="tagok">
            {TAGOK.map((t) => (
              <TagKartya key={t.nev} tag={t} />
            ))}
          </div>
        </div>
        <br />
        <div className="wrap">
          <h2>A projekt célja</h2>
          <p>A Soundline egy zenekar menedzsment rendszer, amely a próbák, fellépések, kották és közös programok kezelését teszi egyszerűvé. A tagok egy helyen találják meg a szükséges információkat, a karnagy pedig könnyen szervezheti a zenekar mindennapjait.</p>
          <h2>Mire szolgál a Soundline?</h2>
          <p>A zenekarok szervezése ma gyakran csoportchaten és papíron zajlik, ezért az információ szétszóródik, a kották elkallódnak, és nehéz tudni, ki jön egy próbára vagy fellépésre. A Soundline ezt oldja meg: egy helyen kezeli a zenekar mindennapjait.</p>
          <p><b>A Soundline egy menedzsment rendszer fúvós- és rézfúvós zenekaroknak:</b></p>
          <ul>
            <li>Események kezelése: próbák, fellépések és egyéb események egy helyen, a tagok visszajelezhetnek (jövök / nem jövök / talán), a karnagy pedig szólamonként látja, kikre számíthat.</li>
            <li>Kottaállomány: a kották egy helyen vannak, a tagok szólamuk szerint megtalálják és letölthetik a saját szólamaikat.</li>
            <li>Élménygaléria: a fellépések és közös programok fotói egy közös galériában, így a zenekar emlékei sem vesznek el a csoportchatben.</li>
          </ul>
          <p>A rendszer reszponzív weboldalként asztali gépen és mobilon is használható, az admin felület pedig asztali alkalmazásként is elkészülhet.</p>
        </div>
      </section>
    </>
  );
}

export default Rolunk;

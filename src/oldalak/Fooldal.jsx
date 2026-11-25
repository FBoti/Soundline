import { useState } from "react";
import "../css/index.css";

function Fooldal() {
  const [valasz, setValasz] = useState("");

  return (
    <>
      <section className="oldalfej">
        <div className="wrap hero">
          <div className="hero-szoveg">
            <h1>A zenekar mindennapjai egy helyen</h1>
            <p>Próbák, fellépések, kották és közös fotók ott, ahol minden tag megtalálja őket.</p>
            <br />
            <a className="gomb" href="#/naptar">Események megnyitása</a>
          </div>

          <div className="kovetkezo">
            <p className="cimke cimke-fellepes">Következő esemény</p>
            <h2>Őszi koncert a főtéren</h2>
            <p>2027. október 24., Vasárnap, 17:00<br/>Városi főtér, színpad</p>
            <p><strong>Tudsz jönni?</strong></p>
            <button className="valasz" onClick={() => setValasz("Jövök")}>Ott leszek</button>{" "}
            <button className="valasz" onClick={() => setValasz("Talán")}>Talán</button>{" "}
            <button className="valasz" onClick={() => setValasz("Nem jövök")}>Nem tudok menni</button>
            {valasz && <div className="uzenet latszik">Köszönjük! A válaszod: {valasz}</div>}
          </div>
        </div>
      </section>

      <section className="szekcio">
        <div className="wrap">
          <h2>Három dolog, egy helyen</h2>
          <div className="harom">
            <div className="kartya">
              <h3>Események</h3>
              <p>Próbák és fellépések naptára. A tagok egy kattintással visszajeleznek.</p>
              <a href="#/naptar">Összes esemény</a>
            </div>
            <div className="kartya">
              <h3>Kották</h3>
              <p>A repertoár szólam szerint szűrhetően.</p>
              <a href="#/kottak">Kották megnyitása</a>
            </div>
            <div className="kartya">
              <h3>Galéria</h3>
              <p>A fellépések és közös programok fotói.</p>
              <a href="#/galeria">Galéria megnyitása</a>
            </div>
          </div>
        </div>
      </section>

      <section className="szekcio szekcio-homok">
        <div className="wrap">
          <h2>Így működik egy esemény</h2>
          <ol>
            <li>A karnagy felveszi az eseményt (cím, időpont, helyszín).</li>
            <li>A tagok visszajeleznek: jövök, talán vagy nem jövök.</li>
            <li>A karnagy látja, hányan jönnek.</li>
          </ol>
        </div>
      </section>

      <section className="szekcio" style={{ textAlign: "center" }}>
        <div className="wrap">
          <h2>Készen állsz a következő próbára?</h2>
          <a className="gomb gomb-barna" href="#/belepes">Belépés</a>
        </div>
      </section>
    </>
  );
}

export default Fooldal;

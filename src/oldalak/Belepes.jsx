import { useState } from "react";
import "../css/belepes.css";

function Belepes() {
  const [email, setEmail] = useState("");
  const [jelszo, setJelszo] = useState("");
  const [uzenet, setUzenet] = useState(null);

  function belepes(ev) {
    ev.preventDefault();
    if (email === "" || jelszo === "") {
      setUzenet({ szoveg: "Add meg az e-mail-címet és a jelszót!", hiba: true });
    } else {
      setUzenet({ szoveg: "Teszt: a belépés még nincs bekötve a szerverhez.", hiba: false });
    }
  }

  return (
    <>
      <section className="oldalfej">
        <div className="wrap">
          <h1>Belépés és kapcsolat</h1>
          <p>Lépj be a zenekar felületére, vagy írj nekünk.</p>
        </div>
      </section>

      <section className="szekcio">
        <div className="wrap ketto">
          <div className="kartya">
            <h2>Belépés</h2>
            <form onSubmit={belepes}>
              <label htmlFor="l-email">E-mail-cím</label>
              <input id="l-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="l-jelszo">Jelszó</label>
              <input id="l-jelszo" type="password" value={jelszo} onChange={(e) => setJelszo(e.target.value)} />
              <button className="gomb gomb-barna" type="submit">Belépés</button>
              {uzenet && (
                <div className={"uzenet latszik" + (uzenet.hiba ? " hiba" : "")}>{uzenet.szoveg}</div>
              )}
            </form>
            <p style={{ marginTop: "16px" }}>Új tag vagy? A fiókodat a karnagy hozza létre.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Belepes;

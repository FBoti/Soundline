import { MENU } from "../menu.js";

function Lablec() {
  return (
    <footer className="lablec">
      <div className="wrap">
        <div>
          <img className="logo" src="/img/logo-sotet-hatterre.png" alt="Soundline" />
          <p>A zenekar mindennapjai egy helyen.</p>
          <div className="kozosseg">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" title="Facebook">
              <img src="/img/Facebook.png" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" title="Instagram">
              <img src="/img/Instagram.png" alt="Instagram" />
            </a>
          </div>
        </div>
        <div>
          {MENU.map((m) => (
            <a key={m.oldal} href={"#/" + m.oldal}>{m.felirat}</a>
          ))}
        </div>
        <p className="kicsi">
          Vizsgaremek projekt, 2026.<br />
          Farkas Botond<br />
          Simon-Kovács Gergő<br />
          Szlivka Ákos Zoltán
        </p>
      </div>
    </footer>
  );
}

export default Lablec;

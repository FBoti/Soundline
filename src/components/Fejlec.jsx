import { MENU } from "../menu.js";

function Fejlec({ oldal }) {
  return (
    <header className="fejlec">
      <div className="wrap">
        <a href="#/fooldal">
          <img src="/img/logo-sotet-hatterre.png" alt="Soundline" />
        </a>
        <nav className="menu">
          {MENU.map((m) => (
            <a key={m.oldal} href={"#/" + m.oldal} className={oldal === m.oldal ? "aktiv" : ""}>
              {m.felirat}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Fejlec;

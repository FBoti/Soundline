import { useEffect, useState } from "react";
import Fejlec from "./components/Fejlec.jsx";
import Lablec from "./components/Lablec.jsx";
import Fooldal from "./oldalak/Fooldal.jsx";
import Naptar from "./oldalak/Naptar.jsx";
import Kottak from "./oldalak/Kottak.jsx";
import Galeria from "./oldalak/Galeria.jsx";
import Rolunk from "./oldalak/Rolunk.jsx";
import Belepes from "./oldalak/Belepes.jsx";
import { getEsemenyek, getEsemeny } from "./api.js";

const CIMEK = {
  fooldal: "Főoldal",
  naptar: "Események",
  kottak: "Kották",
  galeria: "Galéria",
  rolunk: "Rólunk",
  belepes: "Belépés",
};

const NAPLO_MERET = 10;

let naploSorszam = 0;

function aktualisOldal() {
  const nev = window.location.hash.replace("#/", "");
  return CIMEK[nev] ? nev : "fooldal";
}

function hibaSzoveg(hiba) {
  if (hiba instanceof TypeError) {
    return "A szerver nem érhető el. Elindult az API? (npm run start:api)";
  }
  return hiba.message;
}

function App() {
  const [oldal, setOldal] = useState(aktualisOldal());

  const [esemenyek, setEsemenyek] = useState([]);
  const [listaBetolt, setListaBetolt] = useState(true);
  const [listaHiba, setListaHiba] = useState("");

  const [esemeny, setEsemeny] = useState(null);
  const [esemenyHiba, setEsemenyHiba] = useState("");

  const [naplo, setNaplo] = useState([]);

  function naplozo(bejegyzes) {
    const idopont = new Date().toLocaleTimeString("hu-HU");
    naploSorszam += 1;
    const ujTetel = { ...bejegyzes, metodus: "GET", idopont, azonosito: naploSorszam };
    setNaplo((regi) => [ujTetel, ...regi].slice(0, NAPLO_MERET));
  }

  useEffect(() => {
    function valtozas() {
      setOldal(aktualisOldal());
      window.scrollTo(0, 0);
    }
    window.addEventListener("hashchange", valtozas);
    return () => window.removeEventListener("hashchange", valtozas);
  }, []);

  useEffect(() => {
    document.title = CIMEK[oldal] + " - Soundline";
  }, [oldal]);

  useEffect(() => {
    async function betoltEsemenyeket() {
      try {
        setEsemenyek(await getEsemenyek(naplozo));
      } catch (hiba) {
        setListaHiba(hibaSzoveg(hiba));
      } finally {
        setListaBetolt(false);
      }
    }
    betoltEsemenyeket();
  }, []);

  async function betoltEsemenyt(id) {
    setEsemeny(null);
    setEsemenyHiba("");

    const helyi = esemenyek.find((e) => e.id === id && e.helyi);
    if (helyi) {
      setEsemeny(helyi);
      return;
    }

    try {
      setEsemeny(await getEsemeny(id, naplozo));
    } catch (hiba) {
      setEsemenyHiba(hibaSzoveg(hiba));
    }
  }

  function ujEsemeny(adat) {
    const ujId = Math.max(0, ...esemenyek.map((e) => e.id)) + 1;
    setEsemenyek([...esemenyek, { ...adat, id: ujId, helyi: true }]);
  }

  return (
    <>
      <Fejlec oldal={oldal} />
      <main>
        {oldal === "fooldal" && <Fooldal />}
        {oldal === "naptar" && (
          <Naptar
            esemenyek={esemenyek}
            listaBetolt={listaBetolt}
            listaHiba={listaHiba}
            esemeny={esemeny}
            esemenyHiba={esemenyHiba}
            naplo={naplo}
            betoltEsemenyt={betoltEsemenyt}
            bezarEsemeny={() => setEsemeny(null)}
            ujEsemeny={ujEsemeny}
          />
        )}
        {oldal === "kottak" && <Kottak />}
        {oldal === "galeria" && <Galeria />}
        {oldal === "rolunk" && <Rolunk />}
        {oldal === "belepes" && <Belepes />}
      </main>
      <Lablec />
    </>
  );
}

export default App;

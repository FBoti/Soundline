
export const ESEMENYEK = [
  { id: 1, cim: "Őszi koncert a főtéren", tipus: "fellepes", datum: "2027-10-24", ido: "17:00", hely: "Városi főtér" },
  { id: 2, cim: "Megemlékezés a temetőben", tipus: "fellepes", datum: "2027-11-01", ido: "10:30", hely: "Városi köztemető" },
  { id: 3, cim: "Szólamos próba: rézfúvók", tipus: "proba", datum: "2027-11-05", ido: "17:30", hely: "Zeneiskola, kisterem" },
  { id: 4, cim: "Hangszerkarbantartás", tipus: "egyeb", datum: "2027-11-14", ido: "09:00", hely: "Zenekari raktár" },
  { id: 5, cim: "Heti próba: karácsonyi műsor", tipus: "proba", datum: "2027-11-26", ido: "17:30", hely: "Zeneiskola, nagyterem" },
];

export const MINDEN = "Minden szólam";

export const SZOLAMOK = [MINDEN, "Piccolo", "Fuvola", "Klarinét", "Alt-Szaxofon", "Trombita", "Kürt", "Tenor-Szaxofon", "Baritonkürt", "Harsona", "Tuba", "Dobszerelés", "Ütőhangszerek"];

export const KEZDO_KOTTAK = [
  { cim: "Radetzky-induló", szerzo: "Johann Strauss", szolamok: ["Trombita", "Kürt", "Tuba"] },
  { cim: "Himnusz", szerzo: "Erkel Ferenc", szolamok: [MINDEN] },
  { cim: "Karácsonyi dallamok", szerzo: "Hagyományos", szolamok: ["Trombita", "Harsona"] },
  { cim: "Hunyadi-induló", szerzo: "Kéler Béla", szolamok: ["Trombita", "Harsona", "Ütőhangszerek"] },
  { cim: "Őszi korál", szerzo: "Ismeretlen", szolamok: ["Kürt", "Tuba"] },
];

export const KEPEK = [
  { cim: "Újévi Koncert", album: "fellepes", szin: "szin1" },
  { cim: "Március 15.", album: "fellepes", szin: "szin2" },
  { cim: "Heti próba", album: "proba", szin: "szin3" },
  { cim: "Szólamos próba", album: "proba", szin: "szin4" },
  { cim: "Külföldi koncert", album: "fellepes", szin: "szin3" },
  { cim: "Zenekari kirándulás", album: "kirandulas", szin: "szin4" },
  { cim: "Nyárzáró koncert", album: "fellepes", szin: "szin1" },
  { cim: "Október 6.", album: "fellepes", szin: "szin2" },
];

export const ALBUMOK = [
  ["mind", "Mind"],
  ["fellepes", "Fellépések"],
  ["proba", "Próbák"],
  ["kirandulas", "Kirándulások és közös programok"],
];

export const TAGOK = [
  { nev: "Farkas Botond", szerep: "Frontend", email: "farkasb@kkszki.hu" },
  { nev: "Simon-Kovács Gergő", szerep: "Backend", email: "simon-kovacsg@kkszki.hu" },
  { nev: "Szlivka Ákos Zoltán", szerep: "Database", email: "szlivkaa@kkszki.hu" },
];

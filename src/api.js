import { ESEMENYEK } from "./adatok.js";

export const SZERVER_VAN = true;

const API = "http://localhost:3001";

async function getKeres(utvonal, naplozo) {
  const url = API + utvonal;
  let valasz;
  try {
    valasz = await fetch(url);
  } catch (hiba) {
    naplozo({ url, statusz: "nem elérhető", adat: null });
    throw hiba;
  }
  const adat = valasz.ok ? await valasz.json() : null;
  naplozo({ url, statusz: valasz.status, adat });
  return { ok: valasz.ok, status: valasz.status, adat };
}

export async function getEsemenyek(naplozo) {
  if (!SZERVER_VAN) {
    naplozo({ url: "helyi adat: src/adatok.js", statusz: "helyi", adat: ESEMENYEK });
    return ESEMENYEK;
  }
  const { ok, status, adat } = await getKeres("/esemenyek", naplozo);
  if (!ok) {
    throw new Error("Hibás válasz a szervertől: " + status);
  }
  return adat;
}

export async function getEsemeny(id, naplozo) {
  if (!SZERVER_VAN) {
    const talalat = ESEMENYEK.find((e) => e.id === id);
    naplozo({ url: "helyi adat: /esemenyek/" + id, statusz: talalat ? "helyi" : 404, adat: talalat || null });
    if (!talalat) {
      throw new Error("Nincs ilyen azonosítójú esemény: " + id);
    }
    return talalat;
  }
  const { ok, status, adat } = await getKeres("/esemenyek/" + encodeURIComponent(id), naplozo);
  if (status === 404) {
    throw new Error("Nincs ilyen azonosítójú esemény: " + id);
  }
  if (!ok) {
    throw new Error("Hibás válasz a szervertől: " + status);
  }
  return adat;
}

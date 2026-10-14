var kottak = [
  { cim: "Radetzky-induló", szerzo: "Johann Strauss", szolamok: ["Trombita", "Kürt", "Tuba"] },
  { cim: "Himnusz", szerzo: "Erkel Ferenc", szolamok: ["Minden szólam"] },
  { cim: "Karácsonyi dallamok", szerzo: "Hagyományos", szolamok: ["Trombita", "Harsona"] },
  { cim: "Hunyadi-induló", szerzo: "Kéler Béla", szolamok: ["Trombita", "Harsona", "Ütőhangszerek"] },
  { cim: "Őszi korál", szerzo: "Ismeretlen", szolamok: ["Kürt", "Tuba"] }
];

var keresoMezo = document.getElementById("kereses");
var szolamMezo = document.getElementById("szolam");

function megjelenit() {
  var szoveg = keresoMezo.value.toLowerCase();
  var szolam = szolamMezo.value;
  var html = "";
  var db = 0;

  for (var i = 0; i < kottak.length; i++) {
    var k = kottak[i];
    var szovegEgyezik = (k.cim + " " + k.szerzo).toLowerCase().indexOf(szoveg) != -1;
    var szolamEgyezik = szolam == "mind" || k.szolamok.indexOf(szolam) != -1 || k.szolamok.indexOf("Minden szólam") != -1;

    if (szovegEgyezik && szolamEgyezik) {
      html += '<div class="kotta"><h3>' + k.cim + '</h3><p>' + k.szerzo + ' | ' + k.szolamok.join(", ") + '</p></div>';
      db++;
    }
  }

  document.getElementById("darab").textContent = db + " kotta";
  document.getElementById("kotta-lista").innerHTML = html;
}

keresoMezo.addEventListener("input", megjelenit);
szolamMezo.addEventListener("change", megjelenit);

megjelenit();

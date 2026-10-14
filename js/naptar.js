var esemenyek = [
  { cim: "Őszi koncert a főtéren", tipus: "fellepes", datum: "2026-10-24", ido: "17:00", hely: "Városi főtér" },
  { cim: "Megemlékezés a temetőben", tipus: "fellepes", datum: "2026-11-01", ido: "10:30", hely: "Városi köztemető" },
  { cim: "Szólamos próba: rézfúvók", tipus: "proba", datum: "2026-11-05", ido: "17:30", hely: "Zeneiskola, kisterem" },
  { cim: "Hangszerkarbantartás", tipus: "egyeb", datum: "2026-11-14", ido: "09:00", hely: "Zenekari raktár" },
  { cim: "Heti próba: karácsonyi műsor", tipus: "proba", datum: "2026-11-26", ido: "17:30", hely: "Zeneiskola, nagyterem" }
];

var aktualisTipus = "mind";

var nevek = { proba: "Próba", fellepes: "Fellépés", egyeb: "Egyéb" };

// Kiírja az eseményeket a kiválasztott típus szerint
function megjelenit() {
  var doboz = document.getElementById("esemenyek");
  var html = "";
  for (var i = 0; i < esemenyek.length; i++) {
    var e = esemenyek[i];
    if (aktualisTipus == "mind" || aktualisTipus == e.tipus) {
      html += '<div class="esemeny">' +
        '<span class="cimke cimke-' + e.tipus + '">' + nevek[e.tipus] + '</span>' +
        '<h3>' + e.cim + '</h3>' +
        '<p>' + e.datum + ", " + e.ido + " - " + e.hely + '</p>' +
        '</div>';
    }
  }
  if (html == "") {
    html = "<p>Ilyen típusú esemény nincs.</p>";
  }
  doboz.innerHTML = html;
}

// Szűrő gombok
var szuroGombok = document.querySelectorAll("#szuro button");
for (var i = 0; i < szuroGombok.length; i++) {
  szuroGombok[i].addEventListener("click", function () {
    aktualisTipus = this.dataset.tipus;
    for (var j = 0; j < szuroGombok.length; j++) {
      szuroGombok[j].classList.remove("kivalasztott");
    }
    this.classList.add("kivalasztott");
    megjelenit();
  });
}

// Új esemény űrlap
document.getElementById("uj-esemeny").addEventListener("submit", function (ev) {
  ev.preventDefault();
  var uzenet = document.getElementById("esemeny-uzenet");
  var cim = document.getElementById("cim").value;
  var datum = document.getElementById("datum").value;

  if (cim == "" || datum == "") {
    uzenet.textContent = "Adj meg legalább címet és dátumot!";
    uzenet.className = "uzenet hiba";
    uzenet.style.display = "block";
    return;
  }

  esemenyek.push({
    cim: cim,
    tipus: document.getElementById("tipus").value,
    datum: datum,
    ido: document.getElementById("ido").value,
    hely: document.getElementById("hely").value
  });
  uzenet.textContent = "Az esemény hozzáadva.";
  uzenet.className = "uzenet";
  uzenet.style.display = "block";
  this.reset();
  megjelenit();
});

megjelenit();

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

// Feltöltés (backend még nincs, csak az oldalon belül tárolja)
var szolamNevek = ["Minden szólam", "Piccolo", "Fuvola", "Klarinét", "Alt-Szaxofon", "Trombita", "Kürt", "Tenor-Szaxofon", "Baritonkürt", "Harsona", "Tuba", "Dobszerelés", "Ütőhangszerek"];
var szolamDoboz = document.getElementById("f-szolamok");

for (var s = 0; s < szolamNevek.length; s++) {
  szolamDoboz.innerHTML += '<label><input type="checkbox" value="' + szolamNevek[s] + '"> ' + szolamNevek[s] + '</label>';
}

function szolamCsoportFrissitese() {
  var osszes = szolamDoboz.querySelectorAll('input[type="checkbox"]');
  var minden = szolamDoboz.querySelector('input[value="Minden szólam"]');
  var nemMinden = [];

  for (var i = 0; i < osszes.length; i++) {
    if (osszes[i].value !== "Minden szólam") {
      nemMinden.push(osszes[i]);
    }
  }

  if (!minden) {
    return;
  }

  if (minden.checked) {
    for (var j = 0; j < nemMinden.length; j++) {
      nemMinden[j].checked = true;
    }
    return;
  }

  var mindPipalta = true;
  for (var k = 0; k < nemMinden.length; k++) {
    if (!nemMinden[k].checked) {
      mindPipalta = false;
      break;
    }
  }

  minden.checked = mindPipalta;
}

szolamDoboz.addEventListener("change", function (ev) {
  var checkbox = ev.target;

  if (!(checkbox instanceof HTMLInputElement) || checkbox.type !== "checkbox") {
    return;
  }

  if (checkbox.value === "Minden szólam") {
    var osszes = szolamDoboz.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < osszes.length; i++) {
      if (osszes[i].value !== "Minden szólam") {
        osszes[i].checked = checkbox.checked;
      }
    }
    return;
  }

  var minden = szolamDoboz.querySelector('input[value="Minden szólam"]');
  if (!checkbox.checked && minden) {
    minden.checked = false;
    return;
  }

  szolamCsoportFrissitese();
});

document.getElementById("feltoltes").addEventListener("submit", function (ev) {
  ev.preventDefault();
  var uzenet = document.getElementById("feltoltes-uzenet");
  var cim = document.getElementById("f-cim").value.trim();
  var szerzo = document.getElementById("f-szerzo").value.trim();
  var fajl = document.getElementById("f-fajl").files[0];
  var bepipalt = szolamDoboz.querySelectorAll("input:checked");

  if (cim == "" || szerzo == "" || bepipalt.length == 0 || !fajl) {
    uzenet.textContent = "Add meg a címet, a szerzőt, legalább egy szólamot, és válassz fájlt!";
    uzenet.className = "uzenet hiba";
    uzenet.style.display = "block";
    return;
  }

  var szolamok = [];
  for (var i = 0; i < bepipalt.length; i++) {
    szolamok.push(bepipalt[i].value);
  }

  kottak.push({ cim: cim, szerzo: szerzo, szolamok: szolamok, fajl: fajl.name });
  uzenet.textContent = "A kotta hozzáadva.";
  uzenet.className = "uzenet";
  uzenet.style.display = "block";
  this.reset();
  megjelenit();
});

keresoMezo.addEventListener("input", megjelenit);
szolamMezo.addEventListener("change", megjelenit);

megjelenit();

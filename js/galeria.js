// GALÉRIA - nagyon alap JavaScript
// Egyelőre színes helyőrzők vannak a képek helyén.

var kepek = [
  { cim: "Őszi koncert", album: "fellepes", szin: "szin1" },
  { cim: "Majális", album: "fellepes", szin: "szin2" },
  { cim: "Heti próba", album: "proba", szin: "szin3" },
  { cim: "Szólamos próba", album: "proba", szin: "szin4" },
  { cim: "Zenekari kirándulás", album: "kozos", szin: "szin1" },
  { cim: "Évzáró vacsora", album: "kozos", szin: "szin2" }
];

function megjelenit(album) {
  var html = "";
  for (var i = 0; i < kepek.length; i++) {
    if (album == "mind" || album == kepek[i].album) {
      html += '<div class="kep ' + kepek[i].szin + '">' + kepek[i].cim + '</div>';
    }
  }
  document.getElementById("kepek").innerHTML = html;
}

var szuroGombok = document.querySelectorAll("#szuro button");
for (var i = 0; i < szuroGombok.length; i++) {
  szuroGombok[i].addEventListener("click", function () {
    for (var j = 0; j < szuroGombok.length; j++) {
      szuroGombok[j].classList.remove("kivalasztott");
    }
    this.classList.add("kivalasztott");
    megjelenit(this.dataset.album);
  });
}

megjelenit("mind");

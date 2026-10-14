var kepek = [
  { cim: "Újévi Koncert", album: "fellepes", szin: "szin1" },
  { cim: "Március 15.", album: "fellepes", szin: "szin2" },
  { cim: "Heti próba", album: "proba", szin: "szin3" },
  { cim: "Szólamos próba", album: "proba", szin: "szin4" },
  { cim: "Külföldi koncert", album: "kocert", szin: "szin3" },
  { cim: "Zenekari kirándulás", album: "kirandulas", szin: "szin4" },
  { cim: "Nyárzáró koncert", album: "koncert", szin: "szin1" },
  { cim: "Október 6.", album: "koncert", szin: "szin2" }
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

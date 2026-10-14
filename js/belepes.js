function kiir(id, szoveg, hiba) {
  var doboz = document.getElementById(id);
  doboz.textContent = szoveg;
  doboz.className = hiba ? "uzenet hiba" : "uzenet";
  doboz.style.display = "block";
}

document.getElementById("belepes-urlap").addEventListener("submit", function (ev) {
  ev.preventDefault();
  var email = document.getElementById("l-email").value;
  var jelszo = document.getElementById("l-jelszo").value;
  if (email == "" || jelszo == "") {
    kiir("belepes-uzenet", "Add meg az e-mail-címet és a jelszót!", true);
  } else {
    kiir("belepes-uzenet", "Teszt: a belépés még nincs bekötve a szerverhez.", false);
  }
});

document.getElementById("kapcsolat-urlap").addEventListener("submit", function (ev) {
  ev.preventDefault();
  var nev = document.getElementById("k-nev").value;
  var email = document.getElementById("k-email").value;
  var uzenet = document.getElementById("k-uzenet").value;
  if (nev == "" || email == "" || uzenet == "") {
    kiir("kapcsolat-uzenet", "Tölts ki minden mezőt!", true);
  } else {
    kiir("kapcsolat-uzenet", "Teszt: az üzenetet még nem küldjük el sehova.", false);
  }
});

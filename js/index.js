var gombok = document.querySelectorAll(".valasz");
var uzenet = document.getElementById("valasz-uzenet");

for (var i = 0; i < gombok.length; i++) {
  gombok[i].addEventListener("click", function () {
    uzenet.textContent = "Köszönjük! A válaszod: " + this.dataset.valasz;
    uzenet.style.display = "block";
  });
}

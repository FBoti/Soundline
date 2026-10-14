var gombok = document.querySelectorAll(".bovebben");

for (var i = 0; i < gombok.length; i++) {
  gombok[i].addEventListener("click", function () {
    var doboz = document.getElementById(this.dataset.cel);
    doboz.classList.toggle("nyitva");
    if (doboz.classList.contains("nyitva")) {
      this.textContent = "Kevesebb";
    } else {
      this.textContent = "Bővebben";
    }
  });
}

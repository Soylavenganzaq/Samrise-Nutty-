const buscador = document.getElementById("buscador");

if (buscador) {

    buscador.addEventListener("keyup", () => {

        const texto = buscador.value.toLowerCase();

        document.querySelectorAll(".producto-card").forEach(card => {

            const nombre = card.querySelector("h5").textContent.toLowerCase();

            if (nombre.includes(texto)) {

                card.parentElement.style.display = "";

            } else {

                card.parentElement.style.display = "none";

            }

        });

    });

}
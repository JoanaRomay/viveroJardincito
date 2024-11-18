const carritoIcon = document.getElementById('carritoIcon');
const gridContainer = document.getElementById('gridContainer');
const vidriado = document.getElementById('vidriado');


carritoIcon.addEventListener("click", function () {
    if (gridContainer.style.display === "none" || gridContainer.style.display === "") {
        gridContainer.style.display = "grid";
        vidriado.style.display = "block";
    } else {
        gridContainer.style.display = "none";
        vidriado.style.display = "none";
    }
});

vidriado.addEventListener("click", function () {
    vidriado.style.display = "none";
    gridContainer.style.display = "none";
});




//menu hamburguesa: cuando hacemos click en un link se esconde el ul con los item
document.querySelectorAll('.aNavBar').forEach(item => { 
    item.addEventListener('click', event => { // Desmarca el checkbox para esconder el menú 
    document.getElementById('menu_hamburguesa').checked = false; 
}) 
})



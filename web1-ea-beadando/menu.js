document.addEventListener("DOMContentLoaded", function() {
    const foods = document.querySelectorAll(".food");
    const menu = document.getElementById("menu");
    const backfood = document.getElementById("backfood");

    // Húzható ételek eseményei
    foods.forEach(food => {
        food.addEventListener("dragstart", function(event) {
            event.dataTransfer.setData("text", event.target.id);
        });
    });

    // Napi menü terület eseményei
    menu.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    menu.addEventListener("drop", function(event) {
        event.preventDefault();
        const foodId = event.dataTransfer.getData("text");
        const draggedFood = document.getElementById(foodId);

        if (draggedFood) {
            menu.appendChild(draggedFood);
        }
    });

    backfood.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    backfood.addEventListener("drop", function(event) {
        event.preventDefault();
        const foodId = event.dataTransfer.getData("text");
        const draggedFood = document.getElementById(foodId);

        if (draggedFood) {
            backfood.appendChild(draggedFood);
        }
    });
});

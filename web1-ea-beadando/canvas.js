document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("workoutChart");
    const ctx = canvas.getContext("2d");

    // Adatok
    const workouts = {
        "Hétfő": 30,
        "Kedd": 45,
        "Szerda": 60,
        "Csütörtök": 45,
        "Péntek": 30,
        "Szombat": 60,
        "Vasárnap": 45
    };

    const days = Object.keys(workouts);
    const values = Object.values(workouts);

    const maxWorkout = Math.max(...values);
    const barWidth = 50;
    const barSpacing = 20;
    const startX = 50;
    const charHeight = canvas.height - 50;

    ctx.fillStyle = "lightblue";
    values.forEach((value, index) => {
        let barHeight = (value / maxWorkout) * charHeight;
        let x = startX + index * (barWidth + barSpacing);
        let y = canvas.height - barHeight -20;

        ctx.fillRect(x, y, barWidth, barHeight);
        ctx.fillStyle = "black";
        ctx.fillText(days[index], x + 5, canvas.height - 5);
        ctx.fillText(value + " perc", x + 5, y - 5);
        ctx.fillStyle = "lightblue";
    });

    // Tengelyek rajzolása
    ctx.beginPath();
    ctx.moveTo(40, 10);
    ctx.lineTo(40, canvas.height - 20);
    ctx.lineTo(canvas.width - 10, canvas.height - 20);
    ctx.stroke();
});

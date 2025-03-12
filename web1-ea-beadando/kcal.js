onmessage = function(event) {
    let { exercise, duration, weight } = event.data;
    let caloriesPerMinute = 0;

    switch (exercise) {
        case "running":
            caloriesPerMinute = 0.1 * weight;
            break;
        case "jogging":
            caloriesPerMinute = 0.2 * weight;
            break;
        case "walking":
            caloriesPerMinute = 0.3 * weight;
            break;
        case "swimming":
            caloriesPerMinute = 0.4 * weight;
            break;
        case "cycling":
            caloriesPerMinute = 0.5 * weight;
            break;
        case "dancing":
            caloriesPerMinute = 1 * weight;
            break;
        case "weightlifting":
            caloriesPerMinute = 0.6 * weight;
            break;
        case "combinetraining":
            caloriesPerMinute = 0.7 * weight;
            break;
    }
    let totalCalories = caloriesPerMinute * duration;
    postMessage(totalCalories.toFixed(2));
};
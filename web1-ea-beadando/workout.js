
class Workout {
    constructor(name, type, duration, calories) {
        this.name = name;
        this.type = type;
        this.duration = duration; 
        this.calories = calories; 
    }


    displayWorkout(container = document.body) {
        const workoutDiv = document.createElement('div');
        workoutDiv.className = 'workout';
        workoutDiv.innerHTML = `
            <h3>${this.name}</h3>
            <p>Típus: ${this.type}</p>
            <p>Időtartam: ${this.duration} perc</p>
            <p>Kalóriaégetés: ${this.calories} kcal</p>
        `;
        container.appendChild(workoutDiv);
    }


    calculateCalories() {
        return this.duration * 5; 
    }
}


class StrengthWorkout extends Workout {
    constructor(name, duration, calories, weight, reps) {
        super(name, 'Súlyzós edzés', duration, calories);
        this.weight = weight; 
        this.reps = reps; 
    }


    calculateCalories() {
        return this.duration * 8 + this.weight * this.reps * 0.1; 
    }


    displayWorkout(container = document.body) {
        const workoutDiv = document.createElement('div');
        workoutDiv.className = 'workout strength';
        workoutDiv.innerHTML = `
            <h3>${this.name}</h3>
            <p>Típus: ${this.type}</p>
            <p>Időtartam: ${this.duration} perc</p>
            <p>Súly: ${this.weight} kg</p>
            <p>Ismétlések: ${this.reps}</p>
            <p>Kalóriaégetés: ${this.calculateCalories()} kcal</p>
        `;
        container.appendChild(workoutDiv);
    }
}




workout1.displayWorkout();
workout2.displayWorkout();

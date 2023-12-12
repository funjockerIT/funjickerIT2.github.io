let customLatitude = null;

function setCustomLocation1(event) {
    const earth = document.getElementById('earth_1');
    const latitudeInput = document.getElementById('latitudeInput');
    const rect = earth.getBoundingClientRect();
    const y = event.clientY - rect.top;

    const latitude = (90 - (y / rect.height) * 180).toFixed(0);

    customLatitude = latitude;

    // alert(`Выбрана точка: Широта ${latitude}`);

    latitudeInput.value = customLatitude
}

function setCustomLocation2(event) {
    const earth = document.getElementById('earth_2');
    const latitudeInput = document.getElementById('latitudeInput');
    const rect = earth.getBoundingClientRect();
    const y = event.clientY - rect.top;

    const latitude = (90 - (y / rect.height) * 180).toFixed(0);

    customLatitude = latitude;

    // alert(`Выбрана точка: Широта ${latitude}`);

    latitudeInput.value = customLatitude
}


function calculateGravity() {
    const latitudeInput = document.getElementById('latitudeInput');
    const resultElement = document.getElementById('result');
    let latitude;

    if (customLatitude !== null) {
        latitude = customLatitude;
    } else {
        latitude = parseFloat(latitudeInput.value);
    }

    if (isNaN(latitude)) {
        alert('Введите корректное значение широты');
        return;
    }

    const gravity = calculateGravityAtLatitude(latitude);
    // resultElement.textContent = `Ускорение свободного падения на широте ${latitude} равно ${gravity.toFixed(2)} м/с²`;
    resultElement.textContent = `Ускорение свободного падения на широте ${latitude}° равно ${gravity.toFixed(5)} м/с²`;
}

function calculateGravityAtLatitude(latitude) {
    const g0 = 9.78; // Ускорение свободного падения на экваторе
    const omegaSquared = 7.2921159e-5 ** 2; // Квадрат угловой скорости вращения Земли
    const sinSquared = Math.sin(latitude * (Math.PI / 180)) ** 2; // Квадрат 
    const eSquared = 0.00669438 // Квадрат эксцентриситета Земли

    return g0 * (1 - omegaSquared * sinSquared) / Math.sqrt(1 - eSquared * sinSquared);
}


console.log(calculateGravityAtLatitude(0));   // Ускорение на экваторе
console.log(calculateGravityAtLatitude(90));  // Ускорение на полюсах
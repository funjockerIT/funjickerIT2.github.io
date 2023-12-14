const latitudeInput = document.getElementById('latitudeInput');
const resultElement = document.getElementById('result');
const map = WE.map('map', { zoom: window.screen.width > 432 ? 2.8 : 1.6, dragging: true, scrollWheelZoom: true });

let customLatitude = null;

function init() {
    map.on("click", function (e) {
        customLatitude = e.latlng.lat.toFixed(5);
        latitudeInput.value = customLatitude
    });

    WE.tileLayer('https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg', { tileSize: 200, tms: true }).addTo(map);
}

function calculateGravity() {
    const latitude = parseFloat(latitudeInput.value);

    if (isNaN(latitude)) {
        alert('Введите корректное значение широты');
        return;
    }

    const gravity = calculateGravityAtLatitude(latitude);
    resultElement.textContent = `На широте ${latitude}° g=${gravity.toFixed(3)} м/с²`;
}

function calculateGravityAtLatitude(latitude) {
    const g0 = 9.78; // Ускорение свободного падения на экваторе
    const omegaSquared = 7.2921159e-5 ** 2; // Квадрат угловой скорости вращения Земли
    const sinSquared = Math.sin(latitude * (Math.PI / 180)) ** 2; // Квадрат 
    const eSquared = 0.00669438 // Квадрат эксцентриситета Земли

    return g0 * (1 - omegaSquared * sinSquared) / Math.sqrt(1 - eSquared * sinSquared);
}


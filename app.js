const form = document.querySelector('form');
const resultHTML = document.querySelector('.result');
const calculateButton = document.querySelector('.result-button');

function checkIfInteger(number) {
    return Number.isInteger(number) ? number : parseFloat(number.toFixed(2));
}

function getData() {
    let numberA = parseFloat(document.querySelector('#numberA').value);
    let numberB = parseFloat(document.querySelector('#numberB').value);
    let numberC = parseFloat(document.querySelector('#numberC').value);

    if (isNaN(numberA) || isNaN(numberB) || isNaN(numberC) || numberA >= 10000 || numberB >= 10000 || numberC >= 10000) {
        alert('Podane wartości muszą być liczbami mniejszymi od 10000!');
        return null;
    }

    return [numberA, numberB, numberC];
}

function showData(a, b, c) {
    if (a === undefined || b === undefined || c === undefined) {
        resultHTML.textContent = 'Niepoprawne dane!';
        return;
    }

    if (a === 0 && b === 0 && c === 0) {
        result = 'Równanie tożsamościowe';
    }
    else if (a === 0 && b === 0 && c != 0) {
        result = 'Równanie sprzeczne';
    }
    else if (a === 0 && b != 0 && c != 0) {
        result = `
        Współczynnik a < 0, zatem obliczam miejsce zerowe funkcji liniowej: 
        <br>
        x = ${checkIfInteger(-c / b)}
        <br>
        `;
    }
    else {
        result = calculateFnResult(a, b, c);
    }

    resultHTML.innerHTML = result;
}

function calculateFnResult(a, b, c) {
    const delta = Math.pow(b, 2) - 4 * a * c;

    if (delta < 0) {
        return 'Brak rozwiązań';
    }

    const deltaMessage = `
         Δ = ${checkIfInteger(delta)} 
         <br>
         √Δ = ${checkIfInteger(Math.sqrt(delta))}
         <br>
    `;

    if (delta === 0) {
        return ` 
            <span>${deltaMessage}</span>
            <span>x = ${checkIfInteger(-b / (2 * a))}</span>
            <span>Ramiona skierowane w ${a > 0 ? 'górę' : 'dół'}</span>
        `;
    }

    const sqrtDelta = Math.sqrt(delta);
    const x1 = checkIfInteger((-b - sqrtDelta) / (2 * a));
    const x2 = checkIfInteger((-b + sqrtDelta) / (2 * a));

    return `
        <span>${deltaMessage}</span>
        <span>
            x<sub>1</sub> = ${x1} 
            <br>
            x<sub>2</sub> = ${x2} 
        </span>
        <span>
            x<sub>w</sub> = ${checkIfInteger((x1 + x2) / 2)}
            <br>
            y<sub>w</sub> = ${checkIfInteger(-delta / (4 * a))}
        </span>
        <span>Ramiona skierowane w ${a > 0 ? 'górę' : 'dół'}</span>
    `;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
});

calculateButton.onclick = () => {
    const data = getData();
    if (data) {
        showData(...data);
    }
};
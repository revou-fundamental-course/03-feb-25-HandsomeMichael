
//Loading
// if (!sessionStorage.getItem("hasLoaded")) {
//     sessionStorage.setItem("hasLoaded", "true");
// } 
// else {
//     document.querySelector(".loading").style.display = "none";
// }

document.addEventListener("DOMContentLoaded", () => {
    const celciusInput = document.getElementById("main-celcius");
    const fahrenheitInput = document.getElementById("main-fahrenheit");
    const conversionStep = document.getElementById("konversi-cara");

    const convertBtn = document.getElementById("convert-btn");
    const resetBtn = document.getElementById("reset-btn");
    const reverseBtn = document.getElementById("reverse-btn");

    let isCelciusToFahrenheit = true;

    function convert() {
        if (isCelciusToFahrenheit) {
            let c = parseFloat(celciusInput.value);
            if (!isNaN(c)) {
                let f = (c * 9/5) + 32;
                fahrenheitInput.value = f.toFixed(2);
                conversionStep.value = `${c} × 9/5 + 32 = ${f.toFixed(2)}°F`;
            }
        } else {
            let f = parseFloat(fahrenheitInput.value);
            if (!isNaN(f)) {
                let c = (f - 32) * 5/9;
                celciusInput.value = c.toFixed(2);
                conversionStep.value = `(${f} - 32) × 5/9 = ${c.toFixed(2)}°C`;
            }
        }
    }

    function reset() {
        celciusInput.value = "";
        fahrenheitInput.value = "";
        conversionStep.value = "";
    }

    function reverse() {
        isCelciusToFahrenheit = !isCelciusToFahrenheit;

        let celc = celciusInput.value;
        let fah =  fahrenheitInput.value;

        // Transfer the value without modification
        if (isCelciusToFahrenheit) {
            celciusInput.value = fah;
            fahrenheitInput.value = celc;

        } else {
            fahrenheitInput.value = celc;
            celciusInput.value = fah;

        }

        conversionStep.value = '';

        // Swap readonly state
        celciusInput.toggleAttribute("readonly");
        fahrenheitInput.toggleAttribute("readonly");

        // reset(); // Reset the calculation
    }

    convertBtn.addEventListener("click", convert);
    resetBtn.addEventListener("click", reset);
    reverseBtn.addEventListener("click", reverse);
});

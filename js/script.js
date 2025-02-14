
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

    const displayCC = document.getElementsByClassName("display-cc");
    const displayFF = document.getElementsByClassName("display-ff");

    const errorCC = document.getElementById("error-cc");
    const errorFF = document.getElementById("error-ff");


    let isCelciusToFahrenheit = true;

    function convert() 
    {
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
        reset_error();
    }

    function reverse() {
        isCelciusToFahrenheit = !isCelciusToFahrenheit;
        conversionStep.value = '';

        document.querySelectorAll(".display-cc").forEach(el => {
            el.style.display = isCelciusToFahrenheit ? "none" : "block";
        });

        document.querySelectorAll(".display-ff").forEach(el => {
            el.style.display = isCelciusToFahrenheit ? "block" : "none";
        });

        if (isCelciusToFahrenheit)
        {
            celciusInput.placeholder  = "Masukkan suhu celcius ...";
            fahrenheitInput.placeholder  = "Hasil dalam suhu fahrenheit";
        }
        else
        {
            fahrenheitInput.placeholder  = "Masukkan suhu fahrenheit ...";
            celciusInput.placeholder  = "Hasil dalam suhu celcius";
        }

        // Swap readonly state
        celciusInput.toggleAttribute("readonly");
        fahrenheitInput.toggleAttribute("readonly");

        convert();
        reset_error();

    }

    function on_convert()
    {
        if (isCelciusToFahrenheit)
        {
            if (celciusInput.value == '')
            {
                errorCC.style.display = "block";
                return;
            }
        }
        else 
        {
            if (fahrenheitInput.value == '')
            {
                errorFF.style.display = "block";
                return;
            }
        }

        errorCC.style.display = "none";
        errorFF.style.display = "none";

        convert();
    }

    function reset_error()
    {
        errorCC.style.display = "none";
        errorFF.style.display = "none";
    }

    function copy_input_cc()
    {

        // console.log("tai");
        // if (celciusInput.value == "")
        // {
        //     console.log("tai");
        //     return;
        // }
        if (celciusInput.value == "")return;
        navigator.clipboard.writeText(celciusInput.value).then(() => {alert("Copied: " + celciusInput.value+"°C");});
    }

    function copy_input_ff()
    {
        if (fahrenheitInput.value == "")return;
        navigator.clipboard.writeText(fahrenheitInput.value).then(() => {alert("Copied: " + fahrenheitInput.value+"°F");});
    }

    function copy_input_cara()
    {
        if (conversionStep.value == "")return;
        navigator.clipboard.writeText(conversionStep.value).then(() => {alert("Copied: " + conversionStep.value);});
    }

    convertBtn.addEventListener("click", on_convert);
    resetBtn.addEventListener("click", reset);
    reverseBtn.addEventListener("click", reverse);

    document.getElementById("copy-cc").addEventListener("click", copy_input_cc);
    document.getElementById("copy-ff").addEventListener("click", copy_input_ff);
    document.getElementById("copy-cara").addEventListener("click", copy_input_cara);

    document.querySelectorAll(".display-ff").forEach(el => el.style.display = "none");

    reset_error();
});


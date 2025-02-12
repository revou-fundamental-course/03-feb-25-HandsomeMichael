document.addEventListener("DOMContentLoaded", () => {
  const celsiusInput = document.getElementById("celsius");
  const fahrenheitInput = document.getElementById("fahrenheit");
  const kalkulasiInput = document.getElementById("kalkulasi");
  const reverseButton = document.getElementById("reverse");

  let isCelsiusToFahrenheit = true;

  function convertCelsiusToFahrenheit() {
    let celsius = parseFloat(celsiusInput.value);
    if (!isNaN(celsius)) {
      let fahrenheit = (celsius * 9) / 5 + 32;
      fahrenheitInput.value = fahrenheit.toFixed(2);
      kalkulasiInput.value = `${celsius} * 9/5 + 32 = ${fahrenheit.toFixed(
        2
      )} °F`;
    } else {
      fahrenheitInput.value = "";
      kalkulasiInput.value = "";
    }
  }

  function convertFahrenheitToCelsius() {
    let fahrenheit = parseFloat(fahrenheitInput.value);
    if (!isNaN(fahrenheit)) {
      let celsius = ((fahrenheit - 32) * 5) / 9;
      celsiusInput.value = celsius.toFixed(2);
      kalkulasiInput.value = `${fahrenheit} - 32 * 5/9 = ${celsius.toFixed(
        2
      )} °C`;
    } else {
      celsiusInput.value = "";
      kalkulasiInput.value = "";
    }
  }

  function swapInput() {
    if (isCelsiusToFahrenheit) {
      fahrenheitInput.readOnly = true;
      celsiusInput.readOnly = false;
    } else {
      celsiusInput.readOnly = true;
      fahrenheitInput.readOnly = false;
    }
  }

  celsiusInput.addEventListener("input", function () {
    if (isCelsiusToFahrenheit) convertCelsiusToFahrenheit();
  });

  fahrenheitInput.addEventListener("input", function () {
    if (!isCelsiusToFahrenheit) convertFahrenheitToCelsius();
  });

  reverseButton.addEventListener("click", function () {
    isCelsiusToFahrenheit = !isCelsiusToFahrenheit;
    celsiusInput.value = "";
    fahrenheitInput.value = "";
    kalkulasiInput.value = "";
    swapInput();

    // Particle explosion
    const rect = reverseButton.getBoundingClientRect();
    createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
  });

  swapInput(); // Initialize input correctly

  // ✅ Particle System
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.pointerEvents = "none";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext("2d");
  let particles = [];

  function createParticles(x, y) {
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: x,
        y: y,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 20,
        speedY: (Math.random() - 0.5) * 20,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        life: 100,
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;
      p.life -= 2;

      if (p.life <= 0) {
        particles.splice(index, 1);
      }
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles(); // Start animation loop
});

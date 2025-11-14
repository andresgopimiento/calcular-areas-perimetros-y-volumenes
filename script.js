const figuraSelect = document.getElementById("figura");
const inputsDiv = document.getElementById("inputs");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

figuraSelect.addEventListener("change", generarInputs);
generarInputs();

function generarInputs() {
  const figura = figuraSelect.value;
  inputsDiv.innerHTML = "";
  errorDiv.textContent = "";
  resultDiv.innerHTML = "";

  const inputs = {
    cuadrado: ["Lado"],
    rectangulo: ["Base", "Altura"],
    circulo: ["Radio"],

    cubo: ["Lado"],
    paralelepipedo: ["Largo", "Ancho", "Alto"],
    esfera: ["Radio"],
    cilindro: ["Radio", "Altura"],
  };

  (inputs[figura] || []).forEach(nombre => {
    const id = nombre.toLowerCase();
    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = nombre + ":";

    const input = document.createElement("input");
    input.type = "number";
    input.id = id;
    input.min = "0.01";
    input.required = true;

    inputsDiv.appendChild(label);
    inputsDiv.appendChild(input);
  });
}

function calcular() {
  const figura = figuraSelect.value;
  errorDiv.textContent = "";
  resultDiv.innerHTML = ""; 

  const val = id => parseFloat(document.getElementById(id)?.value);

  // Validar inputs positivos
  const inputsElems = inputsDiv.querySelectorAll("input");
  for (const input of inputsElems) {
    if (!input.value || parseFloat(input.value) <= 0) {
      errorDiv.textContent = "Ingrese valores válidos y mayores a cero.";
      return;
    }
  }

  // Variables resultado para áreas, perímetros, volúmenes
  let area, perimetro, volumen;

  if (figura === "cuadrado") {
    const lado = val("lado");
    area = lado * lado;
    perimetro = 4 * lado;
    resultDiv.innerHTML = `<p>Área: ${area.toFixed(2)}</p><p>Perímetro: ${perimetro.toFixed(2)}</p>`;
  } else if (figura === "rectangulo") {
    const base = val("base");
    const altura = val("altura");
    area = base * altura;
    perimetro = 2 * (base + altura);
    resultDiv.innerHTML = `<p>Área: ${area.toFixed(2)}</p><p>Perímetro: ${perimetro.toFixed(2)}</p>`;
  } else if (figura === "circulo") {
    const radio = val("radio");
    area = Math.PI * radio ** 2;
    perimetro = 2 * Math.PI * radio;
    resultDiv.innerHTML = `<p>Área: ${area.toFixed(2)}</p><p>Perímetro: ${perimetro.toFixed(2)}</p>`;
  } else if (figura === "cubo") {
    const lado = val("lado");
    volumen = lado ** 3;
    resultDiv.innerHTML = `<p>Volumen: ${volumen.toFixed(2)}</p>`;
  } else if (figura === "paralelepipedo") {
    const largo = val("largo");
    const ancho = val("ancho");
    const alto = val("alto");
    volumen = largo * ancho * alto;
    resultDiv.innerHTML = `<p>Volumen: ${volumen.toFixed(2)}</p>`;
  } else if (figura === "esfera") {
    const radio = val("radio");
    volumen = (4 / 3) * Math.PI * radio ** 3;
    resultDiv.innerHTML = `<p>Volumen: ${volumen.toFixed(2)}</p>`;
  } else if (figura === "cilindro") {
    const radio = val("radio");
    const altura = val("altura");
    volumen = Math.PI * radio ** 2 * altura;
    resultDiv.innerHTML = `<p>Volumen: ${volumen.toFixed(2)}</p>`;
  } else {
    errorDiv.textContent = "Figura no reconocida.";
    return;
  }

  dibujar(figura);
}

function limpiar() {
  inputsDiv.querySelectorAll("input").forEach(i => i.value = "");
  resultDiv.innerHTML = "";
  errorDiv.textContent = "";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujar(figura) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";

  switch(figura) {
    case "cuadrado":
      ctx.strokeRect(100, 100, 200, 200);
      break;
    case "rectangulo":
      ctx.strokeRect(80, 120, 280, 160);
      break;
    case "circulo":
      ctx.beginPath();
      ctx.arc(200, 200, 100, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case "cubo":
      ctx.strokeRect(150, 150, 200, 200);
      ctx.strokeRect(200, 100, 200, 200);
      ctx.beginPath();
      ctx.moveTo(150,150); ctx.lineTo(200,100);
      ctx.moveTo(350,150); ctx.lineTo(400,100);
      ctx.moveTo(150,350); ctx.lineTo(200,300);
      ctx.moveTo(350,350); ctx.lineTo(400,300);
      ctx.stroke();
      break;
    case "paralelepipedo":
      ctx.strokeRect(120, 180, 260, 150);
      ctx.strokeRect(180, 120, 260, 150);
      ctx.beginPath();
      ctx.moveTo(120,180); ctx.lineTo(180,120);
      ctx.moveTo(380,180); ctx.lineTo(440,120);
      ctx.moveTo(120,330); ctx.lineTo(180,270);
      ctx.moveTo(380,330); ctx.lineTo(440,270);
      ctx.stroke();
      break;
    case "esfera":
      ctx.beginPath();
      ctx.arc(300, 250, 120, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(300, 250, 120, 50, 0, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case "cilindro":
      ctx.beginPath();
      ctx.ellipse(300, 180, 120, 40, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(180,180); ctx.lineTo(180,380);
      ctx.moveTo(420,180); ctx.lineTo(420,380);
      ctx.ellipse(300, 380, 120, 40, 0, 0, Math.PI);
      ctx.stroke();
      break;
  }
}

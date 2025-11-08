const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function generarEjercicio(tipo, dificultad) {
  // 🔢 Definir rango exacto por dificultad
  let min, max;
  switch (dificultad) {
    case 1:
      min = 1; max = 9;
      break;
    case 2:
      min = 10; max = 99;
      break;
    case 3:
      min = 100; max = 999;
      break;
    default:
      min = 1; max = 9;
  }

  let a, b, resultado, simbolo;

  switch (tipo) {
    case "suma":
      simbolo = "+";
      a = rand(min, max);
      b = rand(min, max);
      resultado = a + b;
      break;

    case "resta":
      simbolo = "−";
      a = rand(min, max);
      b = rand(min, a); // aseguramos resultado positivo
      resultado = a - b;
      break;

    case "multiplicacion":
      simbolo = "×";
      a = rand(min, max);
      b = rand(min, max);
      resultado = a * b;
      break;

    case "division":
      simbolo = "÷";
      // Queremos divisiones exactas con el mismo rango
      b = rand(min, max);
      resultado = rand(min, max);
      a = b * resultado;
      break;

    case "mixto":
      const tipos = ["suma", "resta", "multiplicacion", "division"];
      return generarEjercicio(tipos[rand(0, tipos.length - 1)], dificultad);

    default:
      simbolo = "+";
      a = 1; b = 1; resultado = 2;
  }

  return { a, b, simbolo, respuesta: resultado };
}

// --- Control principal ---
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM cargado");

  const btn = document.getElementById("generar");
  const lista = document.getElementById("lista");
  const dificultadSel = document.getElementById("dificultad");
  const tipoSel = document.getElementById("tipo");
  const formatoSel = document.getElementById("formato");
  const cantidadInput = document.getElementById("cantidad");

  btn.addEventListener("click", () => {
    const diff = Number(dificultadSel.value);
    const tipo = tipoSel.value;
    const formato = formatoSel.value;
    const cantidad = Number(cantidadInput.value);

    console.log(`🎯 Generando ${cantidad} ejercicios — Dificultad: ${diff}, Tipo: ${tipo}, Formato: ${formato}`);

    lista.innerHTML = "";

    for (let i = 1; i <= cantidad; i++) {
      const e = generarEjercicio(tipo, diff);
      console.log(`Ejercicio ${i}:`, e);

      const div = document.createElement("div");

      if (formato === "vertical") {
        div.className = "pregunta-vertical";
        div.innerHTML = `
          <div class="numeros">
            <div class="num a">${e.a}</div>
            <div class="num b">${e.simbolo} ${e.b}</div>
            <div class="linea"></div>
          </div>
          <button data-resp="${e.respuesta}">Mostrar</button>
        `;
      } else {
        div.className = "pregunta-horizontal";
        div.innerHTML = `
          <span><strong>${i}.</strong> ${e.a} ${e.simbolo} ${e.b} = </span>
          <button data-resp="${e.respuesta}">Mostrar</button>
        `;
      }

      const boton = div.querySelector("button");
      boton.addEventListener("click", () => {
        console.log(`🟡 Respuesta mostrada (${i}): ${e.respuesta}`);
        boton.textContent = "Respuesta: " + e.respuesta;
        boton.disabled = true;
      });

      lista.appendChild(div);
    }

    console.log(`✅ ${cantidad} ejercicios generados correctamente`);
  });
});

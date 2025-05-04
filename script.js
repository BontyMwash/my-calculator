function append(char) {
  const display = document.getElementById("display");
  display.value += char;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function deleteChar() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function calculate() {
  let expression = document.getElementById("display").value;

  try {
    // Replace common scientific functions
    expression = expression.replace(/√/g, "Math.sqrt");
    expression = expression.replace(/sin/g, "Math.sin");
    expression = expression.replace(/cos/g, "Math.cos");
    expression = expression.replace(/tan/g, "Math.tan");
    expression = expression.replace(/log/g, "Math.log10");
    expression = expression.replace(/ln/g, "Math.log");
    expression = expression.replace(/\^/g, "**");

    // Evaluate and show result
    const result = eval(expression);
    document.getElementById("display").value = result;
  } catch (e) {
    document.getElementById("display").value = "Error";
  }
}
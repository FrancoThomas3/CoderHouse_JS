//CONDICIONAL
let temperatura = 25;

if (temperatura > 30) {
    console.log("Hace mucho calor.");
} else if (temperatura >= 20 && temperatura <= 30) {
    console.log("El clima está agradable.");
} else {
    console.log("Hace frío.");
}

//CICLO
for (let i = 1; i <= 5; i++) {
    console.log("Número: " + i);
}

//SIMULADOR INTERACTIVO
let nombre = prompt("¿Cuál es tu nombre?");
let edad = prompt("¿Cuántos años tienes?");

if (edad >= 18) {
    alert("Hola " + nombre + ", eres mayor de edad.");
} else {
    alert("Hola " + nombre + ", eres menor de edad.");
}


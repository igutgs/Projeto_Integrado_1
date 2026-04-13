/*
IMC (segundo OMS)

Menor que 16: Magreza grave
16 a 16,9: Magreza moderada
17 a 18,5: Magreza leve
18,5 a 24,9: Peso ideal/Normal
25 a 29,9: Sobrepeso
30 a 34,9: Obesidade grau I
35 a 39,9: Obesidade grau II (severa)
Maior que 40: Obesidade grau III (mórbida)
*/

function calcularIMC(altura, peso) {
    if (altura <= 0 || peso <= 0) {
        throw Error("Altura e peso devem ser maiores que zero.");
    }
    else if (altura === undefined || peso === undefined) {
        throw Error("Altura e peso devem ser definidos.");
    }
    else if (typeof altura !== "number" || typeof peso !== "number") {
        throw Error("Altura e peso devem ser números.");
    }
    else{
        return peso / (altura * altura);
    }
}   

function classificaIMC(imc) {
    if (imc < 16) {
        return "Magreza grave";
    }
    else if (imc >= 16 && imc < 16.9) {
        return "Magreza moderada";
    }
    else if (imc >= 17 && imc < 18.5) {
        return "Magreza leve";
    }
    else if (imc >= 18.5 && imc < 24.9) {
        return "Peso ideal/Normal";
    }
    else if (imc >= 25 && imc < 29.9) {  
        return "Sobrepeso";
    }
    else if (imc >= 30 && imc < 35) {
        return "Obesidade Grau I";
    }
    else if (imc >= 35 && imc <= 39.9) {
        return "Obesidade Grau II (severa)";
    }
    else {
        return "Obesidade Grau III (mórbida)";
    }
}

let imc = calcularIMC(1.65, 60);
console.log("IMC: " + imc.toFixed(2));
console.log("Classificação: " + classificaIMC(imc));
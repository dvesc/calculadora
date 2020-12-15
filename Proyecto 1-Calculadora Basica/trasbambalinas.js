const $barra = document.getElementById("barraDeOperaciones"),
  $enter = document.getElementById("opIgual"),
  $suma = document.getElementById("opSuma"),
  $resta = document.getElementById("opResta"),
  $multiplicacion = document.getElementById("opMultiplicacion"),
  $divison = document.getElementById("opDivision"),
  $potencia = document.getElementById("opPotencia"),
  $puntoDecimal = document.getElementById("opDecimal"),
  $valorPi = document.getElementById("opPi"),
  $cero = document.getElementById("num0"),
  $uno = document.getElementById("num1"),
  $dos = document.getElementById("num2"),
  $tres = document.getElementById("num3"),
  $cuatro = document.getElementById("num4"),
  $cinco = document.getElementById("num5"),
  $seis = document.getElementById("num6"),
  $siete = document.getElementById("num7"),
  $ocho = document.getElementById("num8"),
  $nueve = document.getElementById("num9"),
  $borraTodo = document.getElementById("opElimina");

//elimina los caracteres que no son validos como las letras y elimina el signo "+" y " " al inicio (accede directamente al HTML)
const caracteresAceptados = (valorDelInput) => {
  let validado = "";
  if (/[+/*^-]/.test(valorDelInput[0]) === true || valorDelInput[0] === " ")
    valorDelInput = valorDelInput.slice(1, valorDelInput.length);

  for (i = 0; i <= valorDelInput.length; i++)
    if ("1234567890+-*./^ ".indexOf(valorDelInput.charAt(i)) != -1)
      validado += valorDelInput.charAt(i);

  return validado;
};

//me agrega a la barra de operaciones un nuevo valor (concatena)
const aniadeAlAtributo = (caracter) => ($barra.value += `${caracter}`);

//evalia que tipo de valor es "+,-,/, etc"
const marcaOperador = (e) =>
  e.target === $suma
    ? aniadeAlAtributo("+")
    : e.target === $resta
    ? aniadeAlAtributo("-")
    : e.target === $multiplicacion
    ? aniadeAlAtributo("*")
    : e.target === $divison
    ? aniadeAlAtributo("/")
    : e.target === $potencia
    ? aniadeAlAtributo("^")
    : e.target === $valorPi
    ? aniadeAlAtributo("3.1416")
    : aniadeAlAtributo(".");

const marcaNumero = (e) =>
  e.target === $uno
    ? aniadeAlAtributo("1")
    : e.target === $dos
    ? aniadeAlAtributo("2")
    : e.target === $tres
    ? aniadeAlAtributo("3")
    : e.target === $cuatro
    ? aniadeAlAtributo("4")
    : e.target === $cinco
    ? aniadeAlAtributo("5")
    : e.target === $seis
    ? aniadeAlAtributo("6")
    : e.target === $siete
    ? aniadeAlAtributo("7")
    : e.target === $ocho
    ? aniadeAlAtributo("8")
    : e.target === $nueve
    ? aniadeAlAtributo("9")
    : aniadeAlAtributo("0");

const separaLosOperadores = (val) => {
  let separado = "";
  for (valor of val)
    if (/[+/*^-]/g.test(valor) === true)
      separado = val.replaceAll(valor, ` ${valor} `);
  return separado;

  /* OTRA FORMA DE HACERLO
    let separado = val.split("");
    separado.forEach((element, index) => {
        if (/[(+)(/)(-)(*)(^)]/.test(element) === true)
            separado[index] = ` ${element} `
            console.log(separado)
    });*/
  //separado = separado.join("");
};

/*Toma el valor de lo que esta escrito en el input y lo parte a una array a partir de 
 los espacios " " y convierte los numeros (string) en Numbers:v
*/
const deTextoAOperable = () => {
  let valorIngresado = separaLosOperadores($barra.value),
    operadoresYNumeros = valorIngresado
      .split(" ")
      .map((element) =>
        /[0-9]/.test(element) === true
          ? parseFloat(element)
          : (element = element)
      );

  return operadoresYNumeros;
};

/*LA LOGICA DE LA CALCULADORA:
    recorre la array y evalua si el elemento actual es un operador aritmetico:
    ; si lo es
        opera el valor de "resultado" (ya inicializado con el primer valor del array) y opera el
        valor posterior del elemento actual (que es un operador) a partir del indice (index + 1)
    ; si no lo es resultado sera igual a si mismo
    lo que hace es que almacena en una variable "resultado" la operacion
*/
const opera = () => {
  let valorTransformado = deTextoAOperable(),
    resultado = valorTransformado[0];

  valorTransformado.forEach((element, index) =>
    element === "+"
      ? (resultado += valorTransformado[index + 1])
      : element === "-"
      ? (resultado -= valorTransformado[index + 1])
      : element === "*"
      ? (resultado *= valorTransformado[index + 1])
      : element === "/"
      ? (resultado /= valorTransformado[index + 1])
      : element === "^"
      ? (resultado = Math.pow(resultado, valorTransformado[index + 1]))
      : (resultado = resultado)
  );

  return ($barra.value = resultado);
};

/*document.addEventListener("click", (e)=>
    (e.target.matches("#numeros"))
        ? marcaNumero(e)
        : (e.target.matches("#operadores"))
            ? marcaOperador(e)
            : (e.target.matches(".delete"))
                ? $barra.value = ""
                : (e.target.matches("#opIgual"))
                    ? opera()
                    : console.log(e.target)
);*/

$enter.addEventListener("click", opera);
$suma.addEventListener("click", marcaOperador);
$resta.addEventListener("click", marcaOperador);
$multiplicacion.addEventListener("click", marcaOperador);
$divison.addEventListener("click", marcaOperador);
$potencia.addEventListener("click", marcaOperador);
$valorPi.addEventListener("click", marcaOperador);
$puntoDecimal.addEventListener("click", marcaOperador);
$uno.addEventListener("click", marcaNumero);
$dos.addEventListener("click", marcaNumero);
$tres.addEventListener("click", marcaNumero);
$cuatro.addEventListener("click", marcaNumero);
$cinco.addEventListener("click", marcaNumero);
$seis.addEventListener("click", marcaNumero);
$siete.addEventListener("click", marcaNumero);
$ocho.addEventListener("click", marcaNumero);
$nueve.addEventListener("click", marcaNumero);
$cero.addEventListener("click", marcaNumero);
$borraTodo.addEventListener("click", () => ($barra.value = ""));

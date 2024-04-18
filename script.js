class Calculadora {
    constructor() {
        this.numVisor = '0';
        this.ptDecimal = false;
        this.operador = '';
        this.numAnterior = '';
        this.estadoErro = false;
        this.memoria = 0;
        this.estadoLigada = false;

        if (this.estadoLigada == false) {
            document.getElementById('visor').innerHTML = '';
            this.numVisor = '';
            this.ptDecimal = false;
            this.operador = '';
            this.numAnterior = '';
            this.estadoErro = false;
            this.memoria = 0;
            this.estadoLigada = false;
        }
    }

    exibir() {
        return this.numVisor;
    }

    recebeDigito(dig) {
        if (this.estadoErro) return;
        if (dig.length != 1) return;
        if (this.numVisor.length == 10) return;
        if ((dig < '0' || dig > '9') && dig != '.') return;
        if (this.numVisor == '0') {
            this.numVisor = dig == '.' ? '0.' : dig;
        } else {
            this.numVisor += dig;
        }
    }
}

let calculadora = new Calculadora();

function ligar_desligar() {
    calculadora.estadoLigada = !calculadora.estadoLigada;
    if (calculadora.estadoLigada) {
        document.getElementById('visor').innerHTML = '0';
        calculadora.numVisor = '0';
        calculadora.ptDecimal = false;
        calculadora.operador = '';
        calculadora.numAnterior = '';
        calculadora.estadoErro = false;
        calculadora.memoria = 0;
    } else {
        document.getElementById('visor').innerHTML = '';
        calculadora.numVisor = '';
    }
}

function exibirVisor() {
    if (calculadora.estadoLigada == false) return;
    if (calculadora.estadoErro) return;
    document.getElementById('visor').innerHTML = calculadora.exibir();
}

function tecla_Apagar() {
    if (calculadora.estadoLigada == false) return;
    if (calculadora.estadoErro) return;
    calculadora.memoria = 0;
    calculadora.numVisor= calculadora.numVisor.slice(0,-1);
    exibirVisor();
}

function limpar_Visor(){
    if (calculadora.estadoLigada == false) return;
    if (calculadora.estadoErro) return;
    let count = calculadora.numVisor.split("");
    calculadora.numVisor = calculadora.numVisor.slice(0, -count);
    exibirVisor();

}

function limpar_Tudo() {
    if (calculadora.estadoLigada == false) return;
    if (calculadora.estadoErro) return;
            calculadora.numVisor = '';
            calculadora.ptDecimal = false;
            calculadora.operador = '';
            calculadora.numAnterior = '';
    exibirVisor();
}

function visor_Memoria() {
    if (calculadora.estadoLigada == false) return;
    if (calculadora.estadoErro) return;
    console.log(calculadora.memoria);
    calculadora.numVisor = calculadora.memoria;
    exibirVisor();
}

function raiz_Quadrada() {
    if (calculadora.estadoLigada === false || calculadora.estadoErro) return;
    
    const num = parseFloat(calculadora.numVisor);
    if (isNaN(num)) return;

    calculadora.numVisor = Math.sqrt(num).toString();

    calculadora.numVisor = calculadora.numVisor.slice(0, 10); 
    exibirVisor();  
}

function m_positivo() {
    if (calculadora.estadoLigada == false) return;
    if (calculadora.estadoErro) return;
    if (calculadora.numVisor == '') {
        calculadora.estadoErro = true;
        calculadora.numVisor = 'Erro';
        exibirVisor();
        return;
    }
    calculadora.memoria += parseFloat(calculadora.numVisor);
    calculadora.numVisor = calculadora.memoria;
    exibirVisor();
}

function m_Negativo() {
    if (calculadora.estadoLigada == false) return;
    if (calculadora.estadoErro) return;
    calculadora.memoria -= parseFloat(calculadora.numVisor);
    calculadora.numVisor = calculadora.memoria;
    exibirVisor();
}

function inverso() {
    if (calculadora.estadoLigada == false) return;
    if (calculadora.estadoErro) return;
   
    if (calculadora.numVisor == '0') {
        calculadora.estadoErro = true;
        calculadora.numVisor = 'Erro';
        exibirVisor();
        return;
    }
    calculadora.numVisor = 1 / parseFloat(calculadora.numVisor);
    calculadora.numVisor = calculadora.numVisor.toString();
    calculadora.numVisor = calculadora.numVisor.slice(0, 10);

    exibirVisor();
}

function elevada_ao_Quadrado(){
    if (calculadora.estadoLigada === false || calculadora.estadoErro) return;
    const num = parseFloat(calculadora.numVisor);
    if (isNaN(num)) return;

    calculadora.numVisor = (num*num).toString();

    calculadora.numVisor = calculadora.numVisor.slice(0, 10);
    exibirVisor();
}

function adicionar_Numero(dig) {
    if (calculadora.estadoLigada == false) return;
    if (calculadora.estadoErro) return;
    calculadora.recebeDigito(dig);
    exibirVisor();
}

function adicionar_operacao(op) {
    if (calculadora.estadoLigada == false) return;
    if (calculadora.estadoErro) return;
    if (calculadora.operador !== '') {
        resolver_Resultado();
    }
    if (this.estadoErro) return;
    calculadora.operador = op;
    calculadora.numAnterior = calculadora.numVisor;

   limpar_Visor();
}

function resolver_Resultado() {
    if (calculadora.estadoLigada == false) return;
    if (calculadora.estadoErro) return;
    if (calculadora.operador == '') return;

    if (calculadora.numVisor === '') {
        if (calculadora.numAnterior !== '') {
            calculadora.numVisor = calculadora.numAnterior;
            exibirVisor();
            return;
        } else {
            return;
        }
    }
   
    let resultado;
    const num1 = parseFloat(calculadora.numAnterior);
    const num2 = parseFloat(calculadora.numVisor);
   
    if (calculadora.operador === '+') {
        resultado = num1 + num2;
    } else if (calculadora.operador === '-') {
        resultado = num1 - num2;
    } else if (calculadora.operador === '*') {
        resultado = num1 * num2;
    } else if (calculadora.operador === '/') {
        if (num2 == 0) {
            calculadora.estadoErro = true;
            calculadora.numVisor = 'Erro';
            exibirVisor();
            return;
        }
        resultado = num1 / num2;
    } else if (calculadora.operador === '%') {
        resultado = num1 * (num2 / 100);
    }

    calculadora.operador = '';
    calculadora.ptDecimal = false;
    calculadora.numAnterior = '';
    calculadora.numVisor = String(resultado).slice(0, 10);
    exibirVisor();
}

function troca_Sinal() {
    if (calculadora.estadoLigada == false) return;
    if (calculadora.estadoErro) return;
    calculadora.numVisor = -parseFloat(calculadora.numVisor);
    exibirVisor();
}
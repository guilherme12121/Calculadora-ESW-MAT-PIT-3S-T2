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
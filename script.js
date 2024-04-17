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

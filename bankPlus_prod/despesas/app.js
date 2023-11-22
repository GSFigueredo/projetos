// ---------------------------- Objeto despesa ---------------------------- //

class despesa {
    constructor(ano, mes, dia, tipo, desc, valor, registro) {
        this.ano = ano,
            this.mes = mes,
            this.dia = dia,
            this.tipo = tipo,
            this.desc = desc,
            this.valor = valor,
            this.registro = registro
    }

    validarDados(despesa) {

        let valido = true

        for (let i in despesa) {
            if (despesa[i] == undefined || despesa[i] == '' || despesa[i] == null) {
                valido = false
                break;
            }
        }

        return valido
    }

    validarFiltros(d) {
        let valido = true
        let soma = 0;

        if (d.ano == null || d.ano == '' || d.ano == undefined) {
            soma++;
        }

        if (d.mes == null || d.mes == '' || d.mes == undefined) {
            soma++;
        }

        if (d.dia == null || d.dia == '' || d.dia == undefined) {
            soma++;
        }

        if (d.tipo == null || d.tipo == '' || d.tipo == undefined) {
            soma++;
        }

        if (d.desc == null || d.desc == '' || d.desc == undefined) {
            soma++;
        }

        if (d.valor == null || d.valor == '' || d.valor == undefined) {
            soma++;
        }

        if (soma == 6) {
            valido = false
        } else {
            valido = true;
        }

        return valido
    }

    limpaCampo() {
        document.getElementById('ano').value = ''
        document.getElementById('mes').value = ''
        document.getElementById('dia').value = ''
        document.getElementById('tipo').value = ''
        document.getElementById('desc').value = ''
        document.getElementById('valor').value = ''
    }
}

// ---------------------------- Objeto que grava dados ---------------------------- //


class gravadorDados {

    constructor() {
        this.c = 0
    }

    getProximoId() {
        let id = Number(localStorage.getItem('id'));

        if (!id || isNaN(id)) {
            this.c = 1;
        } else {
            this.c = Number(localStorage.getItem('id')) + 1;
        }

        return this.c;
    }

    gravarDados(despesa) {

        let cont = this.getProximoId();
        let id = 'id'
        despesa.cpfLogado = localStorage.getItem('cpfLogado')

        localStorage.setItem(cont, JSON.stringify(despesa))
        localStorage.setItem(id, JSON.stringify(cont))

    }

    removerDados(id) {
        localStorage.removeItem(id)


        window.location.reload()
    }

    carregarDados() {

        let despesas = Array();
        let id = localStorage.getItem('id')

        for (let chave = -1; chave <= id; chave++) {

            if (localStorage.getItem(chave) == '' || localStorage.getItem(chave) == null || localStorage.getItem(chave) == localStorage.getItem(chave - 1)) {

            } else {
                let despesa = JSON.parse(localStorage.getItem(chave))
                despesa.id = chave;
                despesas.push(despesa)
            }
        }

        return despesas
    }

    pesquisarDados(obj) {
        let despesaFilt = Array();

        despesaFilt = this.carregarDados();

        // ano
        if (obj.ano != '' && obj.ano != null) {
            despesaFilt = despesaFilt.filter(
                (d) => d.ano == obj.ano
            )
        }

        //mes
        if (obj.mes != '' && obj.mes != null) {
            despesaFilt = despesaFilt.filter(
                (d) => d.mes == obj.mes
            )
        }

        //dia
        if (obj.dia != '' && obj.dia != null) {
            despesaFilt = despesaFilt.filter(
                (d) => d.dia == obj.dia
            )
        }

        //tipo
        if (obj.tipo != '' && obj.tipo != null) {
            despesaFilt = despesaFilt.filter(
                (d) => d.tipo == obj.tipo
            )
        }

        //desc
        if (obj.desc != '' && obj.desc != null) {
            despesaFilt = despesaFilt.filter(
                (d) => d.desc == obj.desc
            )
        }

        //valor
        if (obj.valor != '' && obj.valor != null) {
            despesaFilt = despesaFilt.filter(
                (d) => d.valor == obj.valor
            )
        }

        mostraElemento('filtrar', despesaFilt)

    }
}

let gravador = new gravadorDados()

// ---------------------------- Capturar os valores do HTML ---------------------------- //


function capturarValores() {

    let valores = {
        ano: document.getElementById('ano').value,
        mes: document.getElementById('mes').value,
        dia: document.getElementById('dia').value,
        tipo: document.getElementById('tipo').value,
        desc: document.getElementById('desc').value,
        valor: document.getElementById('valor').value
    }

    return valores
}

// ---------------------------- Verificar o tipo de modal que aparecerá ---------------------------- //

function tratarModal(tipo, modal) {

    if (tipo == 'validar' && modal == false) {
        $('#mostraModal').modal('show');

        document.getElementById('modal-tit').innerHTML = 'Dados não gravados'
        document.getElementById('modal-corp').innerHTML = 'Existem campos que não foram preenchidos'
        document.getElementById('modal-but').innerHTML = 'Checar dados'

        document.getElementById('tit-cor').className = 'modal-header text-danger fw-bold'
        document.getElementById('modal-corp').className = 'modal-header text-danger fw-bold'
        document.getElementById('modal-but').className = 'btn btn-danger fw-bold'

    } else if (tipo == 'validar' && modal == true) {
        $('#mostraModal').modal('show');

        document.getElementById('modal-tit').innerHTML = 'Dados gravados'
        document.getElementById('modal-corp').innerHTML = 'Despesas gravadas com sucesso'
        document.getElementById('modal-but').innerHTML = 'Gravar novamente'

        document.getElementById('tit-cor').className = 'modal-header text-success fw-bold'
        document.getElementById('modal-corp').className = 'modal-header text-success fw-bold'
        document.getElementById('modal-but').className = 'btn btn-success fw-bold'

    }
}

function tratarModalFiltro() {

    $('#mostraModal').modal('show');

    document.getElementById('modal-tit').innerHTML = 'Não há filtros selecionados'
    document.getElementById('modal-corp').innerHTML = 'Nenhum filtro foi atribuído a pesquisa'
    document.getElementById('modal-but').innerHTML = 'Filtrar novamente'

    document.getElementById('tit-cor').className = 'modal-header text-danger fw-bold'
    document.getElementById('modal-corp').className = 'modal-header text-danger fw-bold'
    document.getElementById('modal-but').className = 'btn btn-danger fw-bold'

}


// ---------------------------- Cadastrar as despesas ---------------------------- //


function cadastrarDespesas() {

    let valores = capturarValores();

    let valorDespesas = new despesa(valores.ano, valores.mes, valores.dia, valores.tipo, valores.desc, valores.valor, 'despesa')

    if (valorDespesas.validarDados(valorDespesas) == false) {
        tratarModal('validar', false)
    } else {
        gravador.gravarDados(valorDespesas)

        tratarModal('validar', true)

        valorDespesas.limpaCampo();
    }
}


// ---------------------------- Carregar dados do Local Storage ---------------------------- //

function carregarDespesas() {

    let despesa = gravador.carregarDados();
    mostraElemento('consultar', despesa);
}

function somarDespesas(despesa, tipo) {

    let cpfLogado = localStorage.getItem('cpfLogado')
    let somaValores = 0;

    if (tipo == 'consultar') {
        despesa.forEach(
            (v) => {
                if (v.registro == 'despesa' && v.cpfLogado == cpfLogado) {
                    somaValores += Number(v.valor);
                }
            }
        )

        document.getElementById('somaDespesas').innerHTML = `R$${somaValores}`
    }

    if (tipo == 'filtrar') {
        document.getElementById('tituloSomaD').innerHTML = `Soma das despesas filtradas`
        despesa.forEach(
            (v) => {
                if (v.registro == 'despesa' && v.cpfLogado == cpfLogado) {
                    somaValores += Number(v.valor);
                }
            }
        )

        document.getElementById('somaDespesas').innerHTML = `R$${somaValores}`
    }
}


function mostraElemento(tipo, despesaF) {

    let despesa = Array()

    despesa = despesaF;

    let despesaList = document.getElementById('listaDespesas');
    let despesaSoma = document.getElementById('somaDespesas');

    if (tipo == 'consultar') {
        despesa.forEach(
            function (v) {

                let cpfLogado = localStorage.getItem('cpfLogado')

                if (v.registro == 'despesa' && v.cpfLogado == cpfLogado) {

                    let linha = despesaList.insertRow();

                    linha.insertCell(0).innerHTML = `${v.dia}/${v.mes}/${v.ano}`;
                    linha.insertCell(1).innerHTML = v.tipo;
                    linha.insertCell(2).innerHTML = v.desc;
                    linha.insertCell(3).innerHTML = `R$${v.valor}`;

                    let botao = document.createElement('button');
                    botao.className = 'btn btn-danger btn-sm';
                    botao.innerHTML = 'X'
                    botao.id = v.id

                    linha.insertCell(4).append(botao);
                    botao.onclick = () => {
                        gravador.removerDados(botao.id)
                    };
                } else {

                }
            }
        )

        somarDespesas(despesa, 'consultar')
    }

    if (tipo == 'filtrar') {

        let despesaFiltrada = Array();
        document.getElementById('listaDespesas').innerHTML = '';

        despesa.forEach(
            function (v) {

                let cpfLogado = localStorage.getItem('cpfLogado')

                if (v.registro == 'despesa' && v.cpfLogado == cpfLogado) {
                    let linha = despesaList.insertRow();

                    linha.insertCell(0).innerHTML = `${v.dia}/${v.mes}/${v.ano}`;
                    linha.insertCell(1).innerHTML = v.tipo;
                    linha.insertCell(2).innerHTML = v.desc;
                    linha.insertCell(3).innerHTML = `R$${v.valor}`;

                    let botao = document.createElement('button');
                    botao.className = 'btn btn-danger btn-sm fw-bold';
                    botao.innerHTML = 'X'
                    botao.id = v.id

                    linha.insertCell(4).append(botao);
                    botao.onclick = () => {
                        gravador.removerDados(botao.id)
                    };

                    despesaFiltrada.push(v);
                } else {

                }
            }
        )

        somarDespesas(despesaFiltrada, 'filtrar')
    }
}

//----------------------------------- Filtrando valores ----------------------- //

function buscarDados() {

    let objV = {
        ano: document.getElementById('anoFilt').value,
        mes: document.getElementById('mesFilt').value,
        dia: document.getElementById('diaFilt').value,
        tipo: document.getElementById('tipoFilt').value,
        desc: document.getElementById('descFilt').value,
        valor: document.getElementById('valorFilt').value,
    }

    let obj = new despesa(objV.ano, objV.mes, objV.dia, objV.tipo, objV.desc, objV.valor)

    if (obj.validarFiltros(obj) == false) {
        tratarModalFiltro()
    } else {
        gravador.pesquisarDados(obj);
    }
}

//----------------------------------- Soma das despesas ----------------------- //

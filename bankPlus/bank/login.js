class usersLogin {
    constructor (nomeP, cpf, senha) {
        this.nomeP = nomeP
        this.cpf = cpf
        this.senha = senha
    }

    validarDados(user) {
        let valido = true

        for (let i in user) {
            if (user[i] == undefined || user[i] == '' || user[i] == null) {
                valido = false
                break;
            }
        }

        return valido
    }
}

function mostraModal(tipo, teste) {
    if(tipo == 'senha' && teste == false) {
        $('#mostraModal').modal('show');
        document.getElementById('modal-tit').innerHTML = 'As senha não condizem'
        document.getElementById('modal-corp').innerHTML = 'Valores diferentes'
        document.getElementById('modal-but').innerHTML = 'Checar dados'

        document.getElementById('tit-cor').className = 'modal-header text-danger fw-bold'
        document.getElementById('modal-corp').className = 'modal-header text-danger fw-bold'
        document.getElementById('modal-but').className = 'btn btn-danger fw-bold'
    } 

    if(tipo == 'vazio' && teste == false) {
        $('#mostraModal').modal('show');
        document.getElementById('modal-tit').innerHTML = 'Existem campos não preenchidos'
        document.getElementById('modal-corp').innerHTML = 'Campos vazios'
        document.getElementById('modal-but').innerHTML = 'Checar dados'

        document.getElementById('tit-cor').className = 'modal-header text-danger fw-bold'
        document.getElementById('modal-corp').className = 'modal-header text-danger fw-bold'
        document.getElementById('modal-but').className = 'btn btn-danger fw-bold'
    } 
    
    if (tipo == 'sucesso' && teste == true) {
        $('#mostraModal').modal('show');

        document.getElementById('modal-tit').innerHTML = 'Cadastro completo'
        document.getElementById('modal-corp').innerHTML = 'Cadastro feito com sucesso'
        document.getElementById('modal-but').innerHTML = 'Fechar'

        document.getElementById('tit-cor').className = 'modal-header text-success fw-bold'
        document.getElementById('modal-corp').className = 'modal-header text-success fw-bold'
        document.getElementById('modal-but').className = 'btn btn-success fw-bold'
    }

    if (tipo == 'login' && teste == true) {
        $('#mostraModal').modal('show');

        document.getElementById('modal-tit').innerHTML = 'Cadastro completo'
        document.getElementById('modal-corp').innerHTML = 'Cadastro feito com sucesso'
        document.getElementById('modal-but').innerHTML = 'Fechar'

        document.getElementById('tit-cor').className = 'modal-header text-success fw-bold'
        document.getElementById('modal-corp').className = 'modal-header text-success fw-bold'
        document.getElementById('modal-but').className = 'btn btn-success fw-bold'
    }
}

function logarUsuario() {
    let user = {
        nomeP: document.getElementById('nomePLogin').value,
        cpf: document.getElementById('cpfLogin').value,
        senha: document.getElementById('senhaLogin').value
    }

    verificarLogin(user);
}

function verificarLogin(usuario) {
    let user = new usersLogin (usuario.nomeP, usuario.cpf, usuario.senha)

    if(verificarLogin(user) == false) {
        mostraModal('vazio', false);
    }
}
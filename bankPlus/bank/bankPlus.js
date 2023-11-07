class users {
    constructor(nomeP, nomeS, cpf, email, telefone, senha, confsenha) {
        this.nomeP = nomeP
        this.nomeS = nomeS
        this.cpf = cpf
        this.email = email
        this.telefone = telefone
        this.senha = senha
        this.confsenha = confsenha
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

    validarSenha(user) {
        if(user.senha != user.confsenha) {
            return false;
        } else {
            return true;
        }
    }


    verificarRegistro(user) {
        let valido = false

        for (let i in user) {
            if (user.cpf == ) {
                valido = true
                break;
            }
        }

        return valido
    }
}

class gravadorC {
    constructor() {
        this.cont = 1;
    }

    idDinamico() {
        return this.cont++;
    }

    gravarLocal(user) {
        let cont = Number(this.idDinamico());
        localStorage.setItem(cont, JSON.stringify(user))
    }
}

let gravador = new gravadorC();

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
}

function capturarDados() {
    let usuario = {
        nomeP: document.getElementById('nomeP').value,
        nomeS: document.getElementById('nomeS').value,
        cpf: document.getElementById('cpf').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        senha: document.getElementById('senha').value,
        confsenha: document.getElementById('confsenha').value
    }

    cadastrarUser(usuario);

}

function cadastrarUser(usuario) {

    let user = new users (usuario.nomeP, usuario.nomeS, usuario.cpf, usuario.email, usuario.telefone, usuario.senha, usuario.confsenha);

    if(user.validarSenha(user) == true && user.validarDados(user) == true) {
        mostraModal('sucesso', true)
        gravador.gravarLocal(user);

        setTimeout(() => {
            window.location.href = 'index.html'
        }, 2000);
    } else {
        if(user.validarSenha(user) == false) {
            mostraModal('senha', false)
        } else if (user.validarDados(user) == false) {
            mostraModal('vazio', false)
        }
    }

}

// Login usuário

function logarUsuario() {
    let user = {
        nomeP: document.getElementById('nomePLogin').value,
        nomeS: document.getElementById('cpfLogin').value,
        senha: document.getElementById('senhaLogin').value
    }

    verificarLogin(user);
}

function verificarLogin(usuario) {
    let user = 
}
class users {
    constructor(nomeP, nomeS, cpf, email, telefone, senha, confsenha, registro) {
        this.nomeP = nomeP
        this.nomeS = nomeS
        this.cpf = cpf
        this.email = email
        this.telefone = telefone
        this.senha = senha
        this.confsenha = confsenha
        this.registro = registro
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
        if (user.senha != user.confsenha) {
            return false;
        } else {
            return true;
        }
    }
}
class usersLogin {
    constructor(nomeP, cpf, senha, registro) {
        this.nomeP = nomeP
        this.cpf = cpf
        this.senha = senha
        this.registro = registro
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

    verificarCadastro(user) {
        let valido = false
        let id = localStorage.getItem('id');

        for (let c = 1; c <= id; c++) {

            let usuario = JSON.parse(localStorage.getItem(c))
            
            if (usuario.registro == 'usuario') {
                if (user.cpf === usuario.cpf) {
                    valido = true
                    break;
                }
            } else {
            
            }
        }
        return valido
    }
}
class gravadorC {
    constructor() {
        this.c = 0;
    }

    idDinamico() {
        let id = Number(localStorage.getItem('id'));

        if (!id || isNaN(id)) {
            this.c = 1;
        } else {
            this.c = Number(localStorage.getItem('id')) + 1;
        }

        return this.c;
    }

    gravarLocal(user) {
        let cont = this.idDinamico();
        let id = 'id'

        localStorage.setItem(cont, JSON.stringify(user))
        localStorage.setItem(id, JSON.stringify(cont))
    }
}

let gravador = new gravadorC();

function mostraModal(tipo, teste) {
    if (tipo == 'senha' && teste == false) {
        $('#mostraModal').modal('show');
        document.getElementById('modal-tit').innerHTML = 'As senha não condizem'
        document.getElementById('modal-corp').innerHTML = 'Valores diferentes'
        document.getElementById('modal-but').innerHTML = 'Checar dados'

        document.getElementById('tit-cor').className = 'modal-header text-danger fw-bold'
        document.getElementById('modal-corp').className = 'modal-header text-danger fw-bold'
        document.getElementById('modal-but').className = 'btn btn-danger fw-bold'
    }

    if (tipo == 'vazio' && teste == false) {
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

        document.getElementById('modal-tit').innerHTML = 'Login tcompleto'
        document.getElementById('modal-corp').innerHTML = 'Redirecionando a página'
        document.getElementById('modal-but').innerHTML = 'Fechar'

        document.getElementById('tit-cor').className = 'modal-header text-success fw-bold'
        document.getElementById('modal-corp').className = 'modal-header text-success fw-bold'
        document.getElementById('modal-but').className = 'btn btn-success fw-bold'
    }

    if (tipo == 'login' && teste == false) {
        $('#mostraModal').modal('show');

        document.getElementById('modal-tit').innerHTML = 'Login incompleto'
        document.getElementById('modal-corp').innerHTML = 'Não foi encontrada nenhuma conta vinculada a este CPF'
        document.getElementById('modal-but').innerHTML = 'Fechar'

        document.getElementById('tit-cor').className = 'modal-header text-danger fw-bold'
        document.getElementById('modal-corp').className = 'modal-header text-danger fw-bold'
        document.getElementById('modal-but').className = 'btn btn-danger fw-bold'
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

    let user = new users(usuario.nomeP, usuario.nomeS, usuario.cpf, usuario.email, usuario.telefone, usuario.senha, usuario.confsenha, 'usuario');

    if (user.validarSenha(user) == true && user.validarDados(user) == true) {
        mostraModal('sucesso', true)
        gravador.gravarLocal(user);

        setTimeout(() => {
            window.location.href = 'index.html'
        }, 2000);
    } else {
        if (user.validarSenha(user) == false) {
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
        cpf: document.getElementById('cpfLogin').value,
        senha: document.getElementById('senhaLogin').value,
        registro: 'usuario'
    }

    verificarLogin(user);
}

function verificarLogin(usuario) {
    let user = new usersLogin(usuario.nomeP, usuario.cpf, usuario.senha, usuario.registro)

    if (user.validarDados(user) == false) {
        mostraModal('vazio', false)
    } else if (user.verificarCadastro(user) == false) {
        mostraModal('login', false);
    } else {
        mostraModal('login', true)

        usuarioLogado(user);
        /*setTimeout(() => {
            window.location.href = 'index.html'
        }, 2000); */
    }
}

function usuarioLogado(user) {
    
}
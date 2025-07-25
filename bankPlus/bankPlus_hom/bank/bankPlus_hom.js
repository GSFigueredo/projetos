if (localStorage.getItem('login') === 'true') {
    localStorage.setItem('login', 'true')
} else {
    localStorage.setItem('login', 'false')
}

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

    validarCpf(user) {
        let valido = false
        let id = localStorage.getItem('id');

        for (let c = 1; c <= id; c++) {

            let usuario = JSON.parse(localStorage.getItem(c))

            if (usuario.registro == 'usuario') {
                if(user.cpf == usuario.cpf) {
                    valido = true;
                    break;
                }
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
    constructor(nomeP, cpf, senha, confsenha, registro) {
        this.nomeP = nomeP
        this.cpf = cpf
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
            }
        }
        return valido
    }

    validarLogin(tipo, user) {

        let valido = false
        let id = localStorage.getItem('id');


        if (tipo === 'login') {
            for (let c = 1; c <= id; c++) {

                let usuario = JSON.parse(localStorage.getItem(c))

                if (usuario.registro == 'usuario') {
                    if (user.nomeP == usuario.nomeP && user.senha === usuario.senha) {
                        valido = true
                        break;
                    }
                }
            }

            return valido;
        }

        if (tipo === 'alteracao') {
            for (let c = 1; c <= id; c++) {

                let usuario = JSON.parse(localStorage.getItem(c))

                if (usuario.registro == 'usuario') {
                    if (user.nomeP == usuario.nomeP && user.cpf == usuario.cpf) {
                        valido = true
                        break;
                    }
                }
            }

            return valido;
        }
    }

    alterarSenha(user) {

        if (user.senha != user.confsenha) {
            mostraModal('senha', false);
            return false;
        } else {

            let id = localStorage.getItem('id');

            for (let c = 1; c <= id; c++) {

                let usuario = JSON.parse(localStorage.getItem(c))

                if (usuario.registro == 'usuario') {
                    if (user.cpf == usuario.cpf) {
                        usuario.senha = user.senha
                        localStorage.setItem(c, JSON.stringify(usuario))
                        return true;
                    }
                }
            }
        }
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
        document.getElementById('modal-corp').innerHTML = 'Redirecionando a página'
        document.getElementById('modal-but').innerHTML = 'Fechar'

        document.getElementById('tit-cor').className = 'modal-header text-success fw-bold'
        document.getElementById('modal-corp').className = 'modal-header text-success fw-bold'
        document.getElementById('modal-but').className = 'btn btn-success fw-bold'
    }

    if (tipo == 'login' && teste == true) {
        $('#mostraModal').modal('show');

        document.getElementById('modal-tit').innerHTML = 'Login completo'
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

    if (tipo == 'logadoTOF' && teste == false) {
        $('#mostraModal').modal('show');

        document.getElementById('modal-tit').innerHTML = 'Sem login'
        document.getElementById('modal-corp').innerHTML = 'Você precisa estar logado para acessar a tela de despesas'
        document.getElementById('modal-but').innerHTML = 'Fechar'

        document.getElementById('tit-cor').className = 'modal-header text-danger fw-bold'
        document.getElementById('modal-corp').className = 'modal-header text-danger fw-bold'
        document.getElementById('modal-but').className = 'btn btn-danger fw-bold'
    }

    if (tipo == 'userAltErr' && teste == false) {
        $('#mostraModal').modal('show');

        document.getElementById('modal-tit').innerHTML = 'Dados incorretos'
        document.getElementById('modal-corp').innerHTML = 'Usuário inválido'
        document.getElementById('modal-but').innerHTML = 'Fechar'

        document.getElementById('tit-cor').className = 'modal-header text-danger fw-bold'
        document.getElementById('modal-corp').className = 'modal-header text-danger fw-bold'
        document.getElementById('modal-but').className = 'btn btn-danger fw-bold'
    }

    if (tipo == 'loginErrado' && teste == false) {
        $('#mostraModal').modal('show');

        document.getElementById('modal-tit').innerHTML = 'Dados incorretos'
        document.getElementById('modal-corp').innerHTML = 'Usuário ou senha inválida'
        document.getElementById('modal-but').innerHTML = 'Fechar'

        document.getElementById('tit-cor').className = 'modal-header text-danger fw-bold'
        document.getElementById('modal-corp').className = 'modal-header text-danger fw-bold'
        document.getElementById('modal-but').className = 'btn btn-danger fw-bold'
    }

    if (tipo == 'altSenha' && teste == true) {
        $('#mostraModal').modal('show');

        document.getElementById('modal-tit').innerHTML = 'Senha alterada'
        document.getElementById('modal-corp').innerHTML = 'Redirecionando a página'
        document.getElementById('modal-but').innerHTML = 'Fechar'

        document.getElementById('tit-cor').className = 'modal-header text-success fw-bold'
        document.getElementById('modal-corp').className = 'modal-header text-success fw-bold'
        document.getElementById('modal-but').className = 'btn btn-success fw-bold'
    }

    if (tipo == 'cadastroS' && teste == true) {
        $('#mostraModal').modal('show');

        document.getElementById('modal-tit').innerHTML = 'Cadastro já existente'
        document.getElementById('modal-corp').innerHTML = 'Já existe uma conta vinculada a este cpf'
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

    if (user.validarSenha(user) == true && user.validarDados(user) == true && user.validarCpf(user) == false) {
        mostraModal('sucesso', true)
        gravador.gravarLocal(user);

        setTimeout(() => {
            logarUsuario('loginC', user)
        }, 2000);

        /*setTimeout(() => {
            window.location.href = 'index.html'
        }, 2000);*/
    } else {
        if (user.validarSenha(user) == false) {
            mostraModal('senha', false)
        } else if (user.validarDados(user) == false) {
            mostraModal('vazio', false)
        } else if(user.validarCpf(user) == true) {
            mostraModal('cadastroS', true)
        }
    }

}

// Login usuário

function logarUsuario(tipo, usuario) {
    let user;

    if (tipo == 'login') {
        user = {
            nomeP: document.getElementById('nomePLogin').value,
            cpf: document.getElementById('cpfLogin').value,
            senha: document.getElementById('senhaLogin').value,
            confsenha: document.getElementById('senhaLogin').value,
            registro: 'usuario'
        }

        verificarLogin('login', user);
    }

    if(tipo == 'loginC') {
        user = {
            nomeP: usuario.nomeP, 
            cpf: usuario.cpf, 
            senha: usuario.senha,
            confsenha: usuario.confsenha,
            registro: 'usuario'
        }

        verificarLogin('loginC', user);
    }

    if (tipo == 'alterarSenha') {
        user = {
            nomeP: document.getElementById('nomePalterar').value,
            cpf: document.getElementById('cpfAlterar').value,
            senha: document.getElementById('senhaAlterar').value,
            confsenha: document.getElementById('confsenhaAlterar').value,
            registro: 'usuario'
        }

        verificarLogin('alterarSenha', user)

    }
}

function verificarLogin(tipo, usuario) {
    let user;

    if (tipo == 'login') {

        user = new usersLogin(usuario.nomeP, usuario.cpf, usuario.senha, usuario.senha, usuario.registro)

        if (user.validarDados(user) == false) {
            mostraModal('vazio', false)
        } else if (user.verificarCadastro(user) == false) {
            mostraModal('login', false);
        } else {

            if (user.validarLogin('login', user) == true) {

                mostraModal('login', true)

                usuarioLogado(user);

                setTimeout(() => {
                    window.location.href = 'index.html'
                }, 2000);
            } else {
                mostraModal('loginErrado', false)
            }
        }

    }

    if(tipo == 'loginC') {
        usuarioLogado(usuario);

        setTimeout(() => {
            window.location.href = 'index.html'
        }, 1500);
    }

    if (tipo == 'alterarSenha') {
        user = new usersLogin(usuario.nomeP, usuario.cpf, usuario.senha, usuario.confsenha, usuario.registro)

        if (user.validarDados(user) == false) {
            mostraModal('vazio', false)
        } else if (user.verificarCadastro(user) == false) {
            mostraModal('login', false);
        } else if (user.validarLogin('alteracao', user) == false) {
            mostraModal('userAltErr', false)
        } else if (user.alterarSenha(user) == true) {

            mostraModal('altSenha', true);

            setTimeout(() => {
                window.location.href = '/bankPlus_hom/bank/index.html'
            }, 3000);
        }
    }
}

function usuarioLogado(user) {
    localStorage.setItem('login', 'true')
    localStorage.setItem('cpfLogado', user.cpf)
}

function checarLogin() {
    if (localStorage.getItem('login') == 'true') {
        window.location.href = '/bankPlus_hom/despesas/index.html'
    } else if (localStorage.getItem('login') == 'false') {

        mostraModal('logadoTOF', false)

        setTimeout(() => {
            window.location.href = '/bankPlus/bank/login.html'
        }, 3000);
    }
}

function sairLogin() {
    localStorage.setItem('login', 'false')
    localStorage.setItem('cpfLogado', 'false')

    setTimeout(() => {
        window.location.href = '/bankPlus_hom/bank/index.html'
    }, 2000);
}

function alterarBotao() {

    if (localStorage.getItem('login') == 'true') {
        let btDinamico = document.getElementById('btDinamico')
        let btTrue = document.createElement('button');
        btTrue.className = 'mouseCima nav-link border-0';
        btTrue.innerHTML = 'Sair'
        btDinamico.appendChild(btTrue)

        btTrue.onclick = sairLogin;

    } else if (localStorage.getItem('login') == 'false') {

        let btDinamico = document.getElementById('btDinamico')
        let btTrue = document.createElement('button');
        btTrue.className = 'mouseCima nav-link border-0';
        btTrue.innerHTML = 'Entrar'
        btDinamico.appendChild(btTrue)

        btTrue.onclick = () => {
            window.location.href = '/bankPlus_hom/bank/login.html'
        }
    }
}
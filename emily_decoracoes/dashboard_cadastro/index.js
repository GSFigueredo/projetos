function cadastrarCliente () {
    const cliente = {
        nome: $('#nome').val(),
        email: $('#email').val(),
        senha: $('#senha').val(),
        confirmarSenha: $('#confirmar_senha').val()
    }
    
    if (Object.values(cliente).some(campo => !campo)) { //se o campo for vazio, retornará falso, porém é feita a negação para que o campo vire true, e dessa forma entre no if
        alert('Por favor, preencha todos os campos.');
        return;
    } else if(cliente.senha !== cliente.confirmarSenha) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }

    inserirBanco(cliente);
}

async function inserirBanco(cliente) { // função assíncrona para seguir o código apenas depois que a requisição for concluída
    try {
        const resposta = await fetch('http://localhost:3001/api/cadastro/', { //aguardando a resposta da requisição (promisse), assim que for finalizada, o código continua na proxima linha
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json' // informa que o corpo da requisição está no formato JSON
            },
            body: JSON.stringify(cliente) // pegando o objeto javascript e transformando em uma string JSON
        });

        const {message} = await resposta.json();

        if (resposta.status === 409) {
            alert('E-mail já cadastrado. Por favor, tente com outro e-mail.');
        } else {
            redirecionarLogado(cliente);
        }
    } catch (erro) {
        alert('Erro inesperado: ', erro.message);
    }
}

async function redirecionarLogado(cliente) {

    try{
        const resposta = await fetch('http://localhost:3001/api/login/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        })

        const {user} = await resposta.json();

        if(resposta.status === 500) {
            alert('Erro ao efetuar o login. Tente novamente mais tarde.');
            return;
        } else {
            alert(`Bem-vindo(a) ${user.nome}!`);
            localStorage.setItem('token', user.token);
            window.location.href = '../dashboard_principal/index.html';
        }
    } catch(error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Tente novamente mais tarde.');
        return;
    }
}
// Event listener para o botão de cadastro
$('#btn_cadastro').click(cadastrarCliente);
function cadastrarCliente () {
    const cliente = {
        nome: $('#nome').val(),
        email: $('#email').val(),
        senha: $('#senha').val(),
        confirmarSenha: $('#confirmar_senha').val()
    }
    
    if (Object.values(cliente).some(campo => !campo)) {
        alert('Por favor, preencha todos os campos.');
        return;
    } else if(cliente.senha !== cliente.confirmarSenha) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }

    inserirBanco(cliente);
}

async function inserirBanco(cliente) { 
    try {
        const resposta = await fetch('http://localhost:3001/api/usuarios/cadastro', {
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(cliente) 
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
        const resposta = await fetch('http://localhost:3001/api/usuarios/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        })
        
        const dados = await resposta.json();

        if(resposta.status === 200) {
            const {user} = dados;
            alert(`Bem-vindo(a) ${user.nome}!`);
            document.cookie = `id=${user.id}; max-age=3600; path=/;`; // 1 hora local - 4h no total devido ao horario GMT
            document.cookie = `token=${user.token}; max-age=3600; path=/;`;
            window.location.href = '../dashboard_principal/index.html';
        } else {
            alert(`Erro ao efetuar o login: ${dados.error}`);
        }
    } catch(error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Tente novamente mais tarde.');
        return;
    }
}

$('#btn_cadastro').click(cadastrarCliente);
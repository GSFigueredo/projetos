async function logarCliente () {
    const login = {
        email: $('#email').val(),
        senha: $('#senha').val()
    }
    
    if(Object.values(login).some(campo => !campo)) {
        alert('Preencha todos os campos!');
        return;
    }

    try { 
        const resposta = await fetch('http://localhost:3001/api/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })

        const {user} = await resposta.json();

        if(resposta.status === 500) {
            alert('Erro ao efetuar o login. Tente novamente mais tarde.');
            return;
        } else if(resposta.status === 401) {
            alert('Senha incorreta');
        } else if(resposta.status === 404) {
            alert('Usuário não encontrado');
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

// Event listener para o botão de login
$('#btn_login').click(logarCliente);
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

        const dados = await resposta.json();

        if(resposta.status === 200) {
            const {user} = dados;
            alert(`Bem-vindo(a) ${user.nome}!`);
            localStorage.clear();
            localStorage.setItem('token', user.token);
            localStorage.setItem('id', user.id)
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

// Event listener para o botão de login
$('#btn_login').click(logarCliente);
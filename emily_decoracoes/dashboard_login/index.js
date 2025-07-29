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

$('#btn_login').click(logarCliente);
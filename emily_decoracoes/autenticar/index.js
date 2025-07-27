export async function verificarLogin() {
    const login = {
        id: localStorage.getItem('id'),
        token: localStorage.getItem('token')
    }
    
    if(login.id && login.token) {

        try {
            const resposta = await fetch('http://localhost:3001/api/usuarios/verificarLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login)
            }
            )

            const {user} = await resposta.json();

            if(resposta.status === 200) {
                return user;
            } else { 
                console.error('Erro ao verificar login:', resposta.error);
                localStorage.clear();
                alert('Sessão expirada. Por favor, faça login novamente.');
                return false;
            }
        } catch (error) {
            console.error('Erro ao verificar login:', error);
            return false;
        }
    } else {
        // faça nada
    }

}
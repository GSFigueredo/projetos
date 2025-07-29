export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return false;
}

export async function verificarLogin() {

    const id = getCookie('id');
    const token = getCookie('token');

    if(id && token) {
        const login = {
            id: id,
            token: token
        }

        try {
            const resposta = await fetch('http://localhost:3001/api/usuarios/verificarLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login)
            }
            )

            const dados = await resposta.json();

            if(resposta.status === 200) {
                const {user} = dados;
                return user;
            } else { 
                console.error('Erro ao verificar login:', dados.error);
                document.cookie = "id=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;";
                document.cookie = "token=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;";
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
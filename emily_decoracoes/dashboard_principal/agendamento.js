import { verificarLogin } from '../autenticador/index.js';
import { getCookie } from '../autenticador/index.js';

$('#btn_agendar').click(validarDados);

async function validarDados() {
    const user = await verificarLogin();
    user ? true : false;

    if(!user) {
        alert('Voce deve estar logado para realizar um agendamento.');

        setTimeout(() => {
            window.location.href = '../dashboard_login/index.html'
        }, 500);

        return;
    }

    let data = $('#data').val();

    if(!data) {
        alert('Selecione uma data para solicitar um agendamento.');
        return;
    }

    agendarVisita(user, data);

}

function agendarVisita(user, data) {
    
}
import { verificarLogin } from '../autenticador/index.js';
import { getCookie } from '../autenticador/index.js';
import { mostrarModal } from '../global/modal/modal.js'

$('#btn_agendar').click(validarDados);

async function validarDados() {
    const user = await verificarLogin();
    user ? true : false;

    if(!user) {
        mostrarModal('danger', 'Erro ao solicitar agendamento', 'Você deve estar logado para solicitar um agendamento', 'Ir para tela de login');

        setTimeout(() => {
            window.location.href = '../dashboard_login/index.html'
        }, 2000);

        return;
    }

    let data = $('#data').val();

    if(!data) {
        mostrarModal('warning', 'Erro ao solicitar agendamento', 'Você deve preencher uma data para solicitar o agendamento', 'Fechar');
        return;
    }

    agendarVisita(user, data);

}

function agendarVisita(user, data) {
    mostrarModal('success', 'Feita a solicitação de agendamento', 'Agora, você deve aguardar a resposta de um dos colaboradores, Atenciosamente!', 'Fechar');
}
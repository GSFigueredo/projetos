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

async function agendarVisita(user, data) {

    const agendamento = {
      usuario_id: user.id, 
      data_agendamento: data,
      status: 'Solicitação',
      stativo: 'True'
    }

    try { 
      const resposta = await fetch ('http://localhost:3001/api/agendamentos/solicitacao',
        {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(agendamento) 
        }
      );

      const dados = await resposta.json();

      if(resposta.status == 200) {
        const {agendamento} = dados;

      mostrarModal('success', 'Feita a solicitação de agendamento', `O número da sua solicitação é: ${agendamento.id}.<br>Agora você deve aguardar a resposta de um dos colaboradores, atenciosamente!`, 'Fechar');
      $('#data').val('');
      } else { 
        mostrarModal('danger', 'Erro ao solicitar o agendamento', `${dados.error}`, 'Fechar');
        $('#data').val('');
      }

    } catch(error) {
        mostrarModal('danger', 'Erro ao solicitar o agendamento', `${error}`, 'Fechar');
        $('#data').val('');
    }
}
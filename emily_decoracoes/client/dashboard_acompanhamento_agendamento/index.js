import * as autenticador from '../../backend/autenticador/index.js';
import { mostrarModal } from '../../global/modal/modal.js'

$(document).ready(async () => {
  const user = await autenticador.verificarLogin();

  if(user) {
    usuarioLogado(user); 
    verificarAgendamentos(user);
  } else { 
    alert('Sem permissão para acessar ou sem login detectado')
    window.location.href = '../dashboard_login/index.html';
  }
});

function usuarioLogado(user) {
    //alert(`usuario logado ${user.nome}`);

    let linkCatalogo = $("#link_catalogo");
    let linkLogin = $("#link_login");
    let linkCadastro = $("#link_cadastro");

      linkLogin.attr({
        "href": '../dashboard_principal/index.html'
      })
      linkLogin.text(`Catálogo`)

      linkCatalogo.attr({
        "href": 'index.html',
      })
      linkCatalogo.text(`Olá, ${user.nome}`)

      linkCadastro.attr({
        "href": 'index.html',
        "class": 'nav-link sair'
      })
      linkCadastro.text(`SAIR`)

      linkCadastro.on('click', evento => {
        evento.preventDefault();
        autenticador.sairSistema();
      });
}

async function verificarAgendamentos (user) {
    try {
      const resposta = await fetch(`http://localhost:3001/api/agendamentos/verificarAgendamentos?usuario_id=${user.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
      });

      const resp = await resposta.json();

      if(resposta.status == 200) {
        const {dados} = resp;

        for(let registro of dados) {
          let tabela = $("#table_results");
          let linha = `<tr><td>${registro.id}</td><td>ID:${registro.usuario_id} | ${user.nome}</td><td>${registro.data_agendamento}</td><td>${registro.status}</td><td>${registro.stativo == 'True' ? 'Ativo': 'Inativo'}</td></tr>`
          tabela.append(linha)
        }

      } else if(resposta.status == 409) {
         mostrarModal('warning', 'Não foi encontrado nenhum agendamento', `Não foi encontrado nenhum agendamento para o usuário ${user.nome}`, 'Fechar');
      } else {
        mostrarModal('danger', 'Erro ao verificar agendamentos', `${resp.error}`, 'Fechar');
      }
    } catch (error) {
      mostrarModal('danger', 'Erro ao verificar agendamentos', `${error}`, 'Fechar');
    }
}
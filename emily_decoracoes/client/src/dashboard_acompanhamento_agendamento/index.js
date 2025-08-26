import * as autenticador from '../services/autenticador/index.js';
import { mostrarModal } from '../components/modal_error/modal_error.js';

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
        let agendamentos = [];

        for(let registro of dados) {
          let id = registro.id; 
          let usuario_id = registro.usuario_id;
          let nome = registro.nome;
          let email = registro.email;
          let data_agendamento = registro.data_agendamento;
          let status = registro.status;
          let stativo = registro.stativo;

          agendamentos.push([
            id,
            usuario_id, 
            nome, 
            email,
            data_agendamento,
            status,
            stativo
          ]);
        }

        criarDataTableAgendamentos(agendamentos)

      } else if(resposta.status == 409) {
         mostrarModal('warning', 'Não foi encontrado nenhum agendamento', `Não foi encontrado nenhum agendamento para o usuário ${user.nome}`, 'Fechar');
      } else {
        mostrarModal('danger', 'Erro ao verificar agendamentos', `${resp.error}`, 'Fechar');
      }
    } catch (error) {
      mostrarModal('danger', 'Erro ao verificar agendamentos', `${error}`, 'Fechar');
    }
}

function criarDataTableAgendamentos(produtosArray) {
  if ($.fn.DataTable.isDataTable('#data-table-produtos') ) {
    $('#data-table-produtos').DataTable().destroy();
  };

  $('#data-table-produtos').DataTable({
      data: produtosArray,
      deferRender: true,
      columnDefs: [
        { "width": "100px", "targets": "_all" }],
      responsive: true,
      language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json',
        },
      dom: "<'row mb-3'<'col-sm-12 col-md-6 d-flex align-items-center justify-content-start'f><'col-sm-12 col-md-6 d-flex align-items-center justify-content-end'lB>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
      buttons: [
        {
          extend: 'pdfHtml5',
          text: 'PDF',
          titleAttr: 'Generate PDF',
          className: 'btn-light btn-outline-danger btn-sm mr-1'
        },
        {
          extend: 'excelHtml5',
          text: 'Excel',
          titleAttr: 'Generate Excel',
          className: 'btn-light btn-outline-success btn-sm mr-1'
        },
        {
          extend: 'print',
          text: 'Print',
          titleAttr: 'Print Table',
          className: 'btn-light btn-outline-primary btn-sm'
        }
      ]
    });
}
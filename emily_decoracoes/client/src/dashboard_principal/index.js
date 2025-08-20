import * as autenticador from '../autenticador/index.js';

$(document).ready(async () => {
  const user = await autenticador.verificarLogin();
  user ? usuarioLogado(user) : null;
});

function usuarioLogado(user) {
    //alert(`usuario logado ${user.nome}`);

    let linkCatalogo = $("#link_catalogo");
    let linkLogin = $("#link_login");
    let linkCadastro = $("#link_cadastro");

    if(user.funcionario = true && user.administrador == true) {
        linkLogin.attr({
        "href": '../dashboard_adm/index.html',
        "class": 'nav-link sair'
      })
      linkLogin.text(`Admin`)

      linkCadastro.attr({
        "href": 'index.html',
        "class": 'nav-link sair'
      })
      linkCadastro.text(`SAIR`)

      linkCadastro.on('click', evento => {
        evento.preventDefault();
        autenticador.sairSistema();
      });
    } else {

      linkLogin.attr({
        "href": '../dashboard_acompanhamento_agendamento/index.html'
      })
      linkLogin.text(`Meus agendamentos`)

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
}
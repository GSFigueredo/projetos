import * as autenticador from '../backend/autenticador/index.js';

$(document).ready(async () => {
  const user = await autenticador.verificarLogin();

  if(user) {
    usuarioLogado(user); 
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
import { verificarLogin } from '../autenticador/index.js';

function usuarioLogado(user) {
    //alert(`usuario logado ${user.nome}`);

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
        localStorage.clear();
        window.location.href = 'index.html';
      });
    } else {
      linkLogin.attr({
        "href": 'index.html',
      })
      linkLogin.text(`Olá, ${user.nome}`)

      linkCadastro.attr({
        "href": 'index.html',
        "class": 'nav-link sair'
      })
      linkCadastro.text(`SAIR`)

      linkCadastro.on('click', evento => {
        evento.preventDefault();
        localStorage.clear();
        window.location.href = 'index.html';
      });
    }
}

$(document).ready(async () => {
  const user = await verificarLogin();
  user ? usuarioLogado(user) : null;
});
import { verificarLogin } from '../autenticador/index.js';
import { getCookie } from '../autenticador/index.js';

function sairSistema() {
    const id = getCookie('id');
    const token = getCookie('token');

    if(id && token) {
        document.cookie = "id=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;";
        document.cookie = "token=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;";
        window.location.href = 'index.html';
    }
}

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
        sairSistema();
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
        sairSistema();
      });
    }
}

$(document).ready(async () => {
  const user = await verificarLogin();
  user ? usuarioLogado(user) : null;
});
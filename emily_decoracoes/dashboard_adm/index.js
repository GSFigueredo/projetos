import { verificarLogin } from '../autenticador/index.js';

function usuarioLogado(user) {

    let linkLogin = $("#link_login");
    let linkCadastro = $("#link_cadastro");

    if(user.funcionario = true && user.administrador == true) {
        linkLogin.attr({
        "href": '../dashboard_adm/index.html',
        "class": 'nav-link links'
      })
      linkLogin.text(`Admin`)

      linkCadastro.attr({
        "href": 'index.html',
        "class": 'nav-link sair'
      })
      linkCadastro.text(`SAIR`)

      linkCadastro.on('click', evento => {
        evento.preventDefault(); // não permitir que faça evento padrão da tag, exemplo: link, não permite que ele redirecione
        localStorage.clear();
        window.location.href = 'index.html';
      });
    } 
}

// Assim que a página for carregada, chama a função verificarLogin
$(document).ready(async () => {
  const user = await verificarLogin();

  if(user) {
    usuarioLogado(user)
  } else {
    alert('Você deve estar logado para acessar a página de administrador')
    window.location.href = '../dashboard_login/index.html';
  }

  //user ? usuarioLogado(user) : alert('Você deve estar logado para acessar a página de administrador')
});
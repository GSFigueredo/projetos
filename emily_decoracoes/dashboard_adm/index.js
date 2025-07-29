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

    let linkLogin = $("#link_login");
    let linkCadastro = $("#link_cadastro");

    if(user.funcionario == true && user.administrador == true) {
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
        evento.preventDefault();
        sairSistema();
      });
    } 
}

async function adicionarProduto () {

    const produto = {
        nome: $("#nome").val(),
        desc: $("#desc").val(),
        preco: $("#preco").val(),
        tipo: $("#tipo").val(),
        cor: $("#cor").val(),
        modelo: $('#modelo').val(),
        imagem: $('#imagem')[0].files[0]
    }

    if (Object.values(produto).some(campo => !campo)) { 
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const formData = new FormData();
    for(const [chave, valor] of Object.entries(produto)) {
        formData.append(chave, valor) 
    }

    //console.log(formData.get('imagem')); //só é possível acessar os atributos de um objeto FormData via metodo get

    try {
        const resposta = await fetch('http://localhost:3001/api/produtos/inserir', {
            method: 'POST',
            body: formData
        })

        const dados = await resposta.json();

        if(resposta.status == 200) {
          alert('Produto cadastrado com sucesso');
          
        } else {
          alert(`Erro ao inserir produto: ${dados.error}`)
        }

    } catch(error) {
        console.log('Erro ao cadastar produto');
    }

}

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

$('#btn_adicionarProd').click(adicionarProduto);
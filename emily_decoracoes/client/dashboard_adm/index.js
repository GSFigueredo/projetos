import * as autenticador from '../backend/autenticador/index.js';

$(document).ready(async () => {
  const user = await autenticador.verificarLogin();

  if(user && user.funcionario == true && user.administrador == true) {
    usuarioLogado(user)
  } else {
    alert('Sem permissão para acessar ou sem login detectado')
    window.location.href = '../dashboard_login/index.html';
  }
  //user ? usuarioLogado(user) : alert('Você deve estar logado para acessar a página de administrador')
});

$('#btn_adicionarProd').click(adicionarProduto);

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
        autenticador.sairSistema();
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
        console.log('Erro ao cadastar produto: '+ error);
    }

}
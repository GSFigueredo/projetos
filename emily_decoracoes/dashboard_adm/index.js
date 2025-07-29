import { verificarLogin } from '../autenticador/index.js';

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
        evento.preventDefault(); // não permitir que faça evento padrão da tag, exemplo: link, não permite que ele redirecione
        localStorage.clear();
        window.location.href = 'index.html';
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

    if (Object.values(produto).some(campo => !campo)) { //se o campo for vazio, retornará falso, porém é feita a negação para que o campo vire true, e dessa forma entre no if
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const formData = new FormData();
    for(const [chave, valor] of Object.entries(produto)) {
        formData.append(chave, valor) // o objeto produto está sendo adicionado no objeto formData (chave: nome do atributo; valor: valor do campo)
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

// Event listener para o botão de adicionar produto
$('#btn_adicionarProd').click(adicionarProduto);
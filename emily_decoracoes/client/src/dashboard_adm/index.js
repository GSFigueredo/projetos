import * as autenticador from '../services/autenticador/index.js';
import { mostrarModal } from '../components/modal_error/modal_error.js'

$(document).ready(async () => {
  const user = await autenticador.verificarLogin();

  if(user) {
    usuarioLogado(user)
    carregarProdutos();
  } else {
    alert('Sem permissão para acessar ou sem login detectado')
    window.location.href = '../dashboard_login/index.html';
  }

  $('#data-table-produtos tbody').on('click', 'button', function () {
        const id = $(this).data('id');

        if ($(this).hasClass('btn-visualizarProduto')) {
            const imagem = $(this).data('imagem');
            visualizarProduto(id, imagem);

        } else if ($(this).hasClass('btn-editarProduto')) {
            editarProduto(id);

        } else if ($(this).hasClass('btn-excluirProduto')) {
            excluirProduto(id);
        }
    });

    $('#footerModal').on('click', '#btn-editar', function() {
      const produtos = $(this).data('data-produtos');
      atualizarInformacoesProduto(produtos);
  });
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

async function carregarProdutos() {
  
  try {
    const resposta = await fetch('http://localhost:3001/api/produtos/consultarProdutos', {
      method: 'GET',
      headers: {
            'Content-Type': 'application/json'
          }
    });

    const dados = await resposta.json();

    if(resposta.status == 200) {
      const {produtos} = dados;
      let produtosArray = [];

      for(let registro of produtos) {
        let id = registro.id; 
        let nome = registro.nome; 
        let descricao = registro.descricao;
        let tipo = registro.tipo; 
        let cor = registro.cor; 
        let modelo = registro.modelo; 
        let imagem = registro.imagem; 
        let data_inclusao = registro.data_inclusao;
        let opcoes;

        if (id > 0) {
          opcoes = `
            <div class="btn-group btn-group-xs">
              <button type="button" class="btn btn-info btn-xs btn-visualizarProduto" title="Visualizar Produto" data-id="${id}" data-imagem="${imagem}""">Visualizar</button>
              <button type="button" class="btn btn-warning btn-xs btn-editarProduto" title="Editar produto" data-id="${id}"">Editar</button>
              <button type="button" class="btn btn-primary btn-xs btn-excluirProduto" title="Excluir Produto" data-id="${id}"">Excluir</button>
            </div>
          `;
        }

        produtosArray.push([
          id,
          nome,
          descricao,
          tipo,
          cor,
          modelo,
          data_inclusao,
          opcoes
        ])
      };

      criarDataTableProdutos(produtosArray);
    } else { 
      mostrarModal('danger', 'Erro ao consultar produtos', `${dados.error}`, 'Fechar');
    }

  } catch(error) {
    mostrarModal('danger', 'Erro ao solicitar o agendamento', `${error}`, 'Fechar');
  }
}

function criarDataTableProdutos(produtosArray) {
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

function visualizarProduto(id, imagem) {

}

async function editarProduto (id) {
  try {
    const respHtml = await fetch('../components/modal_editarProduto/modal_editarProduto.html');
    const html = await respHtml.text();

    $('main').append(html);

    try {
      const resposta = await fetch(`http://localhost:3001/api/produtos/consultarProdutos?id=${id}`, {
        method: 'GET',
        headers: {
              'Content-Type': 'application/json'
            }
      });

      const dados = await resposta.json();

      if(resposta.status == 200) {
        const {produtos} = dados;

        $("#idproduto").val(`IDPRODUTO: ${produtos[0].id}`);
        $("#nomeProdModal").val(produtos[0].nome);
        $("#descProdModal").val(produtos[0].descricao);
        $("#precoProdModal").val(produtos[0].preco);
        $("#tipoProdModal").val(produtos[0].tipo);
        $("#corProdModal").val(produtos[0].cor);
        $("#modeloProdModal").val(produtos[0].modelo);
        //$("#imagemProdModal").val(produtos[0].imagem);

        $('#footerModal').html(
          `
          <button style="background-color: purple; color: white;" class="btn border" id="btn-fechar" type="button" data-bs-dismiss="modal">
            Fechar
          </button>

          <button style="background-color: purple; color: white;" class="btn border" data-produtos="${produtos}"  id="btn-editar" type="button">
            Salvar Alterações
          </button>
          `
        )
      } else {
        mostrarModal('danger', 'Erro ao consultar produtos', `${dados.error}`, 'Fechar');
      }

    } catch(error) {
      mostrarModal('danger', 'Erro ao editar o produto', `${error}`, 'Fechar');
    }

    $("#modaleditarProduto").modal('show');

  } catch(error) {
    mostrarModal('danger', 'Erro ao editar o produto', `${error}`, 'Fechar');
  }
};

function atualizarInformacoesProduto(produtos) {
  alert(`chegou com o produto id: ${produtos[0].id}`)
}

function excluirProduto(id) {

}

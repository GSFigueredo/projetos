import * as api from '../configuracoes/conn.js';

function cadastrarCliente () {
    const cliente = {
        nome: $('#nome').val(),
        email: $('#email').val(),
        senha: $('#senha').val(),
        confirmarSenha: $('#confirmar_senha').val()
    }
    
    if (Object.values(cliente).some(campo => !campo)) { //verificar se algum campo do objeto está vazio
        alert('Por favor, preencha todos os campos.');
        return;
    } else if(cliente.senha !== cliente.confirmarSenha) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }

    console.log('inserir no banco de dados agora')
}

function inserirBanco(cliente) {
    
}

// Event listener para o botão de cadastro
$('#btn_cadastro').click(cadastrarCliente);
function testeClique() {
    let input = $('#input').val();

    try{
        input = Number.parseFloat(input)/0;
        let resultado = document.querySelector('#result');
        resultado.innerHTML = input;
    } catch (error) {
        console.error('Erro ao adicionar o resultado:', error);
    }
}
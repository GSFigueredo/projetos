export function mostrarModal(tipo, titulo, mensagem, textBtn) {
    // tipo: success, warning, danger
    const cor = tipo || 'secondary';

    document.getElementById('modal-tit').innerHTML = titulo;
    document.getElementById('modal-corp').innerHTML = mensagem;
    document.getElementById('modal-but').innerHTML = textBtn;

    document.getElementById('tit-cor').className = `modal-header text-${cor} fw-bold`;
    document.getElementById('modal-corp').className = `modal-body text-${cor}`;
    document.getElementById('modal-but').className = `btn btn-${cor} fw-bold`;

    $('#mostraModal').modal('show');
        
    return;
}
var loader;
const delayMaximo = 400;

const animationLoadingStop = () => {
    clearTimeout(loader);
    Swal.close();
};

const animationLoadingStart = (msg = 'Carregando Dados...', delay = delayMaximo, ctrlClose = true) => {
    animationLoadingStop();
    delay = typeof delay === 'number' ? Math.max(0, delay) : delayMaximo;
    loader = setTimeout(() => animacaoCarregamento(msg, ctrlClose), delay);
};

export function showResponse(
    type, 
    idCloseModal = '', 
    title = '', 
    text = '', 
    showConfirmButton = true, 
    showCancelButton = false, 
    timeDuration = 5000
) {
    if (idCloseModal) $(`#${idCloseModal}`).modal('hide');

    Swal.fire({
        type,
        title,
        text,
        showConfirmButton,
        showCancelButton,
        timer: timeDuration
    });
}

export function successResponse(idCloseModal = '', title = 'Success', text = 'Success', showConfirmButton = false, timeDuration = 2500) {
    showResponse('success', idCloseModal, title, text, showConfirmButton, false, timeDuration);
}

export function infoResponse(idCloseModal = '', title = 'Info', text = 'Info', showConfirmButton = true, showCancelButton = false, timeDuration = 2500) {
    showResponse('info', idCloseModal, title, text, showConfirmButton, showCancelButton, timeDuration);
}

export function errorResponse(idCloseModal = '', title = 'Error', text = 'Error', showConfirmButton = true, showCancelButton = false, timeDuration = 2500) {
    showResponse('error', idCloseModal, title, text, showConfirmButton, showCancelButton, timeDuration);
}

export function warningResponse(idCloseModal = '', title = 'Warning', text = 'Warning', showConfirmButton = true, showCancelButton = false, timeDuration = 2500) {
    showResponse('warning', idCloseModal, title, text, showConfirmButton, showCancelButton, timeDuration);
}

export function animacaoCarregamento(msgLoading = 'Carregando', ctrlClose = true) {
    return Swal.fire({
        title: 'Aguarde...',
        html: `
            <style>
                .loading span {
                    display: inline-block;
                    width: 0.6em; height: 0.6em;
                    margin: 0.19em;
                    border-radius: 0.6em;
                    animation: loading 1s infinite alternate;
                }
                .loading span:nth-of-type(2) { background: #e3c8ff; animation-delay: 0.3s; }
                .loading span:nth-of-type(3) { background: #d2aef7; animation-delay: 0.5s; }
                .loading span:nth-of-type(4) { background: #ba89ee; animation-delay: 0.7s; }
                .loading span:nth-of-type(5) { background: #ad65fb; animation-delay: 0.9s; }
                .loading span:nth-of-type(6) { background: #9532ff; animation-delay: 1.1s; }
                .loading span:nth-of-type(7) { background: #7b00ff; animation-delay: 1.3s; }
                @keyframes loading { 0% { opacity: 0; } 100% { opacity: 1; } }
            </style>
            <div class="loading animacaoLoading text-center">
                <h2 class="text-dark fw-700">${msgLoading}</h2>
                <h4 id="numPagesLoading" class="fw-900"></h4>
                <h6 class="${ctrlClose ? 'd-block fw-900' : 'd-none'}">Caso queira cancelar, recarregue a página!</h6>
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
        `,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false
    });
}

// Funções de mensagens rápidas
export function msgSuccess(msgTitle = 'Ação executada com Sucesso', text = '', timerClose = 4000) {
    animationLoadingStop();
    return Swal.fire({ type: 'success', title: msgTitle, text: text || msgTitle, showConfirmButton: !timerClose, timer: timerClose });
}

export function msgQuestion(msgTitle = 'Deseja realmente executar esta ação?', text = '', timerClose = false) {
    animationLoadingStop();
    return Swal.fire({
        type: 'question',
        title: msgTitle,
        text,
        showConfirmButton: true,
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        cancelButtonColor: '#d33',
        timer: timerClose,
        allowOutsideClick: false
    });
}

export function msgQuestionInputMotivo(msgTitle = 'Digite o motivo!', lengthMotivo = 10) {
    animationLoadingStop();
    let reason = '';

    return Swal.fire({
        type: 'question',
        title: msgTitle,
        html: `
            <div class="input-group pt-0">
                <input type="text" id="idMotivoModal" class="swal2-input m-0" placeholder="Digite o motivo" style="text-transform: uppercase" />
            </div>
        `,
        width: '25rem',
        focusConfirm: false,
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Voltar',
        cancelButtonColor: '#3085d6',
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        onOpen: () => $('#swal2-validation-message').addClass('text-danger mt-2 fw-700'),
        preConfirm: async () => {
            reason = $('#idMotivoModal').val()?.replace(/[^a-zA-ZÀ-ÿ0-9, ]/g, '').replace(/\s{2,}/g, ' ').trim()?.toUpperCase();
            $('#idMotivoModal').val(reason);

            if (!reason) {
                Swal.showValidationMessage('Digite o motivo!');
                $('#idMotivoModal').focus();
                return false;
            } else if (reason.length < lengthMotivo) {
                Swal.showValidationMessage(`Motivo Muito Curto, O Motivo Deve Conter no Mínimo ${lengthMotivo} Caracteres!`);
                $('#idMotivoModal').focus();
                return false;
            }
        }
    }).then(resp => resp?.value ? { status_response: resp.value, reason } : { status_response: false });
}

export function msgInfo(msgTitle = 'Atenção!', text = '', timerClose = false) {
    animationLoadingStop();
    return Swal.fire({ type: 'info', title: msgTitle, text: text || msgTitle, showConfirmButton: !timerClose, showCancelButton: false, timer: timerClose });
}

export function msgWarning(msgTitle = 'Erro ao carregar os dados, Tente novamente!', text = '', timerClose = false) {
    animationLoadingStop();
    return Swal.fire({ type: 'warning', title: msgTitle, text: text || msgTitle, showConfirmButton: !timerClose, timer: timerClose });
}

export function msgError(msgTitle = 'Erro ao carregar os dados, recarregue e tente novamente!', text = '', timerClose = false) {
    animationLoadingStop();
    return Swal.fire({ type: 'error', title: msgTitle, text: text || msgTitle, showConfirmButton: !timerClose, timer: timerClose });
}

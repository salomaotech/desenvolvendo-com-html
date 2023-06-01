let posicaoX = 0;
let posicaoY = 0;
let movendo = false;
let elementoSelecionado = null;
let offsetElementoX = 0;
let offsetElementoY = 0;
let duplicadoRecentemente = false;

function iniciarMovimento(event) {
    if (event.button === 0 && !duplicadoRecentemente) {
        movendo = true;
        elementoSelecionado = event.target;
        offsetElementoX = event.clientX - elementoSelecionado.getBoundingClientRect().left;
        offsetElementoY = event.clientY - elementoSelecionado.getBoundingClientRect().top;
        window.addEventListener('mousemove', moverElemento);
        window.addEventListener('mouseup', pararMovimento);
    }
}

function moverElemento(event) {
    if (movendo) {
        const limiteEsquerdo = 0;
        const limiteSuperior = 0;
        const limiteDireito = document.documentElement.clientWidth - elementoSelecionado.offsetWidth;
        const limiteInferior = document.documentElement.clientHeight - elementoSelecionado.offsetHeight;

        posicaoX = event.clientX - offsetElementoX;
        posicaoY = event.clientY - offsetElementoY;

        posicaoX = Math.min(Math.max(posicaoX, limiteEsquerdo), limiteDireito);
        posicaoY = Math.min(Math.max(posicaoY, limiteSuperior), limiteInferior);

        elementoSelecionado.style.left = posicaoX + 'px';
        elementoSelecionado.style.top = posicaoY + 'px';

        event.preventDefault();
    }
}

function pararMovimento() {
    movendo = false;
    elementoSelecionado = null;
    window.removeEventListener('mousemove', moverElemento);
    window.removeEventListener('mouseup', pararMovimento);
}

function duplicarElemento(event) {
    const elementoOriginal = event.target;
    const elementoDuplicado = elementoOriginal.cloneNode(true);
    const posicaoOriginalX = parseInt(elementoOriginal.style.left) || 0;
    const posicaoOriginalY = parseInt(elementoOriginal.style.top) || 0;

    const posicaoDuplicadaX = posicaoOriginalX + 20;
    const posicaoDuplicadaY = posicaoOriginalY + 20;

    elementoDuplicado.style.left = posicaoDuplicadaX + 'px';
    elementoDuplicado.style.top = posicaoDuplicadaY + 'px';
    elementoDuplicado.onmousedown = iniciarMovimento;
    elementoDuplicado.ondblclick = duplicarElemento;
    elementoDuplicado.classList.add('duplicado'); // Adiciona a classe 'duplicado' ao elemento duplicado
    document.body.appendChild(elementoDuplicado);

    // Define a variável 'duplicadoRecentemente' como 'true' e a redefine para 'false' após 500ms
    duplicadoRecentemente = true;
    setTimeout(function () {
        duplicadoRecentemente = false;
    }, 500);
}

   
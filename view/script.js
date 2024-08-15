document.addEventListener('DOMContentLoaded', () => {
    const faixa = document.querySelector('.faixa-carrossel');
    const itens = document.querySelectorAll('.item-carrossel');
    const larguraItem = itens[0].offsetWidth;
    let contadorClones = 0;

    // clonar os itens (nessessario para o scroll infinito)
    itens.forEach(item => {
        const clone = item.cloneNode(true);
        faixa.appendChild(clone);
        contadorClones++;
    });
    
    // ajustar a velocidade/duracao da animacao
    const duracaoBase = 30;
    faixa.style.animationDuration = `${duracaoBase * (contadorClones / itens.length)}s`;
    
    // armazenar a duração original da animação para nao ter reset apos o primeiro loop
    const duracaoOriginal = faixa.style.animationDuration;

    // reiniciar a animação no final para evitar um salto
    faixa.addEventListener('animationiteration', () => {
        faixa.style.animation = 'none';
        faixa.offsetHeight; // trigger reflow / nao redimensionar a pagina para evitar um refresh
        faixa.style.animation = null;
        faixa.style.animationDuration = duracaoOriginal; // resetar para a duração original
    });

    // pausar a animação como hover
    faixa.addEventListener('mouseover', () => {
        faixa.style.animationPlayState = 'paused';
    });

    // retomar a animação pós hover
    faixa.addEventListener('mouseout', () => {
        faixa.style.animationPlayState = 'running';
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.7 // Inicia o efeito quando 10% do elemento está visível
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // Para não observar novamente após a primeira exibição
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        fadeInObserver.observe(el);
    });
});
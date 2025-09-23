// Smooth scrolling para links internos
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar efeito de scroll suave
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animações de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.feature-card, .step, .metric, .partner-logo');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efeito parallax no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Funcionalidade dos botões CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Adicionar efeito de clique
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Scroll para seção de contato
            const contactSection = document.querySelector('.contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contador animado para métricas
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString('pt-BR');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString('pt-BR');
            }
        }
        
        updateCounter();
    }

    // Observar métricas para animação do contador
    const metricsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metricNumber = entry.target.querySelector('.metric-number');
                const text = metricNumber.textContent;
                
                // Extrair números dos textos
                if (text.includes('20')) {
                    animateCounter(metricNumber, 20);
                    metricNumber.textContent = '+ 20 anos';
                } else if (text.includes('8 mil')) {
                    metricNumber.textContent = '8 mil m²';
                } else if (text.includes('6 mil')) {
                    metricNumber.textContent = '6 mil';
                } else if (text.includes('137.120')) {
                    animateCounter(metricNumber, 137120);
                }
                
                metricsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const metrics = document.querySelectorAll('.metric');
    metrics.forEach(metric => {
        metricsObserver.observe(metric);
    });

    // Efeito hover nos cards de features
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 208, 132, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Navegação suave entre seções
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    function highlightNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);

    // Formulário de contato (se necessário)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio do formulário
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Enviado!';
                submitButton.style.background = '#28a745';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Lazy loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Adicionar classe de carregamento completo
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Efeito de typing removido - título aparece completo ao carregar
});

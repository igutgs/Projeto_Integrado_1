

document.addEventListener('DOMContentLoaded', () => {
    
    
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = '#000000'; 
            header.style.padding = '15px 0';      
            header.style.boxShadow = '0 2px 10px rgba(255, 0, 0, 0.2)';
            header.style.position = 'fixed';      
        } else {
            header.style.background = 'transparent';
            header.style.padding = '30px 0';
            header.style.boxShadow = 'none';
            header.style.position = 'absolute';
        }
    });

    
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

   
    const animatedElements = document.querySelectorAll('.card-simple, .card-hover, .section h2');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        revealObserver.observe(el);
    });

   
    const menuLinks = document.querySelectorAll('.menu a[href^="#"]');

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, 
                    behavior: 'smooth'
                });
            }
        });
    });

    
    const heroBtn = document.querySelector('.btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', () => {
            
            const target = document.querySelector('#modalidades');
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    }

    
    
});
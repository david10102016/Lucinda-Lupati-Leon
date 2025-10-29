// ==========================================
// VARIABLES GLOBALES
// ==========================================
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// ==========================================
// MENÚ MÓVIL
// ==========================================
function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Cambiar ícono del botón
    const icon = menuToggle.querySelector('i');
    if (sidebar.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Event listeners para el menú móvil
if (menuToggle) {
    menuToggle.addEventListener('click', toggleSidebar);
}

if (overlay) {
    overlay.addEventListener('click', toggleSidebar);
}

// Cerrar menú al hacer clic en un enlace de navegación
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
            toggleSidebar();
        }
    });
});

// ==========================================
// NAVEGACIÓN ACTIVA
// ==========================================
function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

// Actualizar navegación al hacer scroll
window.addEventListener('scroll', updateActiveNav);

// ==========================================
// SMOOTH SCROLL
// ==========================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Ajustar por la altura del nav
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// ANIMACIÓN DE BARRAS DE HABILIDADES
// ==========================================
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 200);
                observer.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ==========================================
// ANIMACIÓN DE FADE-IN AL HACER SCROLL
// ==========================================
function animateOnScroll() {
    const elements = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => observer.observe(element));
}

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Activar animaciones
    animateSkills();
    animateOnScroll();
    
    // Actualizar navegación inicial
    updateActiveNav();
    
    // Mensaje de bienvenida en consola
    console.log('%c¡Bienvenido al portafolio de Lucinda Lupati León!', 'color: #FFB400; font-size: 16px; font-weight: bold;');
    console.log('%cAsesora Comercial Senior con +15 años de experiencia', 'color: #B3B3B3; font-size: 12px;');
});

// ==========================================
// AJUSTAR AL CAMBIAR TAMAÑO DE VENTANA
// ==========================================
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ==========================================
// PREVENIR ERRORES EN IMÁGENES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Error al cargar imagen:', this.src);
        });
    });
});

// ==========================================
// ANIMACIÓN SUAVE PARA ENLACES EXTERNOS
// ==========================================
const externalLinks = document.querySelectorAll('a[target="_blank"]');

externalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = 'scale(1)';
        }, 100);
    });
});

// ==========================================
// LAZY LOADING PARA IMÁGENES (OPCIONAL)
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================================
// DETECCIÓN DE SCROLL PARA EFECTOS
// ==========================================
let lastScroll = 0;
const nav = document.querySelector('.top-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Agregar sombra al nav cuando se hace scroll
    if (currentScroll > 0) {
        nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// COPIAR EMAIL AL HACER CLIC (OPCIONAL)
// ==========================================
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Opcional: copiar email al portapapeles
        const email = link.textContent.trim();
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                console.log('Email copiado:', email);
            }).catch(err => {
                console.error('Error al copiar:', err);
            });
        }
    });
});

// ==========================================
// ANALYTICS (OPCIONAL - AGREGAR TU CÓDIGO)
// ==========================================
function trackEvent(category, action, label) {
    // Aquí puedes agregar tu código de Google Analytics o similar
    console.log('Event:', category, action, label);
}

// Trackear clics en botones importantes
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Button', 'Click', btn.textContent.trim());
    });
});

// ==========================================
// PREVENIR SCROLL HORIZONTAL
// ==========================================
document.body.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// ==========================================
// MENSAJE DE DESARROLLO (REMOVER EN PRODUCCIÓN)
// ==========================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%c⚠️ MODO DESARROLLO', 'background: #FFB400; color: #000; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
    console.log('Recuerda:');
    console.log('1. Agregar tu foto en: assets/images/foto-lucinda.jpg');
    console.log('2. Agregar tu CV en: assets/documents/CV-Lucinda-Lupati.pdf');
    console.log('3. Agregar tu QR en: assets/qr/qr-portafolio.png');
}
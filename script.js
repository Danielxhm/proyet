document.addEventListener('DOMContentLoaded', () => {
  // Animación al scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Añadir clase "visible" para activar la animación
        entry.target.classList.add('visible');
        
        // Animar elementos internos con retraso secuencial
        if (entry.target.querySelectorAll('.animate-item')) {
          const animItems = entry.target.querySelectorAll('.animate-item');
          animItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('visible');
            }, 150 * (index + 1)); // Retraso progresivo
          });
        }
        
        // Desconectar después de animar
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar todos los elementos con la clase animate-on-scroll
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
  
  // Observar elementos con otras animaciones
  document.querySelectorAll('.animate-scale, .animate-slide-left, .animate-slide-right').forEach(el => {
    observer.observe(el);
  });
  
  // Menú móvil toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      
      // Animar hamburguesa
      const spans = menuToggle.querySelectorAll('span');
      spans.forEach(span => {
        span.classList.toggle('active');
      });
    });
  }
  
  // Cerrar menú cuando se hace clic en un enlace
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (menu.classList.contains('active')) {
        menu.classList.remove('active');
      }
    });
  });
  
  // Efecto parallax suave para el encabezado
  const header = document.querySelector('.encabezado');
  if (header) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      if (scrollPos < window.innerHeight) {
        header.style.backgroundPositionY = `${50 + (scrollPos * 0.1)}%`;
      }
    });
  }
});

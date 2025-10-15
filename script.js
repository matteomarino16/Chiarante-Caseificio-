// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    
    // Mobile menu elements
    const mobileHamburger = document.querySelector('.mobile-hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu li a');

    // Toggle mobile menu (original)
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Toggle mobile menu (new mobile hamburger)
    if (mobileHamburger) {
        mobileHamburger.addEventListener('click', function() {
            mobileHamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link (original)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking on a link (new mobile menu)
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileHamburger) {
                mobileHamburger.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
    });

    // Throttle function per ottimizzare le performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (hamburger && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        if (mobileHamburger && !mobileHamburger.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileHamburger.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });

    // Close mobile menu when scrolling
    window.addEventListener('scroll', throttle(function() {
        if (hamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        if (mobileHamburger) {
            mobileHamburger.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    }, 100));

    // Smooth scrolling for navigation links (original)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scrolling for mobile navigation links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // No header offset needed for mobile since header is hidden
                const targetPosition = targetSection.offsetTop;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect removed to maintain background image

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxCurrent = document.getElementById('lightbox-current');
    const lightboxTotal = document.getElementById('lightbox-total');
    
    const galleryImages = document.querySelectorAll('.gallery-item img');
    let currentImageIndex = 0;
    
    // Set total number of images
    lightboxTotal.textContent = galleryImages.length;
    
    // Add click event to each gallery image
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox(this.src, this.alt);
        });
    });
    
    // Open lightbox
    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightboxCurrent.textContent = currentImageIndex + 1;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    // Navigate to previous image
    function prevImage() {
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
        const img = galleryImages[currentImageIndex];
        openLightbox(img.src, img.alt);
    }
    
    // Navigate to next image
    function nextImage() {
        currentImageIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
        const img = galleryImages[currentImageIndex];
        openLightbox(img.src, img.alt);
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    // Close lightbox when clicking on background
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });

    // Product Cards Functionality
    const productCards = document.querySelectorAll('.product-card');
    const productModal = document.getElementById('product-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    // Product descriptions
    const productDescriptions = {
        'burrata': 'La burrata è un formaggio fresco a pasta filata, caratterizzato da una crosta esterna di mozzarella che racchiude un cuore cremoso di stracciatella e panna. Dal sapore delicato e dalla consistenza unica, è perfetta da gustare fresca con pomodori e basilico.',
        'burro': 'Il nostro burro artigianale è prodotto con panna fresca di alta qualità, lavorata secondo metodi tradizionali. Dal colore dorato e dal sapore intenso, è ideale per la preparazione di dolci e per esaltare il gusto di pane e focacce.',
        'caciocavallo': 'Il caciocavallo è un formaggio a pasta filata dalla forma caratteristica, stagionato per almeno 30 giorni. Dal sapore deciso e leggermente piccante, è perfetto da gustare a fette o grattugiato su pasta e risotti.',
        'cacioricotta': 'Il cacioricotta è un formaggio tipico pugliese dalla pasta compatta e dal sapore delicato. Ottenuto dalla lavorazione di latte vaccino e ovino, è ideale per preparazioni sia dolci che salate.',
        'mozzarella': 'La nostra mozzarella è prodotta quotidianamente con latte fresco locale. Dalla pasta filata morbida e dal sapore dolce, è perfetta da gustare fresca o utilizzata nelle preparazioni culinarie tradizionali.',
        'ricotta': 'La ricotta fresca è ottenuta dalla lavorazione del siero di latte. Dal sapore delicato e dalla consistenza cremosa, è ideale per farcire pasta fresca, preparare dolci tradizionali o gustare semplicemente con un filo di miele.',
        'scamorzine': 'Le scamorzine sono piccoli formaggi a pasta filata dalla forma tondeggiante. Dal sapore dolce e delicato, sono perfette da gustare fresche o leggermente affumicate, ideali per antipasti e aperitivi.',
        'stracchino': 'Lo stracchino è un formaggio fresco dalla pasta cremosa e spalmabile. Dal sapore dolce e delicato, è perfetto da spalmare su pane tostato o utilizzare per farcire focacce e crescentine.',
        'treccia': 'La treccia è una mozzarella dalla caratteristica forma intrecciata. Prodotta con latte fresco del giorno, mantiene tutta la morbidezza e il sapore autentico della tradizione casearia pugliese.'
    };

    // Add click event to each product card
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.dataset.product;
            const imageSrc = this.querySelector('.card-image').style.backgroundImage.slice(5, -2);
            const title = this.querySelector('.card-title').textContent;
            const description = productDescriptions[productName] || 'Descrizione non disponibile.';

            // Set modal content
            modalImage.style.backgroundImage = `url('${imageSrc}')`;
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            // Show modal
            productModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal functionality
    function closeProductModal() {
        productModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    modalClose.addEventListener('click', closeProductModal);

    // Close modal when clicking on background
    productModal.addEventListener('click', function(e) {
        if (e.target === productModal) {
            closeProductModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && productModal.style.display === 'block') {
            closeProductModal();
        }
    });
});
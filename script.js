// DOM elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    // Menu tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Gallery
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = []; // Will be populated with the actual gallery items
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    // Accordion
    const accordionButtons = document.querySelectorAll('.accordion-btn');
    
    // Carousel
    const carousel = document.querySelector('.menu-carousel');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    
    // Reservation form
    const reservationForm = document.getElementById('contactForm');
    
    // Navigation toggle functionality
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    
    // Close nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu tabs functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Remove active class from all buttons and add to clicked button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all categories and show the selected one
            menuCategories.forEach(cat => cat.classList.remove('active'));
            document.getElementById(category).classList.add('active');
        });
    });
    
    // Menu filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Remove active class from all buttons and add to clicked button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter menu items based on the selected filter
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Gallery functionality
    // Populate gallery items (this would normally come from a real data source)
    const galleryData = [
        { src: 'images/int1.jpg', alt: 'Cozy ambiance inside the café', category: 'interior', caption: 'Ambiance inside the café' },
        { src: 'images/d1.jpeg', alt: 'Strawberry mojito served in a glass', category: 'drinks', caption: 'Strawberry Mojito' },
        { src: 'images/e4.jpg', alt: 'Valentine’s week decorations inside café', category: 'events', caption: 'Valentine’s Week Décor' },
        { src: 'images/fd5.jpg', alt: 'Creamy pasta dish served hot', category: 'food', caption: 'Pasta' },
        { src: 'images/d5.jpg', alt: 'Green and lemon mojito drink', category: 'drinks', caption: 'Green & Lemon Mojito' },
        { src: 'images/int3.jpg', alt: 'Stylish interior seating arrangement', category: 'interior', caption: 'Chic Café Ambiance' },
        { src: 'images/fd8.jpg', alt: 'Plated café-style meal', category: 'food', caption: 'Tasty Café Meal' },
        { src: 'images/e2.jpg', alt: 'Christmas tree decoration in café', category: 'events', caption: 'Christmas Vibes with Tree Decor' }
    ];
    

    // Create gallery items dynamically
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        galleryItem.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        
        galleryItem.appendChild(img);
        galleryGrid.appendChild(galleryItem);
        galleryItems.push(galleryItem);
        
        // Add click event to open lightbox
        galleryItem.addEventListener('click', function() {
            openLightbox(index);
        });
    });
    
    // Gallery filter functionality
    galleryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.dataset.filter;
            
            // Remove active class from all filters and add to clicked filter
            galleryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items based on the selected category
            galleryItems.forEach(item => {
                if (category === 'all' || item.classList.contains(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Lightbox functionality
    let currentIndex = 0;
    
    function openLightbox(index) {
        currentIndex = index;
        lightbox.classList.add('active');
        updateLightboxContent();
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function updateLightboxContent() {
        const currentItem = galleryData[currentIndex];
        lightboxImg.src = currentItem.src;
        lightboxCaption.textContent = currentItem.caption;
    }
    
    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryData.length;
        updateLightboxContent();
    }
    
    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        updateLightboxContent();
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', nextImage);
    lightboxPrev.addEventListener('click', prevImage);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        } else if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) {
            nextImage();
        } else if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) {
            prevImage();
        }
    });
    
    // Accordion functionality
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.classList.remove('active');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.classList.add('active');
            }
        });
    });
    
    // Carousel functionality
    let scrollAmount = 0;
    const slideWidth = carousel.querySelector('.menu-item').offsetWidth + 20; // 20px for gap
    
    carouselNext.addEventListener('click', function() {
        scrollAmount += slideWidth;
        if (scrollAmount > carousel.scrollWidth - carousel.clientWidth) {
            scrollAmount = carousel.scrollWidth - carousel.clientWidth;
        }
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    carouselPrev.addEventListener('click', function() {
        scrollAmount -= slideWidth;
        if (scrollAmount < 0) {
            scrollAmount = 0;
        }
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Load menu items 
    // This would normally fetch from a database or JSON file
    const menuData = {
        coffee: [
            { name: 'Espresso', price: '₹ 210', description: 'Double shot of our house blend', img: 'images/es.jpg', dietary: ['vegan', 'gluten-free'] },
            { name: 'Cappuccino', price: '₹ 295', description: 'Espresso with steamed milk and foam', img: 'images/cap.jpg', dietary: ['vegetarian'] },
            { name: 'Flat White', price: '₹ 295', description: 'Espresso with velvety steamed milk', img: 'images/fw.jpg', dietary: ['vegetarian'] },
        ],
        tea: [
            { name: 'Assam Tea', price: '₹ 245', description: 'Strong and malty black tea from Assam', img: 'images/as.jpg', dietary: ['vegan', 'gluten-free'] },
            { name: 'Kashmiri Khawa', price: '₹ 255', description: 'Traditional Kashmiri tea with saffron and cardamom', img: 'images/kk.jpg', dietary: ['vegan', 'gluten-free'] },
            { name: 'Masala Tea', price: '₹ 255', description: 'Spiced Indian tea with ginger, cardamom, and cloves', img: 'images/mt.jpg', dietary: ['vegan', 'gluten-free'] }
        ],
        food: [
            { name: 'Margherita Pizza', price: '₹ 685', description: 'Classic pizza with tomato sauce, mozzarella, and basil', img: 'images/mp.jpg', dietary: ['vegetarian'] },
            { name: 'Mac-N-Cheese', price: '₹ 575', description: 'Creamy macaroni with a rich cheese sauce', img: 'images/mc.jpg', dietary: ['vegetarian'] },
            { name: 'Alfredo Macaroni', price: '₹ 595', description: 'Pasta in a creamy Alfredo sauce with Parmesan', img: 'images/am.jpg', dietary: ['vegetarian'] }
        ],
        desserts: [
            { name: 'Blueberry Muffin', price: '₹ 195', description: 'Soft muffin bursting with fresh blueberries', img: 'images/bm.jpg', dietary: ['vegetarian'] },
            { name: 'Brownie with Vanilla Ice Cream', price: '₹ 225', description: 'Warm chocolate brownie served with vanilla ice cream', img: 'images/bv.jpg', dietary: ['vegetarian'] },
            { name: 'Cannoli', price: '₹ 475', description: 'Crispy pastry shell filled with sweet ricotta cream', img: 'images/ca.jpg', dietary: ['vegetarian'] }
        ]
    };
    
    // Populate menu items
    Object.keys(menuData).forEach(category => {
        const menuContainer = document.querySelector(`#${category} .menu-items`);
        
        menuData[category].forEach(item => {
            const dietaryClasses = item.dietary.join(' ');
            const menuItem = document.createElement('div');
            menuItem.className = `menu-item ${dietaryClasses}`;
            
            menuItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="menu-item-details">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price}</p>
                    <p class="description">${item.description}</p>
                    <div>
                        ${item.dietary.map(diet => `<span class="${diet}">${diet}</span>`).join('')}
                    </div>
                </div>
            `;
            
            menuContainer.appendChild(menuItem);
        });
    });
    
    // Form validation and submission
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill out all required fields.');
                return;
            }
            
            // Form submission (would normally send to server)
            alert('Thank you for your message! We will get back to you soon.');
            reservationForm.reset();
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // Form submission (would normally send to server)
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
    
    // AOS (Animation On Scroll) initialization - optional
    // If you want to add animations on scroll, you'd include the AOS library and initialize it here
    // AOS.init();
    
    // Initialize the menu to show the first category
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
    
    // Initialize gallery to show all items
    if (galleryFilters.length > 0) {
        galleryFilters[0].click();
    }
});
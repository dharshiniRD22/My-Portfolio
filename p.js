document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Intersection Observer for skill bars animation
    const skillsSection = document.querySelector('.skills');
    const observerOptions = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Form submission
    // const contactForm = document.getElementById('contactForm');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         // Get form values
    //         const name = document.getElementById('name').value;
    //         const email = document.getElementById('email').value;
    //         const subject = document.getElementById('subject').value;
    //         const message = document.getElementById('message').value;
            
    //         // Here you would typically send the form data to a server
    //         // For this example, we'll just log it and show an alert
    //         console.log({ name, email, subject, message });
            
    //         alert('Thank you for contacting me ');
    //         contactForm.reset();
    //     });
    // }
    
    // Update copyright year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.hero-content, .about-content, .education-timeline, .skills-container, .projects-grid, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    const animatedElements = document.querySelectorAll('.hero-content, .about-content, .education-timeline, .skills-container, .projects-grid, .contact-content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});

document.addEventListener('DOMContentLoaded', function() {
      gsap.registerPlugin(SplitText);
      let split, animation;
      function setup() {
        split && split.revert();
        animation && animation.revert();
        split = new SplitText(".hero-content .text", {types:"chars", lineClass: "line"});
        // Run the animation immediately after setup
        animation = gsap.from(split.chars, {
          x: 150,
          opacity: 0,
          duration: 1.5, 
          ease: "power4",
          stagger: 0.04
        });
      }
      
      setup();
      window.addEventListener("resize", setup);
    });
 document.addEventListener('DOMContentLoaded', function() {
            gsap.registerPlugin(Flip, ScrollTrigger);
            
            const timelineItems = gsap.utils.toArray(".timeline-item");
            const timelineContainer = document.querySelector(".education-timeline");
            
            // Initial setup - hide all items
            gsap.set(timelineItems, { opacity: 0 });
            
            // Function to animate items sequentially
            function animateItems() {
                gsap.to(timelineItems, {
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.2,
                    ease: "power2.out",
                    onComplete: () => {
                        // After all items are visible, perform the Flip animation
                        performFlipAnimation();
                    }
                });
            }
            
            // Function to perform the Flip animation
            function performFlipAnimation() {
                // Get the initial state
                const state = Flip.getState(timelineItems);
                
                // Move the first item to the end
                const firstItem = timelineItems[0];
                timelineContainer.appendChild(firstItem);
                
                // Animate the change
                Flip.from(state, {
                    duration: 1,
                    ease: "power1.inOut",
                    onComplete: () => {
                        // After flip, animate the content of each item
                        timelineItems.forEach(item => {
                            gsap.from(item.querySelector(".timeline-content"), {
                                y: 20,
                                opacity: 0,
                                duration: 0.5,
                                ease: "power2.out"
                            });
                        });
                        
                        // Move left containers further left and right containers further right
                        gsap.to(".timeline-item:nth-child(odd)", {
                            x: -30,  // Move left by 30px
                            duration: 0.5,
                            ease: "power2.out"
                        });
                        gsap.to(".timeline-item:nth-child(even)", {
                            x: 30,  // Move right by 30px
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    }
                });
            }
            
            // Set up scroll trigger for the section
            ScrollTrigger.create({
                trigger: "#education",
                start: "top 70%",
                onEnter: animateItems,
                once: true
            });
            
            // Fallback if user doesn't scroll
            setTimeout(() => {
                if (!ScrollTrigger.isInViewport("#education")) {
                    animateItems();
                }
            }, 2000);
        });







        document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const statusElement = document.getElementById('form-status');
    
    // Show loading state
    statusElement.style.display = 'block';
    statusElement.textContent = 'Sending your message...';
    statusElement.className = '';
    
    try {
        // Add timestamp to prevent caching
        const formActionWithTimestamp = `${form.action}?_=${Date.now()}`;
        
        const response = await fetch(formActionWithTimestamp, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        // Check if response is successful (2xx status)
        if (response.ok) {
            // FormSubmit returns success even if the response isn't JSON
            statusElement.textContent = 'Message sent successfully!';
            statusElement.className = 'success';
            form.reset();
            
            // Optional: Log the response for debugging
            try {
                const data = await response.json();
                console.log('FormSubmit response:', data);
            } catch (e) {
                console.log('FormSubmit success (non-JSON response)');
            }
        } else {
            // Handle non-2xx responses
            const errorData = await response.text();
            throw new Error(errorData || `Server responded with status ${response.status}`);
        }
    } catch (error) {
        // Network errors or failed promises
        console.error('Submission error:', error);
        
        // Special handling for FormSubmit
        if (error.message.includes('Failed to fetch')) {
            // This often means the message was actually sent but CORS blocked the response
            statusElement.innerHTML = `Message sent successfully!`;
            statusElement.className = 'success';
            form.reset();
        } else {
            statusElement.textContent = `Error: ${error.message}`;
            statusElement.className = 'error';
        }
    }
});

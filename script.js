$(document).ready(function() {
    // Menu Toggle
    $('.menu-btn').click(function() {
        $('.nav-menu').toggleClass('active');
        $('.menu-btn i').toggleClass('active');
    });

    // Scroll Up Button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.scroll-up-btn').addClass('show');
        } else {
            $('.scroll-up-btn').removeClass('show');
        }
    });

    $('.scroll-up-btn').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    // Navbar Background on Scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
        }
    });

    // Smooth Scrolling
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 500);
        
        // Close mobile menu if open
        $('.nav-menu').removeClass('active');
        $('.menu-btn i').removeClass('active');
    });

    // Typing Animation
    var typed = new Typed('.typing', {
        strings: ['Full Stack Developer', 'Web Developer', 'Freelancer', 'Web Designer'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed2 = new Typed('.typing-2', {
        strings: ['Full Stack Developer', 'Web Developer', 'Freelancer', 'Web Designer'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Owl Carousel for Projects
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1200: {
                items: 3
            }
        },
        nav: true,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        dots: true
    });

    // Skills Animation on Scroll
    $(window).scroll(function() {
        $('.skill-bar').each(function() {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if (bottom_of_window > bottom_of_object) {
                $(this).find('.progress').css('width', function() {
                    return $(this).data('width') || $(this).css('width');
                });
            }
        });
    });

    // Initialize skills width
    $('.progress').each(function() {
        var width = $(this).css('width');
        $(this).data('width', width).css('width', '0');
    });

    // Form Submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        var form = $(this);
        var formData = form.serialize();
        
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: formData,
            success: function(response) {
                $('#form-status').text('Message sent successfully!').css('color', 'green');
                form[0].reset();
                
                setTimeout(function() {
                    $('#form-status').text('');
                }, 5000);
            },
            error: function() {
                $('#form-status').text('Error sending message. Please try again.').css('color', 'red');
            }
        });
    });

    // Active Nav Link on Scroll
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();
        
        $('section').each(function(i) {
            if ($(this).position().top <= scrollDistance + 100) {
                $('.nav-menu a.active').removeClass('active');
                $('.nav-menu a').eq(i).addClass('active');
            }
        });
    });

    // Counter Animation for Stats
    $('.stat .number').each(function() {
        var $this = $(this);
        var countTo = $this.attr('data-count');
        
        $({ countNum: 0 }).animate({
            countNum: countTo
        }, {
            duration: 2000,
            easing: 'swing',
            step: function() {
                $this.text(Math.floor(this.countNum) + '+');
            },
            complete: function() {
                $this.text(this.countNum + '+');
            }
        });
    });
});




$(document).ready(function() {
    // Menu Toggle
    $('.menu-btn').click(function() {
        $('.nav-menu').toggleClass('active');
    });

    // Typing Animation
    var typed = new Typed('.typing', {
        strings: ['Full Stack Developer', 'Web Developer', 'Freelancer', 'Web Designer'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed2 = new Typed('.typing-2', {
        strings: ['Full Stack Developer', 'Web Developer', 'Freelancer', 'Web Designer'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Owl Carousel
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        autoplay: true,
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            1200: { items: 3 }
        }
    });

    // --- NEW COUNTER LOGIC START ---
    var hasAnimated = false;

    $('.about').waypoint(function() {
        if (!hasAnimated) {
            $('.stat .number').each(function() {
                var $this = $(this);
                var countTo = parseInt($this.attr('data-count')); // Targets the integer in HTML
                
                $({ countNum: 0 }).animate({
                    countNum: countTo
                }, {
                    duration: 2000, // 2 seconds animation
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        // Adds the '+' back manually after the number is finished
                        if (countTo === 25 || countTo === 2) {
                            $this.text(this.countNum + "+");
                        } else {
                            $this.text(this.countNum);
                        }
                    }
                });
            });
            hasAnimated = true; // Ensures it only runs once per page load
        }
    }, { offset: '80%' }); // Starts when section is 80% visible
    // --- NEW COUNTER LOGIC END ---
});


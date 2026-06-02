$(document).ready(function () {

    // ==========================
    // Sticky Navbar & Scroll Button
    // ==========================
    $(window).scroll(function () {

        if ($(this).scrollTop() > 20) {
            $('.navbar').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
        }

        if ($(this).scrollTop() > 500) {
            $('.scroll-up-btn').addClass('show');
        } else {
            $('.scroll-up-btn').removeClass('show');
        }
    });

    // ==========================
    // Scroll To Top
    // ==========================
    $('.scroll-up-btn').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // ==========================
    // Typing Animation for Developer Role
    // ==========================
    var typingRole = new Typed(".typing-role", {
        strings: ["Python Developer", "Software Engineer", "Web Designer"],
        typeSpeed: 80,
        backSpeed: 60,
        backDelay: 2000,
        loop: true
    });

    // ==========================
    // Mobile Menu Functions
    // ==========================
    function closeMenu() {

        $('.navbar .menu').removeClass('active');
        $('body').removeClass('no-scroll');

        $('.menu-btn')
            .attr('aria-expanded', 'false');

        $('.navbar .menu')
            .attr('aria-hidden', 'true');

        $('.menu-btn i')
            .removeClass('fa-times')
            .addClass('fa-bars');
    }

    // ==========================
    // Menu Toggle
    // ==========================
    $('.menu-btn').on('click keydown', function (e) {

        if (
            e.type === 'keydown' &&
            e.key !== 'Enter' &&
            e.key !== ' ' &&
            e.key !== 'Spacebar'
        ) {
            return;
        }

        $('.navbar .menu').toggleClass('active');
        $('body').toggleClass('no-scroll');

        const isMenuOpen = $('.navbar .menu').hasClass('active');

        $('.menu-btn').attr(
            'aria-expanded',
            isMenuOpen
        );

        $('.navbar .menu').attr(
            'aria-hidden',
            !isMenuOpen
        );

        $('.menu-btn i')
            .toggleClass('fa-bars', !isMenuOpen)
            .toggleClass('fa-times', isMenuOpen);
    });

    // ==========================
    // Close Menu When Link Clicked
    // ==========================
    $('.navbar .menu li a').click(function () {
        closeMenu();
    });

    // ==========================
    // Close Menu On Escape Key
    // ==========================
    $(document).keydown(function (e) {

        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // ==========================
    // Auto Close Menu On Resize
    // ==========================
    $(window).resize(function () {

        if ($(window).width() > 947) {
            closeMenu();
        }
    });

    // ==========================
    // Owl Carousel
    // ==========================
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,

        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });

    // ==========================
    // Chatbot Logic
    // ==========================
    const chatbotQuestions = [
        { question: "For which role are you hiring? (Backend, Frontend, Full-stack, DevOps, etc.)", type: "text" },
        { question: "What is your salary range? (Monthly / Annual budget)", type: "text" },
        { question: "What's the domain of the project? (E-commerce, SaaS, FinTech, Healthcare, etc.)", type: "text" },
        { question: "Please provide your contact information (Email or Phone number)", type: "text" }
    ];

    let currentQuestion = 0;
    let userResponses = [];
    let chatStarted = false;

    // Open chatbot
    $('.chatbot-trigger').click(function() {
        $('.chatbot-modal').addClass('active');
        $('body').addClass('no-scroll');
        chatStarted = true;
    });

    // Close chatbot
    $('.chatbot-close').click(function() {
        $('.chatbot-modal').removeClass('active');
        $('body').removeClass('no-scroll');
        resetChatbot();
    });

    // Close on modal background click
    $('.chatbot-modal').click(function(e) {
        if (e.target === this) {
            $('.chatbot-modal').removeClass('active');
            $('body').removeClass('no-scroll');
            resetChatbot();
        }
    });

    // Send message
    $('.chatbot-send').click(sendMessage);
    $('.chatbot-input').keypress(function(e) {
        if (e.which === 13) { // Enter key
            sendMessage();
        }
    });

    function sendMessage() {
        const input = $('.chatbot-input');
        const message = input.val().trim();

        if (!message) return;

        // Display user message
        addUserMessage(message);
        input.val('');
        userResponses.push(message);

        // Show next question or finish
        setTimeout(function() {
            currentQuestion++;
            if (currentQuestion < chatbotQuestions.length) {
                displayQuestion();
            } else {
                finishChatbot();
            }
        }, 500);
    }

    function displayQuestion() {
        if (currentQuestion < chatbotQuestions.length) {
            const q = chatbotQuestions[currentQuestion].question;
            addBotMessage(q);
        }
    }

    function addBotMessage(message) {
        const msgDiv = $('<div class="bot-message"><p>' + escapeHtml(message) + '</p></div>');
        $('.chatbot-messages').append(msgDiv);
        $('.chatbot-messages').scrollTop($('.chatbot-messages')[0].scrollHeight);
    }

    function addUserMessage(message) {
        const msgDiv = $('<div class="user-message"><p>' + escapeHtml(message) + '</p></div>');
        $('.chatbot-messages').append(msgDiv);
        $('.chatbot-messages').scrollTop($('.chatbot-messages')[0].scrollHeight);
    }

    function finishChatbot() {
        const finishMessage = "Thank you for the info! 🎉 Let's connect on Messenger so I can provide a detailed quote and discuss your project in detail.";
        addBotMessage(finishMessage);
        
        // Format responses for Messenger
        const formattedResponses = `Hi Amresh! Here's my hiring inquiry:\n\n` +
            `🎯 Role: ${userResponses[0] || 'N/A'}\n` +
            `💰 Salary Range: ${userResponses[1] || 'N/A'}\n` +
            `🏢 Project Domain: ${userResponses[2] || 'N/A'}\n` +
            `📞 Contact: ${userResponses[3] || 'N/A'}\n\n` +
            `Looking forward to connecting!`;
        
        // Show Messenger button
        setTimeout(function() {
            const messengerUrl = 'https://m.me/amreshkrmahato?text=' + encodeURIComponent(formattedResponses);
            const messengerBtn = $('<button class="messenger-btn" style="margin-top:12px; width:100%; padding:10px; background:linear-gradient(180deg,#0084ff,#0073e6); color:white; border:0; border-radius:8px; cursor:pointer; font-weight:600; font-size:14px;">Connect on Messenger</button>');
            $('.chatbot-input-section').html(messengerBtn);
            
            messengerBtn.click(function() {
                window.open(messengerUrl, '_blank');
            });
        }, 800);
    }

    function resetChatbot() {
        currentQuestion = 0;
        userResponses = [];
        chatStarted = false;
        $('.chatbot-messages').html('<div class="bot-message"><p>Hi! 👋 I\'m Amresh\'s AI assistant. Let\'s talk about your project!</p></div>');
        $('.chatbot-input-section').html('<input type="text" class="chatbot-input" placeholder="Your answer..." aria-label="Chatbot input"><button class="chatbot-send" aria-label="Send message"><i class="fas fa-paper-plane"></i></button>');
        
        // Rebind events
        $('.chatbot-send').click(sendMessage);
        $('.chatbot-input').keypress(function(e) {
            if (e.which === 13) {
                sendMessage();
            }
        });
    }

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    // Start chatbot on open
    $(document).on('click', '.chatbot-trigger', function() {
        setTimeout(function() {
            if (chatStarted) {
                displayQuestion();
            }
        }, 300);
    });

});
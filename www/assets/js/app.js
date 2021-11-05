    simply.route.init({
        root: '/curriculum/'
    });

	window.repos = {
        'curriculum-lpib': 'slonl/curriculum-lpib',
        'curriculum-basis': 'slonl/curriculum-basis',
        'curriculum-kerndoelen': 'slonl/curriculum-kerndoelen',
        'curriculum-examenprogramma': 'slonl/curriculum-examenprogramma',
        'curriculum-examenprogramma-bg': 'slonl/curriculum-examenprogramma-bg',
        'curriculum-syllabus': 'slonl/curriculum-syllabus',
        'curriculum-doelgroepteksten': 'slonl/curriculum-doelgroepteksten',
        'curriculum-leerdoelenkaarten': 'slonl/curriculum-leerdoelenkaarten',
        'curriculum-inhoudslijnen': 'slonl/curriculum-inhoudslijnen',
        'curriculum-referentiekader': 'slonl/curriculum-referentiekader'        
    };
	
    (function() {
        var login;
        var loginString = localStorage.getItem('login');
        if (loginString) {
            try {
                login = JSON.parse(loginString);
            } catch(e) {
            }
        }
        if (login) {
            curriculumApp.actions.autologin(login.username, login.password);
        } else {
            curriculumApp.actions.showLogin();
        }
    })();
    
    // Yucky code, but chrome handles large datalists very poorly. This is to make it only do autocompletion
    // when enough characters have been entered. Firefox doesn't even break a sweat with this;
    if (window.chrome) {
        document.addEventListener("input", function(evt) {
            if (evt.target.hasAttribute("list") && !evt.target.hasAttribute("data-list")) {
                evt.target.setAttribute("data-list", evt.target.getAttribute("list"));
            }
            if (evt.target.getAttribute("data-list")) {
                if (evt.target.value.length > 3) {
                    evt.target.setAttribute("list", evt.target.getAttribute("data-list"));
                } else {
                    evt.target.removeAttribute("list");
                }
            }
        }, true);
    }

    simply.activate.addListener('autosize', function() {
        var self = this;
        self.style.height = 'auto';
        self.style.height = (self.scrollHeight+2)+'px';
           this.addEventListener('input',function(evt) {
            window.setTimeout(function() {
                self.style.height = 'auto';
                self.style.height = (self.scrollHeight+2)+'px';
            },0);
        });
    });

    /* Code to remember scroll position when the lists are changed and redrawn */
    function rememberScrollPosition() {
        window.scrollPosition = {
            y: window.scrollY,
            x: window.scrollX
        };
    }
    window.addEventListener("databind:elementresolved", function(evt) {
        window.setTimeout(function() {
            delete window.scrollPosition;
        }, 200);
    });

    window.addEventListener("scroll", function(evt) {
        if (typeof window.scrollPosition !== "undefined") {
            window.scrollTo(window.scrollPosition.x, window.scrollPosition.y);
        }
    });

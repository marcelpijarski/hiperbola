document.addEventListener("DOMContentLoaded", function () {


    /* MENU */

    const hamburger = document.querySelector(".hamburger");
    const navList = document.querySelector(".nav-list");
    const navLinks = document.querySelectorAll(".nav-list a");


    function closeMenu() {

        hamburger.classList.remove("active");
        navList.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");

    }


    function toggleMenu() {

        const isOpen = navList.classList.toggle("active");

        hamburger.classList.toggle("active", isOpen);
        hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");

        document.body.classList.toggle("menu-open", isOpen);

    }


    if (hamburger && navList) {

        hamburger.setAttribute("aria-expanded", "false");

        hamburger.addEventListener("click", toggleMenu);


        navLinks.forEach(function(link){

            link.addEventListener("click", closeMenu);

        });


        document.addEventListener("click", function(event){

            const klikWMenu =
            navList.contains(event.target) ||
            hamburger.contains(event.target);


            if(!klikWMenu && navList.classList.contains("active")) {

                closeMenu();

            }

        });


        window.addEventListener("resize", function(){

            if(window.innerWidth > 768){

                closeMenu();

            }

        });

    }




    /* FAQ */

    const faqElements = document.querySelectorAll(".faq-element");


    faqElements.forEach(function(element){

        const button = element.querySelector(".faq-pytanie");


        if(button){

            button.setAttribute("aria-expanded", "false");


            button.addEventListener("click", function(){

                const isActive = element.classList.contains("active");


                faqElements.forEach(function(otherElement){

                    otherElement.classList.remove("active");

                    const otherButton =
                    otherElement.querySelector(".faq-pytanie");


                    if(otherButton){

                        otherButton.setAttribute("aria-expanded", "false");

                    }

                });


                if(!isActive){

                    element.classList.add("active");

                    button.setAttribute("aria-expanded", "true");

                }

            });

        }

    });





    /* GALERIA ZDJĘĆ */

    const listaZdjec = document.querySelector(".lista-zdjec");
    const zdjecia = document.querySelectorAll(".lista-zdjec img");

    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");


    if(listaZdjec && zdjecia.length > 0 && next && prev){


        let index = 0;

        const maxIndex = zdjecia.length - 3;


        function przesun(){

            const szerokosc = zdjecia[0].offsetWidth;
            const gap = 19.2;


            listaZdjec.style.transform =
            "translateX(-" + index * (szerokosc + gap) + "px)";

        }


        next.addEventListener("click", function(){

            if(index < maxIndex){

                index++;
                przesun();

            }

        });


        prev.addEventListener("click", function(){

            if(index > 0){

                index--;
                przesun();

            }

        });

    }




    /* OPINIE SWIPER */

    if(document.querySelector(".opinie-slider")){

        const opinieSlider = new Swiper(".opinie-slider", {

            loop:true,

            slidesPerView:1,

            speed:7000,

            autoplay:{
                delay:0,
                disableOnInteraction:false
            },

            allowTouchMove:true,

            grabCursor:false

        });

    }





    /* GLOW UP METAMORFOZY */

    const listaMetamorfozy =
    document.querySelector(".slider-metamorfozy-lista");


    const slajdyMetamorfozy =
    document.querySelectorAll(".metamorfoza-slajd");


    const lewoMetamorfozy =
    document.querySelector(".metamorfozy-lewo");


    const prawoMetamorfozy =
    document.querySelector(".metamorfozy-prawo");



    if(
        listaMetamorfozy &&
        slajdyMetamorfozy.length > 0 &&
        lewoMetamorfozy &&
        prawoMetamorfozy
    ){


        let indeksMetamorfozy = 0;


        function zmienMetamorfoze(){

            listaMetamorfozy.style.transform =
            "translateX(-" + indeksMetamorfozy * 100 + "%)";

        }



        prawoMetamorfozy.addEventListener("click", function(){

            indeksMetamorfozy++;


            if(indeksMetamorfozy >= slajdyMetamorfozy.length){

                indeksMetamorfozy = 0;

            }


            zmienMetamorfoze();

        });



        lewoMetamorfozy.addEventListener("click", function(){

            indeksMetamorfozy--;


            if(indeksMetamorfozy < 0){

                indeksMetamorfozy =
                slajdyMetamorfozy.length - 1;

            }


            zmienMetamorfoze();

        });


    }


});

document.addEventListener("DOMContentLoaded", function () {

    const popupEbook = document.querySelector(".popup-ebook");
    const zamknijPopup = document.querySelector(".popup-ebook-zamknij");
    const gwarancjaSekcja = document.querySelector(".gwarancja-satysfakcji");


    if (
        popupEbook &&
        zamknijPopup &&
        gwarancjaSekcja
    ) {


        let popupPokazany = false;


        const obserwator = new IntersectionObserver(function(entries) {


            entries.forEach(function(entry) {


                if(entry.isIntersecting && !popupPokazany) {


                    popupEbook.style.display = "flex";

                    popupPokazany = true;


                }


            });


        }, {
            threshold: 0.4
        });



        obserwator.observe(gwarancjaSekcja);



        zamknijPopup.addEventListener("click", function(){

            popupEbook.style.display = "none";

        });



        popupEbook.addEventListener("click", function(event){


            if(event.target === popupEbook){

                popupEbook.style.display = "none";

            }


        });


    }


});
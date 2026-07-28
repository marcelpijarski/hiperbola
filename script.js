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

const karuzelaZdjec = document.querySelector(".karuzela");
const oknoZdjec = document.querySelector(".karuzela-okno");
const listaZdjec = document.querySelector(".lista-zdjec");
const zdjecia = document.querySelectorAll(".lista-zdjec img");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

if (
  karuzelaZdjec &&
  oknoZdjec &&
  listaZdjec &&
  zdjecia.length > 0 &&
  next &&
  prev
) {
  let indeksZdjecia = 0;
  let automatGalerii = null;

  function pobierzOdstepZdjec() {
    const styleListy = window.getComputedStyle(listaZdjec);
    const odstep = parseFloat(styleListy.columnGap || styleListy.gap);

    return Number.isFinite(odstep) ? odstep : 0;
  }

  function pobierzSzerokoscKroku() {
    const szerokoscZdjecia =
      zdjecia[0].getBoundingClientRect().width;

    return szerokoscZdjecia + pobierzOdstepZdjec();
  }

  function pobierzLiczbeWidocznychZdjec() {
    const szerokoscOkna =
      oknoZdjec.getBoundingClientRect().width;

    const krok = pobierzSzerokoscKroku();

    if (krok <= 0) {
      return 1;
    }

    return Math.max(
      1,
      Math.floor(
        (szerokoscOkna + pobierzOdstepZdjec()) / krok
      )
    );
  }

  function pobierzMaksymalnyIndeks() {
    return Math.max(
      0,
      zdjecia.length - pobierzLiczbeWidocznychZdjec()
    );
  }

  function przesunGalerie() {
    const maksymalnyIndeks = pobierzMaksymalnyIndeks();

    if (indeksZdjecia > maksymalnyIndeks) {
      indeksZdjecia = maksymalnyIndeks;
    }

    const przesuniecie =
      indeksZdjecia * pobierzSzerokoscKroku();

    listaZdjec.style.transform =
      "translateX(-" + przesuniecie + "px)";
  }

  function pokazNastepneZdjecie() {
    const maksymalnyIndeks = pobierzMaksymalnyIndeks();

    if (indeksZdjecia >= maksymalnyIndeks) {
      indeksZdjecia = 0;
    } else {
      indeksZdjecia += 1;
    }

    przesunGalerie();
  }

  function pokazPoprzednieZdjecie() {
    const maksymalnyIndeks = pobierzMaksymalnyIndeks();

    if (indeksZdjecia <= 0) {
      indeksZdjecia = maksymalnyIndeks;
    } else {
      indeksZdjecia = indeksZdjecia - 1;
    }

    przesunGalerie();
  }

  function zatrzymajAutomatGalerii() {
    if (automatGalerii) {
      window.clearInterval(automatGalerii);
      automatGalerii = null;
    }
  }

  function uruchomAutomatGalerii() {
    zatrzymajAutomatGalerii();

    automatGalerii = window.setInterval(
      pokazNastepneZdjecie,
      2500
    );
  }

  next.addEventListener("click", function () {
    pokazNastepneZdjecie();
    uruchomAutomatGalerii();
  });

  prev.addEventListener("click", function () {
    pokazPoprzednieZdjecie();
    uruchomAutomatGalerii();
  });

  karuzelaZdjec.addEventListener(
    "mouseenter",
    zatrzymajAutomatGalerii
  );

  karuzelaZdjec.addEventListener(
    "mouseleave",
    uruchomAutomatGalerii
  );

  karuzelaZdjec.addEventListener(
    "focusin",
    zatrzymajAutomatGalerii
  );

  karuzelaZdjec.addEventListener(
    "focusout",
    uruchomAutomatGalerii
  );

  window.addEventListener("resize", function () {
    window.requestAnimationFrame(przesunGalerie);
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      zatrzymajAutomatGalerii();
    } else {
      uruchomAutomatGalerii();
    }
  });

  zdjecia.forEach(function (zdjecie) {
    zdjecie.addEventListener("load", przesunGalerie);
  });

  przesunGalerie();
  uruchomAutomatGalerii();
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

function uruchomAutoplayOpinii() {
  const widget = document.querySelector(".sk-ww-google-reviews");

  if (!widget) {
    return;
  }

  function znajdzPrzyciskDalej() {
    const elementy = widget.querySelectorAll(
      'button, a, [role="button"]'
    );

    return Array.from(elementy).find((element) => {
      const opis = [
        element.getAttribute("aria-label"),
        element.getAttribute("title"),
        element.textContent
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        opis.includes("next") ||
        opis.includes("następ") ||
        opis.includes("right")
      );
    });
  }

  function rozpocznij() {
    window.setInterval(() => {
      const przyciskDalej = znajdzPrzyciskDalej();

      if (przyciskDalej) {
        przyciskDalej.click();
      }
    }, 5000);
  }

  const przyciskDalej = znajdzPrzyciskDalej();

  if (przyciskDalej) {
    rozpocznij();
    return;
  }

  const obserwator = new MutationObserver(() => {
    const przycisk = znajdzPrzyciskDalej();

    if (przycisk) {
      obserwator.disconnect();
      rozpocznij();
    }
  });

  obserwator.observe(widget, {
    childList: true,
    subtree: true
  });
}

document.addEventListener("DOMContentLoaded", uruchomAutoplayOpinii);

document.addEventListener("DOMContentLoaded", function () {
  const galeriaStudio = document.querySelector(".galeria-studio");
  const oknoStudio = document.querySelector(".galeria-studio-okno");
  const listaStudio = document.querySelector(".galeria-studio-lista");
  const zdjeciaStudio = document.querySelectorAll(
    ".galeria-studio-lista img"
  );
  const przyciskStudioDalej = document.querySelector(".studio-next");
  const przyciskStudioWstecz = document.querySelector(".studio-prev");

  if (
    !galeriaStudio ||
    !oknoStudio ||
    !listaStudio ||
    zdjeciaStudio.length === 0 ||
    !przyciskStudioDalej ||
    !przyciskStudioWstecz
  ) {
    return;
  }

  let indeksStudio = 0;
  let automatStudio = null;

  function pobierzOdstepStudio() {
    const stylListy = window.getComputedStyle(listaStudio);
    const odstep = parseFloat(
      stylListy.columnGap || stylListy.gap
    );

    return Number.isFinite(odstep) ? odstep : 0;
  }

  function pobierzLiczbeWidocznychStudio() {
    if (window.innerWidth <= 700) {
      return 1;
    }

    if (window.innerWidth <= 1000) {
      return 2;
    }

    return 3;
  }

  function pobierzMaksymalnyIndeksStudio() {
    return Math.max(
      0,
      zdjeciaStudio.length - pobierzLiczbeWidocznychStudio()
    );
  }

  function pobierzKrokStudio() {
    const szerokoscZdjecia =
      zdjeciaStudio[0].getBoundingClientRect().width;

    return szerokoscZdjecia + pobierzOdstepStudio();
  }

  function przesunStudio() {
    const maksymalnyIndeks = pobierzMaksymalnyIndeksStudio();

    if (indeksStudio > maksymalnyIndeks) {
      indeksStudio = maksymalnyIndeks;
    }

    if (indeksStudio < 0) {
      indeksStudio = 0;
    }

    const przesuniecie = indeksStudio * pobierzKrokStudio();

    listaStudio.style.transform =
      "translateX(-" + przesuniecie + "px)";
  }

  function pokazNastepneStudio() {
    const maksymalnyIndeks = pobierzMaksymalnyIndeksStudio();

    if (indeksStudio >= maksymalnyIndeks) {
      indeksStudio = 0;
    } else {
      indeksStudio += 1;
    }

    przesunStudio();
  }

  function pokazPoprzednieStudio() {
    const maksymalnyIndeks = pobierzMaksymalnyIndeksStudio();

    if (indeksStudio <= 0) {
      indeksStudio = maksymalnyIndeks;
    } else {
      indeksStudio -= 1;
    }

    przesunStudio();
  }

  function zatrzymajAutomatStudio() {
    if (automatStudio !== null) {
      window.clearInterval(automatStudio);
      automatStudio = null;
    }
  }

  function uruchomAutomatStudio() {
    zatrzymajAutomatStudio();

    automatStudio = window.setInterval(
      pokazNastepneStudio,
      3000
    );
  }

  przyciskStudioDalej.addEventListener("click", function () {
    pokazNastepneStudio();
    uruchomAutomatStudio();
  });

  przyciskStudioWstecz.addEventListener("click", function () {
    pokazPoprzednieStudio();
    uruchomAutomatStudio();
  });

  galeriaStudio.addEventListener(
    "mouseenter",
    zatrzymajAutomatStudio
  );

  galeriaStudio.addEventListener(
    "mouseleave",
    uruchomAutomatStudio
  );

  galeriaStudio.addEventListener(
    "focusin",
    zatrzymajAutomatStudio
  );

  galeriaStudio.addEventListener(
    "focusout",
    uruchomAutomatStudio
  );

  window.addEventListener("resize", function () {
    window.requestAnimationFrame(przesunStudio);
  });

  zdjeciaStudio.forEach(function (zdjecie) {
    zdjecie.addEventListener("load", przesunStudio);
  });

  przesunStudio();
  uruchomAutomatStudio();
});
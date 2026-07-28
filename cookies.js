document.addEventListener("DOMContentLoaded", function () {
  const kluczZapisu = "hiperbola_cookie_consent_v1";
  const wersjaZgody = 1;

  let zapisaneUstawienia = odczytajUstawienia();

  function odczytajUstawienia() {
    try {
      const zapis = localStorage.getItem(kluczZapisu);

      if (!zapis) {
        return null;
      }

      const dane = JSON.parse(zapis);

      if (dane.version !== wersjaZgody) {
        return null;
      }

      return dane;
    } catch (error) {
      return null;
    }
  }

  function zapiszUstawienia(zewnetrzne) {
    const dane = {
      version: wersjaZgody,
      external: Boolean(zewnetrzne),
      savedAt: new Date().toISOString()
    };

    localStorage.setItem(
      kluczZapisu,
      JSON.stringify(dane)
    );

    zapisaneUstawienia = dane;
  }

  function utworzPanel() {
    const panel = document.createElement("aside");

    panel.className = "cookie-panel";
    panel.id = "cookie-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "cookie-tytul");

    panel.innerHTML = `
      <div class="cookie-panel-gora">
        <div>
          <h2 id="cookie-tytul">
            Szanujemy Twoją prywatność
          </h2>

          <p>
            Używamy niezbędnych technologii do działania strony.
            Za Twoją zgodą możemy również wyświetlać mapę Google
            i zewnętrzny widget opinii.
            Szczegóły znajdziesz w
            <a href="polityka-prywatnosci.html">
              polityce prywatności
            </a>.
          </p>
        </div>

        <button
          type="button"
          class="cookie-zamknij"
          id="cookie-zamknij"
          aria-label="Zamknij ustawienia cookies"
        >
          ×
        </button>
      </div>

      <div class="cookie-przyciski" id="cookie-przyciski-glowne">
        <button
          type="button"
          class="cookie-przycisk cookie-przycisk-odrzuc"
          id="cookie-odrzuc"
        >
          Odrzucam opcjonalne
        </button>

        <button
          type="button"
          class="cookie-przycisk"
          id="cookie-pokaz-ustawienia"
        >
          Ustawienia
        </button>

        <button
          type="button"
          class="cookie-przycisk cookie-przycisk-glowny"
          id="cookie-akceptuj"
        >
          Akceptuję wszystkie
        </button>
      </div>

      <div
        class="cookie-ustawienia-panel"
        id="cookie-ustawienia-panel"
        hidden
      >
        <div class="cookie-kategoria">
          <div>
            <strong>
              Niezbędne
            </strong>

            <p>
              Zapamiętują wybór dotyczący prywatności
              i umożliwiają podstawowe działanie strony.
            </p>
          </div>

          <span class="cookie-kategoria-status">
            Zawsze aktywne
          </span>
        </div>

        <label class="cookie-kategoria">
          <div>
            <strong>
              Treści zewnętrzne
            </strong>

            <p>
              Pozwalają wyświetlić mapę Google
              oraz opinie pobierane z SociableKit.
            </p>
          </div>

          <input
            type="checkbox"
            id="cookie-zewnetrzne"
          >
        </label>

        <div class="cookie-przyciski">
          <button
            type="button"
            class="cookie-przycisk"
            id="cookie-anuluj"
          >
            Wróć
          </button>

          <button
            type="button"
            class="cookie-przycisk cookie-przycisk-glowny"
            id="cookie-zapisz"
          >
            Zapisz wybór
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(panel);

    return panel;
  }

  const panel = utworzPanel();
  const przyciskiGlowne = panel.querySelector(
    "#cookie-przyciski-glowne"
  );
  const ustawieniaPanel = panel.querySelector(
    "#cookie-ustawienia-panel"
  );
  const poleZewnetrzne = panel.querySelector(
    "#cookie-zewnetrzne"
  );
  const przyciskZamknij = panel.querySelector(
    "#cookie-zamknij"
  );

  function pokazPanelGlowne() {
    przyciskiGlowne.hidden = false;
    ustawieniaPanel.hidden = true;
  }

  function pokazUstawienia() {
    przyciskiGlowne.hidden = true;
    ustawieniaPanel.hidden = false;

    poleZewnetrzne.checked = Boolean(
      zapisaneUstawienia &&
      zapisaneUstawienia.external
    );
  }

  function otworzPanel() {
    panel.hidden = false;

    if (zapisaneUstawienia) {
      przyciskZamknij.classList.add(
        "cookie-widoczny"
      );
    } else {
      przyciskZamknij.classList.remove(
        "cookie-widoczny"
      );
    }

    pokazPanelGlowne();
  }

  function zamknijPanel() {
    panel.hidden = true;
  }

  function zaladujMapy() {
    const mapy = document.querySelectorAll(
      ".cookie-mapa[data-src]"
    );

    mapy.forEach(function (kontener) {
      if (kontener.dataset.loaded === "true") {
        return;
      }

      const iframe = document.createElement("iframe");

      iframe.src = kontener.dataset.src;
      iframe.title =
        kontener.dataset.title ||
        "Mapa lokalizacji Hiperbola Fitness";
      iframe.loading = "lazy";
      iframe.referrerPolicy =
        "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;

      kontener.innerHTML = "";
      kontener.appendChild(iframe);
      kontener.dataset.loaded = "true";
    });
  }

  function zaladujOpinie() {
    const sekcjeOpinii = document.querySelectorAll(
      ".cookie-opinie"
    );

    if (!sekcjeOpinii.length) {
      return;
    }

    sekcjeOpinii.forEach(function (sekcja) {
      sekcja.classList.add("cookie-zaladowane");

      const blokada = sekcja.querySelector(
        ".cookie-blokada"
      );

      if (blokada) {
        blokada.remove();
      }
    });

    if (
      document.querySelector(
        "#sociablekit-cookie-script"
      )
    ) {
      return;
    }

    const skrypt = document.createElement("script");

    skrypt.id = "sociablekit-cookie-script";
    skrypt.src =
      "https://widgets.sociablekit.com/google-reviews/widget.js";
    skrypt.defer = true;

    document.body.appendChild(skrypt);
  }

  function zaladujTresciZewnetrzne() {
    zaladujMapy();
    zaladujOpinie();
  }

  function zaakceptujWszystkie() {
    zapiszUstawienia(true);
    zaladujTresciZewnetrzne();
    zamknijPanel();
  }

  function odrzucOpcjonalne() {
    const wymaganeOdswiezenie = Boolean(
      zapisaneUstawienia &&
      zapisaneUstawienia.external
    );

    zapiszUstawienia(false);
    zamknijPanel();

    if (wymaganeOdswiezenie) {
      window.location.reload();
    }
  }

  panel
    .querySelector("#cookie-akceptuj")
    .addEventListener(
      "click",
      zaakceptujWszystkie
    );

  panel
    .querySelector("#cookie-odrzuc")
    .addEventListener(
      "click",
      odrzucOpcjonalne
    );

  panel
    .querySelector("#cookie-pokaz-ustawienia")
    .addEventListener(
      "click",
      pokazUstawienia
    );

  panel
    .querySelector("#cookie-anuluj")
    .addEventListener(
      "click",
      pokazPanelGlowne
    );

  panel
    .querySelector("#cookie-zapisz")
    .addEventListener(
      "click",
      function () {
        const poprzedniaZgoda = Boolean(
          zapisaneUstawienia &&
          zapisaneUstawienia.external
        );

        const nowaZgoda =
          poleZewnetrzne.checked;

        zapiszUstawienia(nowaZgoda);

        if (nowaZgoda) {
          zaladujTresciZewnetrzne();
          zamknijPanel();
          return;
        }

        zamknijPanel();

        if (poprzedniaZgoda) {
          window.location.reload();
        }
      }
    );

  przyciskZamknij.addEventListener(
    "click",
    zamknijPanel
  );

  document.addEventListener(
    "click",
    function (event) {
      const ustawienia = event.target.closest(
        "[data-cookie-ustawienia]"
      );

      if (ustawienia) {
        otworzPanel();
        return;
      }

      const akceptacja = event.target.closest(
        "[data-cookie-akceptuj-zewnetrzne]"
      );

      if (akceptacja) {
        zaakceptujWszystkie();
      }
    }
  );

  document.addEventListener(
    "keydown",
    function (event) {
      if (
        event.key === "Escape" &&
        zapisaneUstawienia &&
        !panel.hidden
      ) {
        zamknijPanel();
      }
    }
  );

  if (zapisaneUstawienia) {
    panel.hidden = true;

    if (zapisaneUstawienia.external) {
      zaladujTresciZewnetrzne();
    }
  } else {
    otworzPanel();
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const opcje = document.querySelectorAll(
    'input[name="Sposób umówienia"]'
  );

  const panelSamodzielnie = document.querySelector(
    "#panel-samodzielnie"
  );

  const panelKontakt = document.querySelector(
    "#panel-kontakt"
  );

  const dataTreningu = document.querySelector(
    "#data-treningu"
  );

  function ustawWymagalnosc(panel, aktywny) {
    const pola = panel.querySelectorAll(
      "input, select, textarea"
    );

    pola.forEach(function (pole) {
      pole.required = aktywny;
    });
  }

  function pokazPanel(wybor) {
    const samodzielnie = wybor === "samodzielnie";
    const kontakt = wybor === "kontakt";

    panelSamodzielnie.hidden = !samodzielnie;
    panelKontakt.hidden = !kontakt;

    ustawWymagalnosc(
      panelSamodzielnie,
      samodzielnie
    );

    ustawWymagalnosc(
      panelKontakt,
      kontakt
    );
  }

  opcje.forEach(function (opcja) {
    opcja.addEventListener("change", function () {
      pokazPanel(opcja.dataset.wybor);
    });
  });

  if (dataTreningu) {
    const teraz = new Date();
    const przesuniecie = teraz.getTimezoneOffset() * 60000;

    const dataLokalna = new Date(
      teraz.getTime() - przesuniecie
    )
      .toISOString()
      .split("T")[0];

    dataTreningu.min = dataLokalna;
  }
});
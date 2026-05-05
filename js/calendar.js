(function () {
  const monthSrc = document.querySelector("#clone-src .month");
  const daySrc = document.querySelector("#clone-src .day");
  const calendar = document.querySelector("#calendar");
  let currMonthBody;
  const monthNames = [
    "Januari",
    "Februari",
    "Maart",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
    "December",
  ];
  const dayNames = ["zo", "ma", "di", "wo", "do", "vr", "za"];

  document.addEventListener("DOMContentLoaded", init);

  /**
   * Initialize the calendar
   * @param {string} varname Description
   * @returns {undefined}
   */
  function init() {
    // const year = prompt("Welk jaar?") || new Date().getFullYear();
    const year = new Date().getFullYear();
    renderCalender(Number(year));
  }

  /**
   *
   * @returns {undefined}
   */
  function renderCalender(year) {
    const dt = new Date("jan 1, " + year);
    let currMonth; // month we're rendering now

    while (dt.getFullYear() === year) {
      const isSameMonth = dt.getMonth() === currMonth;

      if (!isSameMonth) {
        currMonth = dt.getMonth();
        startNewMonth(dt); // end prev month and start next
      }

      if (dt.getDate() === 1) {
        const dayNr = dt.getDay();
        let repeats = dayNr - 1;

        if (repeats === -1) {
          repeats = 6;
        }

        for (let i = 0; i < repeats; i++) {
          addEmptyDay();
        }
      }

      renderDay(dt);

      // increment day
      dt.setDate(dt.getDate() + 1);
    }
  }

  /**
   * add empty days before 1st of month
   * @returns {undefined}
   */
  function addEmptyDay() {
    const day = daySrc.cloneNode(true);
    day.classList.add("empty");
    currMonthBody.appendChild(day);
  }

  /**
   * render a single day
   * @returns {undefined}
   */
  function renderDay(dt) {
    const day = daySrc.cloneNode(true);
    const dayName = dayNames[dt.getDay()];

    day.classList.add(dayName);
    day.querySelector(".day__name").textContent = dayName;
    day.querySelector(".day__nr").textContent = dt.getDate();
    currMonthBody.appendChild(day);
  }

  /**
   * start new month
   * @returns {undefined}
   */
  function startNewMonth(dt) {
    const monthTable = monthSrc.cloneNode(true);
    monthTable.querySelector("caption").textContent = monthNames[dt.getMonth()];
    const tbody = document.createElement("tbody");
    monthTable.appendChild(tbody);
    calendar.appendChild(monthTable);
    currMonthBody = tbody;
  }
})();

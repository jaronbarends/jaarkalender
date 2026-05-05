(function () {
  const monthSrc = document.querySelector("#clone-src .month");
  const daySrc = document.querySelector("#clone-src .day");
  const calendar = document.querySelector("#calendar");
  let currMonthBody;
  const monthFormatter = new Intl.DateTimeFormat("nl-NL", { month: "long" });
  const dayFormatter = new Intl.DateTimeFormat("nl-NL", { weekday: "short" });

  document.addEventListener("DOMContentLoaded", init);

  /**
   * Initialize the calendar
   * @param {string} varname Description
   * @returns {undefined}
   */
  function init() {
    const year = prompt("Welk jaar?") || new Date().getFullYear();
    renderCalender(Number(year));
  }

  /**
   *
   * @returns {undefined}
   */
  function renderCalender(year) {
    const halfYearMonthGroups = [
      [0, 1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11],
    ];

    for (const halfYearMonths of halfYearMonthGroups) {
      const monthsData = halfYearMonths.map((m) => getMonthsData(year, m));
      const startDays = monthsData.map((data) => data.startDay);
      const minStartDay = Math.min(...startDays);
      monthsData.forEach((meta) => renderMonth(year, meta, minStartDay));
    }
  }

  /**
   * @returns {{ month: number, startDay: number, dayCount: number }}
   */
  function getMonthsData(year, month) {
    const startDay = (new Date(year, month, 1).getDay() + 6) % 7; // convert Sun=0 to Mon=0
    const dayCount = new Date(year, month + 1, 0).getDate();
    return { month, startDay, dayCount };
  }

  /**
   * render a single month
   * @returns {undefined}
   */
  function renderMonth(year, { month, startDay, dayCount }, minStartDay) {
    startNewMonth(new Date(year, month, 1));
    for (let i = 0; i < startDay - minStartDay; i++) {
      addEmptyDay();
    }
    for (let day = 1; day <= dayCount; day++) {
      renderDay(new Date(year, month, day));
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
    const dayName = dayFormatter.format(dt);

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
    const monthName = monthFormatter
      .format(dt)
      .replace(/^\w/, (c) => c.toUpperCase());
    monthTable.querySelector(".month__name").textContent = monthName;
    const tbody = document.createElement("tbody");
    monthTable.appendChild(tbody);
    calendar.appendChild(monthTable);
    currMonthBody = tbody;
  }
})();

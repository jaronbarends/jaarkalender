;(function($) {

	var $sgMonthSrc = $('#clone-src').find('.month'),
		$sgDaySrc = $('#clone-src').find('.day'),
		$sgCalendar = $('#calendar'),
		$sgCurrMonth,
		sgMonthNames = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
		sgDayNames = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];



	/**
	* add empty days before 1st of month
	* @returns {undefined}
	*/
	var addEmptyDay = function() {
		var $day = $sgDaySrc.clone()
			.addClass('empty')
			.appendTo($sgCurrMonth);
	};
	
	/**
	* render a single day
	* @returns {undefined}
	*/
	var renderDay = function(dt) {
		// console.log(dt.getDay(), dt.getMonth());
		// console.log(dt.toLocaleDateString());
		// console.log(sgDayNames[dt.getDay()], dt.getDate());
		var $day = $sgDaySrc.clone()
			.appendTo($sgCurrMonth),
			dayName = sgDayNames[dt.getDay()];

		$day.addClass(dayName);
		$day.find('.day__name').text(dayName);
		$day.find('.day__nr').text(dt.getDate());
	};


	/**
	* start new month
	* @returns {undefined}
	*/
	var startNewMonth = function(dt) {
		$sgCurrMonth = $sgMonthSrc.clone()
			.find('caption')
				.text(sgMonthNames[dt.getMonth()])
			.end()
			.appendTo($sgCalendar);
	};
	
	
	

	/**
	* 
	* @returns {undefined}
	*/
	var renderCalender = function(year) {

		var dt = new Date('jan 1, '+year),
			currMonth;// month we're rendering now

		while (dt.getFullYear() === year) {
			var isSameMonth = (dt.getMonth() === currMonth);

			if (!isSameMonth) {
				currMonth = dt.getMonth();
				startNewMonth(dt);// end prev month and start next
			}

			if (dt.getDate() === 1) {
				var dayNr = dt.getDay(),
					repeats = dayNr-1;

				if (repeats === -1) {
					repeats = 6;
				}

				for (var i=0; i<repeats; i++) {
					addEmptyDay();
				}
			}

			renderDay(dt);

			// increment day
			dt.setDate(dt.getDate()+1);
		}
	};


	
	/**
	* 
	* @param {string} varname Description
	* @returns {undefined}
	*/
	var init = function() {
		renderCalender(2016);
	};

	$(document).ready(init);

})(jQuery);
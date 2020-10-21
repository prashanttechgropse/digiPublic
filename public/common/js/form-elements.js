// Additional code for adding placeholder in search box of select2
(function($) {
	var Defaults = $.fn.select2.amd.require('select2/defaults');
	$.extend(Defaults.defaults, {
		searchInputPlaceholder: ''
	});
	var SearchDropdown = $.fn.select2.amd.require('select2/dropdown/search');
	var _renderSearchDropdown = SearchDropdown.prototype.render;
	SearchDropdown.prototype.render = function(decorated) {
		// invoke parent method
		var $rendered = _renderSearchDropdown.apply(this, Array.prototype.slice.apply(arguments));
		this.$search.attr('placeholder', this.options.get('searchInputPlaceholder'));
		return $rendered;
	};
})(window.jQuery);
$(function() {
	'use strict'
	// Toggle Switches
	$('.main-toggle').on('click', function() {
		$(this).toggleClass('on');
	})
	// Input Masks
	$('#dateMask').mask('99/99/9999');
	$('#phoneMask').mask('(999) 999-9999');
	$('#phoneExtMask').mask('(999) 999-9999? ext 99999');
	$('#ssnMask').mask('999-99-9999');
	// Color picker
	// Datepicker
	$('.fc-datepicker').datepicker({
		showOtherMonths: true,
		selectOtherMonths: true
	});
	$('#datepickerNoOfMonths').datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		numberOfMonths: 2
	});
	// AmazeUI Datetimepicker
	$('#datetimepicker').datetimepicker({
		format: 'yyyy-mm-dd hh:ii',
		autoclose: true
	});
	// jQuery Simple DateTimePicker
	$('#datetimepicker2').appendDtpicker({
		closeOnSelected: true,
		onInit: function(handler) {
			var picker = handler.getPicker();
			$(picker).addClass('main-datetimepicker');
		}
	});
	$(document).ready(function() {
		$('.select2').select2({
			placeholder: 'Choose one',
			searchInputPlaceholder: 'Search'
		});
		$('.select2-no-search').select2({
			minimumResultsForSearch: Infinity,
			placeholder: 'Choose one'
		});
	});
});
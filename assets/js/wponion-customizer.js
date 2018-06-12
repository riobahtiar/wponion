'use strict';

/**
 * @param window = Window Object
 * @param document = Document Object
 * @param $ = jQuery Object
 * @param wpo = $wponion object
 * @param wp = $wponion.theme object.
 */
(function (window, document, $, wpo, wp) {
	var wphooks = wp.hooks;

	/**
  * Customizer Functions.
  * @type {{link_customize_settings: function(*), cloneable_update: function(*), cloneable: function(*=)}}
  */
	var $wponion_customizer = {
		/**
   * Adds data-customize-settings-link attribute.
   */
		link_customize_settings: function link_customize_settings($elem) {
			$elem.find('input , textarea').each(function () {
				$(this).attr("data-customize-setting-link", true);
			});
		},

		/**
   * Links WIth KeyValue to auto get and save data.
   */
		cloneable_update: function cloneable_update($control) {
			var $values = $control.container.find(':input').inputToArray({ key: 'name', value: true });
			var $input = $control.container.find('input.wponion_cloneable_value');

			$.each($values, function ($k, $vs) {
				$.each($vs, function ($e, $ep) {
					$values = $ep;
				});
			});

			$input.val(JSON.stringify($values));
			$input.trigger('change');
		},

		/**
   * Enables Cloneable fields.
   */
		cloneable: function cloneable($control) {
			$control.container.on('change', ':input', function () {
				if (!$(this).hasClass('wponion_cloneable_value')) {
					$wponion_customizer.cloneable_update($control);
				}
			});
		}
	};

	/**
  * Handles Key Value field in customizer.
  */
	wp.customize.controlConstructor.wponion_field_key_value = wp.customize.Control.extend({
		ready: function ready() {
			'use strict';

			var control = this;
			wphooks.addAction('wponion_key_value_updated', function ($elem) {
				control.linkElements();
				$wponion_customizer.cloneable_update(control);
			}, 11);

			$wponion_customizer.cloneable(control);
		}
	});

	/**
  * Inits Customizer Instance.
  */
	wphooks.addAction('wponion_init', function () {
		$(".wponion-module-customizer-framework.wponion-framework").each(function () {
			$wponion_customizer.link_customize_settings($(this));
		});
	});
})(window, document, jQuery, $wponion, wp);
//# sourceMappingURL=wponion-customizer.js.map
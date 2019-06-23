<?php

namespace WPOnion\Field;
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

if ( ! class_exists( '\WPOnion\Field\Options_Object' ) ) {
	class Options_Object extends \WPOnion\Field {
		public function field_assets() {
		}

		protected function js_field_args() {
			$module = $this->module( true );
			$values = $module->get_db_values();
			return array( 'values' => $values );
		}

		protected function output() {
			echo '<div class="json-output">';
			echo '</div>';
		}

		protected function field_default() {
		}
	}
}
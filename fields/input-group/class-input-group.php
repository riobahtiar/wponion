<?php
/**
 *
 * Initial version created 28-05-2018 / 10:57 AM
 *
 * @author Varun Sridharan <varunsridharan23@gmail.com>
 * @version 1.0
 * @since 1.0
 * @package
 * @link
 * @copyright 2018 Varun Sridharan
 * @license GPLV3 Or Greater (https://www.gnu.org/licenses/gpl-3.0.txt)
 */

namespace WPOnion\Field;

use WPOnion\Field;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

if ( ! class_exists( '\WPOnion\Field\Input_Group' ) ) {
	/**
	 * Class Color_Picker
	 *
	 * @package WPOnion\Field
	 * @author Varun Sridharan <varunsridharan23@gmail.com>
	 * @since 1.0
	 */
	class Input_Group extends Field {

		/**
		 * Final HTML Output
		 */
		protected function output() {
			echo $this->before();
			if ( is_array( $this->data( 'fields' ) ) ) {
				foreach ( $this->data( 'fields' ) as $id => $data ) {
					$field_args = $this->handle_args( 'title', $data, array( 'type' => 'text' ), array( 'id' => $id ) );
					echo $this->sub_field( $field_args, $this->value( $id ), $this->name() );
				}
			}
			echo $this->after();
		}

		public function field_assets() {
			// TODO: Implement field_assets() method.
		}

		/**
		 * Returns all fields default.
		 *
		 * @return array|mixed
		 */
		protected function field_default() {
			return array(
				'fields' => array(),
			);
		}
	}
}
<?php
/**
 * @author Varun Sridharan <varunsridharan23@gmail.com>
 * @version 1.0
 * @since 1.0
 * @link
 * @copyright 2019 Varun Sridharan
 * @license GPLV3 Or Greater (https://www.gnu.org/licenses/gpl-3.0.txt)
 */

namespace WPO;

use WPO\Helper\Field\Common_Args;

if ( ! class_exists( 'WPO\Field' ) ) {
	/**
	 * Class Field
	 *
	 * @package WPO
	 * @author Varun Sridharan <varunsridharan23@gmail.com>
	 * @since 1.0
	 */
	class Field extends Common_Args {

		/**
		 * Creates A New Field Instance.
		 *
		 * @param bool  $type
		 * @param bool  $id
		 * @param bool  $title
		 * @param array $args
		 *
		 * @return false|\WPO\Field|\WPO\Accordion|\WPO\Background|\WPO\Checkbox|\WPO\Color_Picker|\WPO\Date_Picker|\WPO\Fieldset|\WPO\Font_Picker|\WPO\Gallery|\WPO\Group |\WPO\Icon_Picker|\WPO\Image|\WPO\Image_Select|\WPO\Key_Value|\WPO\Oembed|\WPO\Radio|\WPO\Select|\WPO\Sorter|\WPO\Switcher|\WPO\Text|\WPO\Textarea|\WPO\Typography|\WPO\Upload|\WPO\WP_Editor|\WPO\WP_Link|\WPO\Color_Group|\WPO\Link_Color|\WPO\Input_Group|\WPO\Spacing|\WPO\Dimensions|\WPO\Button_Set|\WPO\Content|\WPO\Heading|\WPO\Iframe|\WPO\Jambo_Content|\WPO\Notice |\WPO\Subheading|\WPO\WP_Notice
		 *
		 * @todo \WPO\Button
		 * @todo \WPO\Color_Palette
		 * @todo \WPO\Google_Maps
		 * @todo \WPO\Hidden
		 * @todo \WPO\WP_List_Table
		 * @todo \WPO\Change_Log
		 *
		 *
		 * @static
		 */
		public static function create( $type = false, $id = false, $title = false, $args = array() ) {
			if ( $type ) {
				$class = class_exists( '\WPO\\' . $type ) ? '\WPO\\' . $type : wponion_get_field_class_remap( '\WPO\\' . $type, false );
				return ( false !== $class ) ? new $class( $id, $title, $args ) : new Field( $type, $id, $title, $args );
			}
			return false;
		}

		/**
		 * Field constructor.
		 *
		 * @param bool  $type
		 * @param bool  $id
		 * @param bool  $title
		 * @param array $args
		 */
		public function __construct( $type = false, $id = false, $title = false, $args = array() ) {
			unset( $this->module );

			$args = wponion_is_array( $args ) ? $args : array();
			$args = $this->parse_args( $args, array(
				'type'  => $type,
				'id'    => $id,
				'title' => $title,
			) );

			foreach ( $args as $key => $val ) {
				$this->_set( $key, $val );
			}

			$this->unique = null;

			if ( ! isset( $this['id'] ) || isset( $this['id'] ) && empty( $this['id'] ) ) {
				$this->unique = wponion_hash_string( $this->unique . wponion_hash_array( $args ) );
			} elseif ( isset( $this['id'] ) ) {
				$this->unique = $this['id'];
			}
		}

		/**
		 * Checks if Given Data is valid field type.
		 *
		 * @param $data
		 *
		 * @static
		 * @return bool
		 */
		public static function is_valid( $data ) {
			return ( false === Container::is_valid( $data ) && isset( $data['type'] ) );
		}


		/**
		 * @param $name
		 * @param $value
		 */
		public function __set( $name, $value ) {
			$this->{$this->array_var}[ $name ] = $value;
		}

		/**
		 * @param $name
		 *
		 * @return bool
		 */
		public function __get( $name ) {
			return ( isset( $this->{$this->array_var}[ $name ] ) ) ? $this->{$this->array_var}[ $name ] : false;
		}

		/**
		 * @param $name
		 *
		 * @return bool
		 */
		public function __isset( $name ) {
			return ( isset( $this->{$this->array_var}[ $name ] ) );
		}

		/**
		 * @param $name
		 */
		public function __unset( $name ) {
			unset( $this->{$this->array_var}[ $name ] );
		}
	}
}

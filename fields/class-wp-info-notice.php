<?php
/**
 *
 * Project : wponion
 * Date : 26-11-2018
 * Time : 12:26 PM
 * File : wp-info-notice.php
 *
 * @author Varun Sridharan <varunsridharan23@gmail.com>
 * @version 1.0
 * @package wponion
 * @copyright 2018 Varun Sridharan
 * @license GPLV3 Or Greater (https://www.gnu.org/licenses/gpl-3.0.txt)
 */

namespace WPOnion\Field;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}


if ( ! class_exists( '\WPOnion\Field\WP_Info_Notice' ) ) {
	/**
	 * Class WPOnion_Field_Notice
	 *
	 * @author Varun Sridharan <varunsridharan23@gmail.com>
	 * @since 1.0
	 */
	class WP_Info_Notice extends WP_Notice {
		protected $notice_type = 'info';
	}
}
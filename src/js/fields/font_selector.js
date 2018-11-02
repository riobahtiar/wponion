import WPOnion_Field from '../core/field';
import $wpoh from 'vsp-js-helper/index';
import $wponion from '../core/core';

export default class extends WPOnion_Field {
	get websafe() {
		return $wponion.windowArgs( 'wponion_websafe_fonts' );
	}

	get google_fonts() {
		return $wponion.windowArgs( 'wponion_gfonts' );
	}

	build_options( data ) {
		let $return = '';
		for( let $_d in data ) {
			$return += `<option value="${$_d}">${data[ $_d ]}</option>`;
		}
		return $return;
	}

	init() {
		this.element.find( 'select.wponion-font-selector' ).on( 'change', ( e ) => {
			let $val  = jQuery( e.currentTarget ).val(),
				$html = null;

			if( false === $wpoh.is_undefined( this.websafe[ 'fonts' ][ $val ] ) ) {
				$html = this.build_options( this.websafe[ 'variants' ] );
			} else if( false === $wpoh.is_undefined( this.google_fonts[ $val ] ) ) {
				$html = this.build_options( this.google_fonts[ $val ] );
			}
			let $variant = this.element.find( 'select.wponion-variant-selector' ).html( $html );

			if( $variant.hasClass( 'chosen' ) ) {
				$variant.trigger( 'chosen:updated' );
			} else if( $variant.hasClass( 'select2' ) ) {
				$variant.trigger( 'change' );
			}
		} );
	}
}

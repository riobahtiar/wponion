import WPOnion_Field from '../core/field';

/*global swal:true*/

class field extends WPOnion_Field {
	/**
	 * Inits Field.
	 */
	init() {
		let $_this      = this,
			$elem       = $_this.element,
			$input      = $elem.find( '.wponion-icon-picker-input' ),
			$remove_btn = $elem.find( 'button[data-wponion-iconpicker-remove]' ),
			$add_btn    = $elem.find( 'button[data-wponion-iconpicker-add]' ),
			$preview    = $elem.find( 'span.wponion-icon-preview' );

		let $work = {
			//Stores POPUP Information.
			elems: null,
			//Stores POPUP Information.
			popup: null,
			//Stores POPUP Information.
			elm: null,
			//Creates A New Instance for ToolTip.
			init_tooltip: () => {
				if( this.option( 'popup_tooltip' ) !== 'false' ) {
					let $tp      = ( typeof this.option( 'popup_tooltip' ) === 'object' ) ? this.option( 'popup_tooltip' ) : {};
					$tp.appendTo = $work.elm[ 0 ];
					$tp          = window.wponion.core.js_func( $tp );
					if( $work.elems.length > 0 ) {
						$work.elems.each( function() {
							let $ep = window.wponion._.cloneDeep( $tp );
							jQuery( this ).tippy( $ep );
						} );
					}
				}
			},
			/**
			 * Inits For each and every POPUP.
			 * @param $elm
			 * @param $instance
			 */
			init: function( $elm, $instance ) {
				$work.elm   = $elm;
				$work.popup = $instance;
				$work.elems = $work.elm.find( 'span.wponion-icon-preview' );
				let $height = $work.elm.find( '.wponion-icon-picker-container-scroll' ).css( 'height' );
				$work.elm.find( '.wponion-icon-picker-container-scroll' ).css( 'height', $height );
				$work.select();
				$work.input();
				$work.elems.on( 'click', function() {
					let $icon = jQuery( this ).attr( 'data-icon' );
					$input.val( $icon ).trigger( 'change' );
					swal.closeModal();
				} );
				$work.init_tooltip();
			},
			/**
			 * Works with POPUP Input Search.
			 */
			input: function() {
				$work.elm.find( 'div.wponion-icon-picker-model-header input[type=text]' ).on( 'keyup', function() {
					let $val = jQuery( this ).val();
					$work.elems.each( function() {
						if( jQuery( this ).attr( 'data-icon' ).search( new RegExp( $val, 'i' ) ) < 0 ) {
							jQuery( this ).parent().hide();
						} else {
							jQuery( this ).parent().show();
						}
					} );
				} );
			},
			/**
			 * Handles Selectbox in popup.
			 */
			select: function() {
				$work.elm.find( 'div.wponion-icon-picker-model-header select' ).on( 'change', function() {
					swal.enableLoading();
					let $val = jQuery( this ).val();
					$_this.ajax( 'icon_picker', {
						data: { 'wponion-icon-lib': $val },
						success: ( $res ) => {
							jQuery( $work.elm ).find( '#swal2-content' ).html( $res ).show();
							jQuery( $work.elm ).find( '#swal2-content .wponion-icon-picker-container-scroll' );
							$work.init( $work.elm, $work.popup );
						},
						error: ( $res ) => {
							jQuery( $work.elm ).find( '.wponion-icon-picker-container-scroll' ).remove();
							wponion_error_swal( $res ).fire();
						},
						always: () => $work.popup.disableLoading(),
					} ).send();
				} );
			}
		};

		if( $input.val() === '' ) {
			$remove_btn.hide();
			$preview.hide();
		}

		/**
		 * Handles Blur Even / change even in inputfield.
		 */
		$input.on( 'keyup blur change keypress', ( e ) => {
			let $val = jQuery( e.currentTarget ).val();

			if( $val !== '' ) {
				$preview.html( '<i class="' + $val + '"></i>' ).show();
				$remove_btn.show();
			} else {
				$preview.hide();
				$remove_btn.hide();
			}
			this.element.trigger( 'wponion_field_updated' );
		} );

		/**
		 * Handles Add Button Click Event.
		 */
		$add_btn.on( 'click', () => {
			let $popup = swal.fire( {
				title: $elem.find( '.wponion-field-title h4' ).html(),
				animation: false,
				allowOutsideClick: false,
				showConfirmButton: false,
				showCloseButton: true,
				width: '700px',
				customClass: 'wponion-icon-picker-model',
				onBeforeOpen: ( $elem ) => {
					swal.enableLoading();
					this.ajax( 'icon_picker', {
						success: ( $res ) => {
							let $popup_elem = jQuery( $elem );
							$popup_elem.find( '#swal2-content' ).html( $res ).show();
							$popup_elem.find( '#swal2-content .wponion-icon-picker-container-scroll' );
							$work.init( $popup_elem, $popup );
						},
						error: ( $res ) => {
							wponion_error_swal( $res ).fire( { animation: false } );
						},
						always: () => $popup.disableLoading(),
					} ).send();
				}
			} );
		} );

		/**
		 * Handles Remove Button Event.
		 */
		$remove_btn.on( 'click', function() {
			$preview.hide();
			$remove_btn.hide();
			$input.val( '' ).trigger( 'change' );
		} );

		return this;
	}
}

export default ( ( w ) => w.wponion_register_field( 'icon_picker', ( $elem ) => new field( $elem ) ) )( window );

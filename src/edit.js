/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { BlockControls, InspectorControls, useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { Button, PanelBody, PanelRow, RangeControl, ToolbarButton } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {

	const {
		totalSlides,
		tempTotalSlides,
		slideshow
	} = attributes;

	function changeTempTotalSlides( newTempTotalSlides ) {
		setAttributes( { tempTotalSlides: newTempTotalSlides } );
	}

	function changeTotalSlides() {
		setAttributes( { totalSlides: tempTotalSlides } );
	}

	function addNewSlide() {
		
		const new_slideshow = [ ...slideshow, 'y' ];

		setAttributes( { slideshow: new_slideshow } );

	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Fun Slides Settings', 'fun-slides' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<RangeControl
							label="Total Slides?"
							value={ tempTotalSlides }
							onChange={ changeTempTotalSlides }
							min={ 3 }
							max={ 30 }
						/>
					</PanelRow>
					<PanelRow>
						<Button
								onClick= { changeTotalSlides }
								variant= 'primary'
							>
								Confirm
						</Button>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>

				{slideshow.map( (slide, index) => {
					return(
						<p>Slide Index: {index}</p>
					);
				})}

				<BlockControls>
					<ToolbarButton
						icon='plus'
						label={ __( "New Slide", 'ultimate-slider' ) }
						onClick={ addNewSlide }
					/>
				</BlockControls>

			</div>
		</>
	);
}

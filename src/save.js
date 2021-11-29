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
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {

	const {
		totalSlides,
		tempTotalSlides,
		slideshow,
		showNavArrows,
		showSliderDots,
		autoplay,
		slideTimer
	} = attributes;


	// Create a new array of only those slides where the media has been selected.

	const frontend_slideshow = [];

	slideshow.map( (slide, index) => {

			if(slide.mediaSrc != "") {
				frontend_slideshow.push(slide);
			}

		}
	);

	return (
		<div className="fun-slides-frontend-wrapper" { ...useBlockProps.save() }>
			{/* { autoplay }
			{ slideTimer }
			{ showSliderDots }
			{ showNavArrows } */}
			<div className="fun-slides-frontend-slideshow">
				{ frontend_slideshow.map( (slide, index) => {

						return(
							<div className="fun-slides-frontend-slide">
								{ (slide.mediaType === "image") && (
									<img src={slide.mediaSrc} alt="slideshow" />
								) }
								{ (slide.mediaType === "video") && (
									<video src={slide.mediaSrc} alt="slideshow" />
								) }
							</div>
						);

					} )
				}
			</div>
		</div>
	);
}

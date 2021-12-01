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
import { RichText, useBlockProps } from '@wordpress/block-editor';

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

	const sliderSettings = '{ "dots":'+ showSliderDots +', "arrows":'+ showNavArrows +', "autoplay":'+ autoplay +', "autoplaySpeed":'+ slideTimer +' }';

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

			<div data-slick={sliderSettings} data-sliderAutoplay={autoplay} data-sliderTimer={slideTimer} data-sliderArrows={showNavArrows} data-sliderDots={showSliderDots} className="fun-slides-frontend-slideshow">
				{ frontend_slideshow.map( (slide, index) => {

						return(
							<div className="fun-slides-frontend-slide">

								{/* If no slide link is prensent */}
								{ ( slide.mediaType === "image" ) && (
									<img className="fun-slides-frontend-image" src={slide.mediaSrc} alt="slideshow" />
								) }
								{ ( slide.mediaType === "video" ) && (
									<video className="fun-slides-frontend-video" src={slide.mediaSrc} alt="slideshow" controls />
								) }

								{/* If slide link is present */}
								{ ( slide.slideLink && slide.slideLink.url != "" ) && (
									<a href={slide.slideLink.url} target="_blank" rel="noopener noreferrer" className="fun-slides-frontend-slidelink" >
									</a>
								) }

								{/* Display CTA if not empty */}
								{ ( slide.ctaText != "" ) && (
									<RichText.Content className="fun-slides-frontend-cta" tagName="p" value={ slide.ctaText } />
								) }

							</div>
						);

					} )
				}
			</div>
		</div>
	);
}

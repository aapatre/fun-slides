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
import {

	BlockControls,
	InspectorControls,
	MediaPlaceholder,
	RichText,
	useBlockProps,
	__experimentalLinkControl as LinkControl,	// Since the LinkControl component is experimental.

} from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { Button, PanelBody, PanelRow, RangeControl, ToolbarButton, CheckboxControl } from '@wordpress/components';

import { useState } from '@wordpress/element';

// Import Slick Slider.
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
		slideshow,
		showNavArrows,
		showSliderDots,
		autoplay,
		slideTimer
	} = attributes;

	const [ currentSlideIndex, setCurrentSlideIndex ] = useState( 0 );

	function changeTempTotalSlides( newTempTotalSlides ) {
		setAttributes( { tempTotalSlides: newTempTotalSlides } );
	}

	function changeTotalSlides() {
		setAttributes( { totalSlides: tempTotalSlides } );
	}

	function addNewSlide( newSlide ) {
		
		const new_slideshow = [ ...slideshow, 
			{
				mediaSrc: "",
				mediaType: "",
				ctaText: "",
				slideLink: ""
			}
		];

		setAttributes( { slideshow: new_slideshow } );

	}

	function changeMediaSrc( newMedia, slideIndex ) {

		console.log(slideIndex);
		console.log(newMedia);

		// const newEntry = [...slideshow, { 
		// 			mediaSrc: newMedia.url,
		// 			mediaType: newMedia.type
		//  }];

		// setAttributes( { slideshow: newEntry } );

		setAttributes( { slideshow: slideshow.map( ( slide, index )  => {

				if ( index == slideIndex ) {
					return ({ ...slide, mediaSrc: newMedia.url, mediaType: newMedia.type });
				}

				return slide;

			} )
		} );

		// const newObj = {...slideshow[slideIndex],  }


		console.log({slideshow});
	}

	function onChangeCtaText( newCtaText, slideIndex ) {

		setAttributes( { slideshow: slideshow.map( ( slide, index )  => {

				if ( index == slideIndex ) {
					return ({ ...slide, ctaText: newCtaText });
				}

				return slide;

			} )

		} );

	}

	function onChangeSlideLink( newSlideLink, slideIndex ) {

		setAttributes( { slideshow: slideshow.map( ( slide, index )  => {

				if ( index == slideIndex ) {
					return ({ ...slide, slideLink: newSlideLink });
				}

				return slide;

			} )

		} );

	}

	function changeSlideIndex( oldIndex, newIndex ) {
		setCurrentSlideIndex( newIndex );
	}

	// Slider settings attribute functions.

	function setSlideTimer( slideTimerValue ) {
		setAttributes( { slideTimer: slideTimerValue } );
	}

	function setAutoplay( autoplayValue ) {
		setAttributes( { autoplay: autoplayValue } );
	}

	function setShowSliderDots( showSliderDotsValue ) {
		setAttributes( { showSliderDots: showSliderDotsValue } );
	}

	function setShowNavArrows( showNavArrowsValue ) {
		setAttributes( { showNavArrows: showNavArrowsValue } );
	}

	const funSlidesSettings = {
		dots: showSliderDots,
		arrows: showNavArrows,
		autoplay: false,
		pauseOnHover: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		speed: 500,
		accessibility: false
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ 'Show/Hide Slider UI Elements' }>			
					<CheckboxControl
						label={ __( 'Show Navigation Arrows?', 'fun-slides' ) }
						help={ __( 'Display the left-right navigation arrows to change slides on front-end?', 'fun-slides' ) }
						checked={ showNavArrows }
						onChange={ setShowNavArrows }
					/>
					<CheckboxControl
						label={ __( 'Show Slider Dots?', 'fun-slides' ) }
						help={ __( 'Display the dots below the slider on front-end?', 'fun-slides' ) }
						checked={ showSliderDots }
						onChange={ setShowSliderDots }
					/>
				</PanelBody>
				<PanelBody title={ 'Autoplay Settings' }>

					<span><i><strong>Note: </strong>Autoplay is disabled in the editor for convenience.</i></span>

					<hr/>

					<CheckboxControl
						label={ __( 'Enable Autoplay?', 'fun-slides' ) }
						help={ __( 'Enable/Disable Autoplay.', 'fun-slides' ) }
						checked={ autoplay }
						onChange={ setAutoplay }
					/>
					{ !! autoplay && (
						<RangeControl
							label={ __( 'Autoplay Timer', 'fun-slides' ) }
							beforeIcon="clock"
							help={ __( 'Set how long should each slide be displayed in milliseconds.', 'fun-slides' ) }
							value={ slideTimer }
							onChange={ setSlideTimer }
							initialPosition={ slideTimer }
							min={ 1000 }
							max={ 20000 }
						/>
						)
					}
				</PanelBody>
			</InspectorControls>
			<div className="fun-slides-parent-wrapper" { ...useBlockProps() }>

				{/* If no slides in the slideshow, tell user to add one */}

				{ ( slideshow[0] === undefined ) && (
					<div>Add a slide with the <span class="dashicons dashicons-plus"></span> icon on block toolbar</div>
				) }

				<Slider
					beforeChange = { changeSlideIndex }
					{ ...funSlidesSettings }
				>
					{ slideshow.map( (slide, index) => {
						return(
							<div className="fun-slides-slide">

								{ ( slide.mediaSrc === "" ) && (
									
									<MediaPlaceholder
										labels = { {
											title: "Choose Media for the Slide"
										} }
										onSelect = { (mediaObj) => changeMediaSrc( mediaObj, index ) }
										accept = "video/*, image/*"
										allowedTypes = { [ "video", "image" ] }
									/>

								) }

								{ ( slide.mediaSrc != "" ) && (

									<div className="fun-slides-slide-media">

										{ ( slide.mediaType === "image" ) && (
											<img src = { slide.mediaSrc } alt = { __('Fun Slides Media', 'fun-slides') } />
										) }

										{ ( slide.mediaType === "video" ) && (
											<video src = { slide.mediaSrc } alt = { __('Fun Slides Media', 'fun-slides') } controls />
										) }
										
										<RichText
											className="fun-slides-cta-richtext"
											key="editable"
											tagName="span"
											value={ slide.ctaText }
											onChange={ (ctaEditObj) => onChangeCtaText( ctaEditObj, index ) }
											placeholder={ __( 'Add CTA...' ) }
											allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] } />

									</div>

								) }
							</div>
						);
					} ) }
				</Slider>


				<BlockControls>
					<ToolbarButton
						icon='plus'
						label={ __( "New Slide", 'ultimate-slider' ) }
						onClick={ addNewSlide }
					/>
					{ ( (slideshow.length > 0) && ( slideshow[currentSlideIndex].mediaSrc != "" ) ) && (
						<LinkControl
							value={ slideshow[currentSlideIndex].slideLink }
							searchInputPlaceholder={ __( "Add link to the slide", 'fun-slides' ) }
							onChange={ ( slideLinkObj ) => onChangeSlideLink( slideLinkObj, currentSlideIndex ) }
						/>
					) }
				</BlockControls>

			</div>
		</>
	);
}

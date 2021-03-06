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
import { Button, PanelBody, PanelRow, RangeControl, ToolbarButton, ToggleControl } from '@wordpress/components';

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

		setAttributes( { slideshow: slideshow.map( ( slide, index )  => {

				if ( index == slideIndex ) {
					return ({ ...slide, mediaSrc: newMedia.url, mediaType: newMedia.type });
				}

				return slide;

			} )
		} );

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
				<PanelBody title={ __('Show/Hide Slider UI Elements', 'fun-slides' ) }>			
					<ToggleControl
						label={ __( 'Show Navigation Arrows', 'fun-slides' ) }
						help={ __( 'Display the left-right navigation arrows to change slides on front-end', 'fun-slides' ) }
						checked={ showNavArrows }
						onChange={ () => setAttributes({showNavArrows: !showNavArrows}) }
					/>
					<ToggleControl
						label={ __( 'Show Slider Dots', 'fun-slides' ) }
						help={ __( 'Display the dots below the slider on front-end', 'fun-slides' ) }
						checked={ showSliderDots }
						onChange={ () => setAttributes({showSliderDots: !showSliderDots}) }
					/>
				</PanelBody>
				<PanelBody title={ 'Autoplay Settings' }>

					<span><i><strong>{ __( 'Note:', 'fun-slides' ) }</strong>{ __('Autoplay is disabled in the editor for convenience.', 'fun-slides' ) }</i></span>

					<hr/>

					<ToggleControl
						label={ __( 'Enable Autoplay', 'fun-slides' ) }
						help={ __( 'Enable/Disable Autoplay.', 'fun-slides' ) }
						checked={ autoplay }
						onChange={ () => setAttributes({autoplay: !autoplay}) }
					/>
					{ !! autoplay && (
						<RangeControl
							label={ __( 'Autoplay Timer', 'fun-slides' ) }
							beforeIcon="clock"
							help={ __( 'Set how long should each slide be displayed in milliseconds.', 'fun-slides' ) }
							value={ slideTimer }
							onChange={ (newSlideTimer) => setAttributes({slideTimer: newSlideTimer}) }
							initialPosition={ slideTimer }
							min={ 1000 }
							max={ 20000 }
						/>
						)
					}
				</PanelBody>
			</InspectorControls>
			<div className="fun-slides-parent-wrapper" { ...useBlockProps() }>

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
											title: __("Choose Media for the Slide", "fun-slides" )
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
						label={ __( "New Slide", 'fun-slides' ) }
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

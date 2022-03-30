// Function to return the index of slideshow with the clicked video.

function getClickedSlideshowObjIndex( clickedObj, classNameOfObjs ) {

  const list_of_objs = jQuery(classNameOfObjs);

  let objIndex;

  Array.from( list_of_objs ).forEach( ( eachObj, index ) => {

    // Compare clicked slideshow object with all the slideshow objects found on the page,
    // and set the index if same. 
    if( jQuery(eachObj).is(clickedObj) ) {

      objIndex = index;

    }

  });

  return objIndex;

}

jQuery(document).ready(function(){

  // Get the list of all slideshows on the page.
  const slideshow_list = jQuery('.fun-slides-frontend-slideshow');

  Array.from( slideshow_list ).forEach( ( each_slideshow, index ) => {

    //Initialize slick for all slideshows present on the page.
    jQuery(each_slideshow).slick();

    const all_videos = jQuery('.fun-slides-frontend-video');

    Array.from(all_videos).forEach( ( video ) => {
  
      video.addEventListener( 'playing', ( e ) => {

        // Get the parent slideshow obj of the video which is being played,
        // and then get the index of the slideshow object (relative to all slideshow objects found on the page).
        const currentSlideshowObj = jQuery(video).closest('.fun-slides-frontend-slideshow');
        const currentSlideshowIndex = getClickedSlideshowObjIndex(currentSlideshowObj, '.fun-slides-frontend-slideshow');

        // Pause autoplay only on the current slideshow.
        jQuery(slideshow_list[currentSlideshowIndex]).slick( 'slickPause' );
  
      } );

      // The following condition is applicable only to slideshows with autoplay enabled.
      // This prevents the code from enabling autoplay on slideshows that do not have it enabled.
      if( jQuery(each_slideshow).attr('data-sliderautoplay') == 'true' ) {

        video.addEventListener( 'pause', ( e ) => {

          // Get the parent slideshow obj of the video which is being played,
          // and then get the index of the slideshow object (relative to all slideshow objects found on the page).
          const currentSlideshowObj = jQuery(video).closest('.fun-slides-frontend-slideshow');
          const currentSlideshowIndex = getClickedSlideshowObjIndex(currentSlideshowObj, '.fun-slides-frontend-slideshow');
  
          // Enable autoplay only on the current slideshow.
          jQuery(slideshow_list[currentSlideshowIndex]).slick( 'slickPlay' );
    
        } );
        
      }
  
    } );

  } );

});

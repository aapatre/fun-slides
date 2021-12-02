function getClickedSlideshowObjIndex( clickedObj, classNameOfObjs ) {

  const list_of_objs = jQuery(classNameOfObjs);

  let objIndex;

  Array.from( list_of_objs ).forEach( ( eachObj, index ) => {

    if( jQuery(eachObj).is(clickedObj) ) {

      objIndex = index;

    }

  });

  return objIndex;

}

jQuery(document).ready(function(){

  const slideshow_list = jQuery('.fun-slides-frontend-slideshow');

  Array.from( slideshow_list ).forEach( ( each_slideshow, index ) => {

    jQuery(each_slideshow).slick();

    const all_videos = jQuery('.fun-slides-frontend-video');

    Array.from(all_videos).forEach( ( video ) => {
  
      video.addEventListener( 'playing', ( e ) => {

        const currentSlideshowObj = jQuery(video).closest('.fun-slides-frontend-slideshow');

        const currentSlideshowIndex = getClickedSlideshowObjIndex(currentSlideshowObj, '.fun-slides-frontend-slideshow');

        jQuery(slideshow_list[currentSlideshowIndex]).slick( 'slickPause' );
  
      } );
  
      if( jQuery(each_slideshow).attr('data-sliderautoplay') == 'true' ) {

        video.addEventListener( 'pause', ( e ) => {

          const currentSlideshowObj = jQuery(video).closest('.fun-slides-frontend-slideshow');

          const currentSlideshowIndex = getClickedSlideshowObjIndex(currentSlideshowObj, '.fun-slides-frontend-slideshow');
  
          jQuery(slideshow_list[currentSlideshowIndex]).slick( 'slickPlay' );
    
        } );
        
      }
  
    } );

  } );

});

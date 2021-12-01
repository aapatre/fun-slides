jQuery(document).ready(function(){

  jQuery('.fun-slides-frontend-slideshow').slick();

  const slideshow_list = jQuery('.fun-slides-frontend-slideshow');

  const all_videos = jQuery('.fun-slides-frontend-video');

  Array.from(all_videos).forEach( ( video ) => {

    video.addEventListener( 'playing', ( e ) => {
      slideshow_list.slick( 'slickPause' )
      console.log('Triggered');
    } )
    video.addEventListener( 'pause', ( e ) => {
      slideshow_list.slick( 'slickPlay' )
    } )

  } )

});

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

  // On before slide change
  jQuery('.fun-slides-frontend-slideshow').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    // console.log(nextSlide);
    
    // console.log(slideshow_list);
    
    // Array.from(slideshow_list).forEach((slideshow_obj, index) => {
      
    //   console.log(slideshow_obj);
    //   console.log(index);

    // });

  });

  // setInterval( function() {

  //   console.log(jQuery('div.fun-slides-frontend-slide > video.fun-slides-frontend-video'));

  //   Array.from(jQuery('div.fun-slides-frontend-slide > video.fun-slides-frontend-video')).forEach((slideshow_obj, index) => {
      
  //     console.log(slideshow_obj);
  //     console.log(index);

  //   });
  
  // } , 5000);

  


});

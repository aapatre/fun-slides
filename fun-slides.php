<?php
/**
 * Plugin Name:       Fun Slides
 * Description:       Fun Slides for Gutenberg!
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Antariksh Patre
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       fun-slides
 *
 * @category Media
 * @package  Fun-Slides
 * @author   Antariksh Patre <antarikshpatre@gmail.com>
 * @license  GPL-2.0-or-later https://www.gnu.org/licenses/gpl-2.0.html
 * @link     https://rtcamp.com
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 * 
 * @return void
 */
function Fun_Slides_Fun_Slides_Block_init()
{
    register_block_type(__DIR__);
}
add_action('init', 'Fun_Slides_Fun_Slides_Block_init');

/**
 * Enqueues slick slider scripts from CDN.
 *
 * @return void
 */
function Enqueue_Slick_Scripts_And_styles()
{
    wp_register_style('slick-css', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css');
    wp_register_script('slick-js', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js');

    wp_enqueue_script('slider-js');
    wp_enqueue_style('slick-css');

}
add_action('wp_enqueue_scripts', 'Enqueue_Slick_Scripts_And_styles');

/**
 * Enqueues script to initialize sliders on front-end.
 *
 * @return void
 */
function Enqueue_Slider_Frontend_script()
{
    $slider_frontend_version = time();  // no caching in development
    wp_register_script(
        'slider-frontend',
        plugins_url('/slider-frontend.js', __FILE__),
        array( 'jquery' ),
        $slider_frontend_version
    );
    wp_enqueue_script('slider-frontend');
}
add_action('wp_enqueue_scripts', 'Enqueue_Slider_Frontend_script');

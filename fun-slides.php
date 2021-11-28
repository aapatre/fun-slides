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
 * @package fun-slides
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function fun_slides_fun_slides_block_init()
{
    register_block_type(__DIR__);
}
add_action('init', 'fun_slides_fun_slides_block_init');

function enqueue_slick_scripts_and_styles()
{
    wp_register_style('slick-css', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css');
    wp_register_script('slick-js', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js');
}
add_action('wp_enqueue_scripts', 'enqueue_slick_scripts_and_styles');

function enqueue_slider_frontend_script()
{
    wp_register_script('slider-frontend', plugins_url('/fun-slides/slider-frontend.js', __FILE__), array( 'jquery' ));
}
add_action('wp_enqueue_scripts', 'enqueue_slider_frontend_script');

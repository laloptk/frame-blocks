<?php
/**
 * Plugin Name:       WP Frame Blocks
 * Description:       A collection of frame blocks for WordPress.
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wpframeblocks
 *
 * @package           wpframeblocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function wpframeblocks_block_init() {
	wp_register_block_types_from_metadata_collection(
		__DIR__ . '/build/blocks',
		__DIR__ . '/build/blocks-manifest.php'
	);
}
add_action( 'init', 'wpframeblocks_block_init' );

/**
 * Enqueue Font Awesome for block icons (editor + frontend).
 * Required by any block that uses fa-* icon classes in its markup.
 */
function wpframeblocks_enqueue_block_assets() {
	// Global design-system tokens — loaded before any block style.
	wp_enqueue_style(
		'wpframeblocks-global',
		plugin_dir_url( __FILE__ ) . 'build/styles/global.css',
		[],
		'0.1.0'
	);

	// Font Awesome 6.5 — required by blocks that use fa-* icon classes.
	wp_enqueue_style(
		'wpframeblocks-font-awesome',
		'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
		[],
		'6.5.0'
	);
}
add_action( 'enqueue_block_assets', 'wpframeblocks_enqueue_block_assets' );

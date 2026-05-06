<?php
/**
 * Plugin Name:       FrameBlocks
 * Description:       A collection of frame blocks for WordPress.
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       frame-blocks
 *
 * @package           frameblocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function frameblocks_block_init() {
	wp_register_block_types_from_metadata_collection(
		__DIR__ . '/build/blocks',
		__DIR__ . '/build/blocks-manifest.php'
	);
}
add_action( 'init', 'frameblocks_block_init' );

/**
 * Enqueue Font Awesome for block icons (editor + frontend).
 * Required by any block that uses fa-* icon classes in its markup.
 */
function frameblocks_enqueue_block_assets() {
	// Global design-system tokens — loaded before any block style.
	wp_enqueue_style(
		'frameblocks-global',
		plugin_dir_url( __FILE__ ) . 'build/styles/global.css',
		[],
		'0.1.0'
	);

	// Font Awesome 6.5 — required by blocks that use fa-* icon classes.
	wp_enqueue_style(
		'frameblocks-font-awesome',
		'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
		[],
		'6.5.0'
	);
}
add_action( 'enqueue_block_assets', 'frameblocks_enqueue_block_assets' );

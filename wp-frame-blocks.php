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

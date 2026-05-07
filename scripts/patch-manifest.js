const fs = require( 'fs' );
const manifestPath = 'build/blocks-manifest.php';
const content = fs.readFileSync( manifestPath, 'utf8' );
if ( ! content.includes( 'ABSPATH' ) ) {
	fs.writeFileSync(
		manifestPath,
		content.replace(
			'<?php',
			"<?php\nif ( ! defined( 'ABSPATH' ) ) exit;"
		)
	);
}

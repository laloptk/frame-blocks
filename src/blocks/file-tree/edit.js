import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import './editor.scss';

const ALLOWED_BLOCKS = [ 'wpframeblocks/file-tree-item' ];

const DEFAULT_TEMPLATE = [
	[ 'wpframeblocks/file-tree-item', { label: 'my-project', itemType: 'folder', depth: 0, isOpen: true } ],
	[ 'wpframeblocks/file-tree-item', { label: 'src', itemType: 'folder', depth: 1, isOpen: true } ],
	[ 'wpframeblocks/file-tree-item', { label: 'components', itemType: 'folder', depth: 2, isOpen: false } ],
	[ 'wpframeblocks/file-tree-item', { label: 'index', itemType: 'file', depth: 2, fileExt: 'ts' } ],
	[ 'wpframeblocks/file-tree-item', { label: 'App', itemType: 'file', depth: 2, fileExt: 'tsx', isActive: true } ],
	[ 'wpframeblocks/file-tree-item', { label: 'package', itemType: 'file', depth: 1, fileExt: 'json' } ],
];

export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'wp-block-frames-file-tree',
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				orientation="vertical"
				template={ DEFAULT_TEMPLATE }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
			/>
		</div>
	);
}

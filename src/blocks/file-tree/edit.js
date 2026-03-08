import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import { StyleControls, AppendBlockButton } from '@wpfb/components';
import { buildInlineStyle } from '@wpfb/helpers';

import './editor.scss';

const ALLOWED_BLOCKS = ['wpframeblocks/file-tree-item'];

const DEFAULT_TEMPLATE = [
	['wpframeblocks/file-tree-item', { label: 'my-project', itemType: 'folder', depth: 0, isOpen: true }],
	['wpframeblocks/file-tree-item', { label: 'src', itemType: 'folder', depth: 1, isOpen: true }],
	['wpframeblocks/file-tree-item', { label: 'components', itemType: 'folder', depth: 2, isOpen: false }],
	['wpframeblocks/file-tree-item', { label: 'index', itemType: 'file', depth: 2, fileExt: 'ts' }],
	['wpframeblocks/file-tree-item', { label: 'App', itemType: 'file', depth: 2, fileExt: 'tsx', isActive: true }],
	['wpframeblocks/file-tree-item', { label: 'package', itemType: 'file', depth: 1, fileExt: 'json' }],
];

export default function Edit({ attributes, setAttributes, clientId }) {
	const { textColor, fontSize } = attributes;

	const blockProps = useBlockProps({
		className: 'wp-block-frames-file-tree',
		style: {
			...buildInlineStyle(attributes),
			...( textColor ? { '--frames-file-tree-text': textColor } : {} ),
			...( fontSize ? { '--frames-file-tree-font-size': fontSize } : {} ),
		},
	});

	return (
		<>
			<StyleControls
				attributes={attributes}
				setAttributes={setAttributes}
				enable={{
					typography: true,
					colors: { text: true, background: true },
					spacing: true,
					border: true,
				}}
			/>
			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					orientation="vertical"
					template={DEFAULT_TEMPLATE}
					renderAppender={false}
				/>

				<AppendBlockButton 
					blockName='wpframeblocks/file-tree-item'
					label='new-tree-item'
					type='file'
					depth={1}
					clientId={clientId}
				/>
			</div>
		</>
	);
}

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';

import { SpacingPanel, BorderPanel, TypographyPanel, ColorPanel, AppendBlockButton } from '@wpfb/components';
import { buildResponsiveStyles, useDeviceType } from '@wpfb/helpers';
import ResponsiveControls from '@wpfb/components/style-controls/ResponsiveControls';

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
	const { textColor, backgroundColor, spacing, border, typography } = attributes;
	const [spacingView, setSpacingView] = useState('desktop');
	const [borderView, setBorderView] = useState('desktop');
	const [typographyView, setTypographyView] = useState('desktop');
	const deviceType = useDeviceType();

	const resolvedStyle = buildResponsiveStyles(attributes, deviceType);

	const blockProps = useBlockProps({
		className: 'wp-block-frames-file-tree',
		style: {
			...resolvedStyle,
			...( backgroundColor ? { backgroundColor } : {} ),
			...( textColor ? { '--frames-file-tree-text': textColor } : {} ),
			...( resolvedStyle.fontSize ? { '--frames-file-tree-font-size': resolvedStyle.fontSize } : {} ),
		},
	});

	return (
		<>
			<InspectorControls>
				<ColorPanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					enabled={ { text: true, background: true } }
				/>
				<ResponsiveControls
					panelTitle={ __( 'Typography', 'wpframeblocks' ) }
					view={ typographyView }
					handleView={ setTypographyView }
				>
					<TypographyPanel
						attributes={ typography }
						setAttributes={ setAttributes }
						enabled={ true }
						view={ typographyView }
					/>
				</ResponsiveControls>
				<ResponsiveControls
					panelTitle={ __( 'Spacing', 'wpframeblocks' ) }
					view={ spacingView }
					handleView={ setSpacingView }
				>
					<SpacingPanel
						attributes={ spacing }
						setAttributes={ setAttributes }
						enabled={ true }
						view={ spacingView }
					/>
				</ResponsiveControls>
				<ResponsiveControls
					panelTitle={ __( 'Border', 'wpframeblocks' ) }
					view={ borderView }
					handleView={ setBorderView }
				>
					<BorderPanel
						attributes={ border }
						setAttributes={ setAttributes }
						enabled={ true }
						view={ borderView }
					/>
				</ResponsiveControls>
			</InspectorControls>

			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					orientation="vertical"
					template={DEFAULT_TEMPLATE}
					renderAppender={false}
				/>

				<AppendBlockButton
					blockName="wpframeblocks/file-tree-item"
					blockAttributes={ {
						label: 'new-tree-item',
						itemType: 'file',
						depth: 1,
					} }
					clientId={ clientId }
					className="wp-block-frames-file-tree__add-item wp-block-frames-file-tree__add-item--new-tree-item"
					tooltipLabel={ __( 'Add tree item', 'wpframeblocks' ) }
					buttonText={ __( 'Add item', 'wpframeblocks' ) }
				/>
			</div>
		</>
	);
}

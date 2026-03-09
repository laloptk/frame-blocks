import { useBlockProps } from '@wordpress/block-editor';
import { FrameIcon } from '@wpfb/frame-components';

import { getTreeItemIcon, buildInlineStyle } from '@wpfb/helpers';

export default function save( { attributes } ) {
	const { label, itemType, depth, isActive, isOpen, fileExt, activeColor, activeTextColor } = attributes;

	const { iconFA, iconMod } = getTreeItemIcon( itemType, fileExt, isOpen );

	const arrowFA =
		itemType === 'folder'
			? isOpen
				? 'fa-solid fa-chevron-down'
				: 'fa-solid fa-chevron-right'
			: 'fa-solid fa-angle-right';

	const blockProps = useBlockProps.save( {
		className: [
			'wp-block-frames-file-tree__item',
			`wp-block-frames-file-tree__item--depth-${ depth }`,
			isActive ? 'wp-block-frames-file-tree__item--active' : '',
		]
			.filter( Boolean )
			.join( ' ' ),
		style: {
			...buildInlineStyle( attributes ),
			...( isActive && activeColor ? { '--frames-file-tree-active-bg': activeColor } : {} ),
			...( isActive && activeTextColor ? { color: activeTextColor } : {} ),
		},
	} );

	const childTypography = {
		fontSize: attributes.fontSize || undefined,
		lineHeight: attributes.lineHeight || undefined,
	};

	return (
		<div { ...blockProps }>
			<FrameIcon
				as="i"
				className={ [
					'wp-block-frames-file-tree__arrow',
					itemType === 'file'
						? 'wp-block-frames-file-tree__arrow--hidden'
						: '',
					arrowFA,
				]
					.filter( Boolean )
					.join( ' ' ) }
				style={ { lineHeight: childTypography.lineHeight } }
			/>
			<FrameIcon
				as="i"
				className={ [
					'wp-block-frames-file-tree__icon',
					iconMod,
					iconFA,
				]
					.filter( Boolean )
					.join( ' ' ) }
				style={ {
					fontSize: childTypography.fontSize,
					lineHeight: childTypography.lineHeight,
					width: childTypography.fontSize ? `calc(${ childTypography.fontSize } + 0.2em)` : undefined,
				} }
			/>
			<span
				className="wp-block-frames-file-tree__label"
				style={ {
					fontSize: childTypography.fontSize,
					lineHeight: childTypography.lineHeight,
				} }
			>
				{ `${ label }${ itemType === 'file' && fileExt ? '.' + fileExt : '' }` }
			</span>
		</div>
	);
}

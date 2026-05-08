import { useBlockProps } from '@wordpress/block-editor';
import { FrameIcon } from '@wpfb/frame-components';

import { getTreeItemIcon } from '@wpfb/helpers';

export default function save( { attributes } ) {
	const { typography, label, itemType, depth, isActive, isOpen, fileExt, activeColor, activeTextColor } = attributes;

	const { iconFA, iconMod } = getTreeItemIcon( itemType, fileExt, isOpen );

	const arrowFA =
		itemType === 'folder'
			? isOpen
				? 'fa-solid fa-chevron-down'
				: 'fa-solid fa-chevron-right'
			: 'fa-solid fa-angle-right';

	const fs = typography?.desktop?.fontSize || undefined;
	const lh = typography?.desktop?.lineHeight || undefined;

	const blockProps = useBlockProps.save( {
		className: [
			'wp-block-frames-file-tree__item',
			`wp-block-frames-file-tree__item--depth-${ depth }`,
			isActive ? 'wp-block-frames-file-tree__item--active' : '',
		]
			.filter( Boolean )
			.join( ' ' ),
		style: {
			...( isActive && activeColor ? { '--frames-file-tree-active-bg': activeColor } : {} ),
			...( isActive && activeTextColor ? { color: activeTextColor } : {} ),
		},
	} );

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
				style={ { lineHeight: lh } }
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
					fontSize: fs,
					lineHeight: lh,
					width: fs ? `calc(${ fs } + 0.2em)` : undefined,
				} }
			/>
			<span
				className="wp-block-frames-file-tree__label"
				style={ {
					fontSize: fs,
					lineHeight: lh,
				} }
			>
				{ `${ label }${ itemType === 'file' && fileExt ? '.' + fileExt : '' }` }
			</span>
		</div>
	);
}

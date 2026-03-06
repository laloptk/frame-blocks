import { useBlockProps } from '@wordpress/block-editor';

import { getTreeItemIcon } from '@wpfb/helpers';

export default function save( { attributes } ) {
	const { label, itemType, depth, isActive, isOpen, fileExt } = attributes;

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
	} );

	return (
		<div { ...blockProps }>
			<i
				className={ [
					'wp-block-frames-file-tree__arrow',
					itemType === 'file'
						? 'wp-block-frames-file-tree__arrow--hidden'
						: '',
					arrowFA,
				]
					.filter( Boolean )
					.join( ' ' ) }
			></i>
			<i
				className={ [
					'wp-block-frames-file-tree__icon',
					iconMod,
					iconFA,
				]
					.filter( Boolean )
					.join( ' ' ) }
			></i>
			<span className="wp-block-frames-file-tree__label">{ label }</span>
		</div>
	);
}

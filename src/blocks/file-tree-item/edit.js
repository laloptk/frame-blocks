import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	RangeControl,
	ToggleControl,
	BaseControl,
} from '@wordpress/components';
import { StyleControls, FrameIcon } from '@wpfb/components';
import { buildInlineStyle, getTreeItemIcon } from '@wpfb/helpers';

export default function Edit( { attributes, setAttributes } ) {
	const { label, itemType, depth, isActive, isOpen, fileExt, activeColor, activeTextColor } = attributes;

	const { iconFA, iconMod } = getTreeItemIcon( itemType, fileExt, isOpen );

	const arrowFA =
		itemType === 'folder'
			? isOpen
				? 'fa-solid fa-chevron-down'
				: 'fa-solid fa-chevron-right'
			: 'fa-solid fa-angle-right';

	const blockProps = useBlockProps( {
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

	const fs = attributes.fontSize || undefined;
	const lh = attributes.lineHeight || undefined;

	return (
		<>
			<StyleControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				enable={ {
					typography: true,
				} }
			/>
			<InspectorControls>
				<PanelBody title={ __( 'Item Settings', 'wpframeblocks' ) }>
					<TextControl
						label={ __( 'Label', 'wpframeblocks' ) }
						value={ label }
						onChange={ ( value ) => setAttributes( { label: value } ) }
					/>
					<SelectControl
						label={ __( 'Type', 'wpframeblocks' ) }
						value={ itemType }
						options={ [
							{ label: __( 'File', 'wpframeblocks' ), value: 'file' },
							{ label: __( 'Folder', 'wpframeblocks' ), value: 'folder' },
						] }
						onChange={ ( value ) => setAttributes( { itemType: value } ) }
					/>
					{ itemType === 'file' && (
						<TextControl
							label={ __( 'File extension', 'wpframeblocks' ) }
							value={ fileExt }
							placeholder="ts"
							help={ __(
								'e.g. ts, tsx, js, jsx, php, css, html',
								'wpframeblocks'
							) }
							onChange={ ( value ) =>
								setAttributes( { fileExt: value } )
							}
						/>
					) }
					<RangeControl
						label={ __( 'Depth', 'wpframeblocks' ) }
						value={ depth }
						min={ 0 }
						max={ 9 }
						onChange={ ( value ) => setAttributes( { depth: value } ) }
					/>
					<ToggleControl
						label={ __( 'Active (highlighted row)', 'wpframeblocks' ) }
						checked={ isActive }
						onChange={ ( value ) => setAttributes( { isActive: value } ) }
					/>
					{ isActive && (
						<>
							<BaseControl
								label={ __( 'Highlight Color', 'wpframeblocks' ) }
								id="wpfb-active-color"
							>
								<ColorPalette
									value={ activeColor || '' }
									onChange={ ( value ) =>
										setAttributes( { activeColor: value ?? '' } )
									}
								/>
							</BaseControl>
							<BaseControl
								label={ __( 'Highlight Text Color', 'wpframeblocks' ) }
								id="wpfb-active-text-color"
							>
								<ColorPalette
									value={ activeTextColor || '' }
									onChange={ ( value ) =>
										setAttributes( { activeTextColor: value ?? '' } )
									}
								/>
							</BaseControl>
						</>
					) }
					{ itemType === 'folder' && (
						<ToggleControl
							label={ __( 'Open (expanded arrow)', 'wpframeblocks' ) }
							checked={ isOpen }
							onChange={ ( value ) =>
								setAttributes( { isOpen: value } )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>

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
						width: fs ? `calc(${ fs } + 0.2em)` : undefined,
						lineHeight: lh,
					} }
				/>
				<span
					className="wp-block-frames-file-tree__label"
					style={ { fontSize: fs, lineHeight: lh } }
				>
					{ `${ label }${ itemType === 'file' && fileExt ? '.' + fileExt : '' }` }
				</span>
			</div>
		</>
	);
}

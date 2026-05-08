import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useBlockProps, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	RangeControl,
	ToggleControl,
	BaseControl,
} from '@wordpress/components';
import { TypographyPanel, ResponsiveControls } from '@wpfb/components';
import { FrameIcon } from '@wpfb/frame-components';
import { buildResponsiveStyles, useDeviceType, getTreeItemIcon } from '@wpfb/helpers';

export default function Edit( { attributes, setAttributes } ) {
	const { typography, label, itemType, depth, isActive, isOpen, fileExt, activeColor, activeTextColor } = attributes;
	const [typographyView, setTypographyView] = useState('desktop');
	const deviceType = useDeviceType();

	const { iconFA, iconMod } = getTreeItemIcon( itemType, fileExt, isOpen );

	const arrowFA =
		itemType === 'folder'
			? isOpen
				? 'fa-solid fa-chevron-down'
				: 'fa-solid fa-chevron-right'
			: 'fa-solid fa-angle-right';

	const resolvedStyle = buildResponsiveStyles(attributes, deviceType);
	const fs = resolvedStyle.fontSize || undefined;
	const lh = resolvedStyle.lineHeight || undefined;

	const blockProps = useBlockProps( {
		className: [
			'wp-block-frames-file-tree__item',
			`wp-block-frames-file-tree__item--depth-${ depth }`,
			isActive ? 'wp-block-frames-file-tree__item--active' : '',
		]
			.filter( Boolean )
			.join( ' ' ),
		style: {
			...resolvedStyle,
			...( isActive && activeColor ? { '--frames-file-tree-active-bg': activeColor } : {} ),
			...( isActive && activeTextColor ? { color: activeTextColor } : {} ),
		},
	} );

	return (
		<>
			<InspectorControls>
				<ResponsiveControls
					panelTitle={ __( 'Typography', 'frame-blocks' ) }
					view={ typographyView }
					handleView={ setTypographyView }
				>
					<TypographyPanel
						group={ typography }
						setAttributes={ setAttributes }
						enabled={ true }
						view={ typographyView }
					/>
				</ResponsiveControls>
				<PanelBody title={ __( 'Item Settings', 'frame-blocks' ) }>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Label', 'frame-blocks' ) }
						value={ label }
						onChange={ ( value ) => setAttributes( { label: value } ) }
					/>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Type', 'frame-blocks' ) }
						value={ itemType }
						options={ [
							{ label: __( 'File', 'frame-blocks' ), value: 'file' },
							{ label: __( 'Folder', 'frame-blocks' ), value: 'folder' },
						] }
						onChange={ ( value ) => setAttributes( { itemType: value } ) }
					/>
					{ itemType === 'file' && (
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ __( 'File extension', 'frame-blocks' ) }
							value={ fileExt }
							placeholder="ts"
							help={ __(
								'e.g. ts, tsx, js, jsx, php, css, html',
								'frame-blocks'
							) }
							onChange={ ( value ) =>
								setAttributes( { fileExt: value } )
							}
						/>
					) }
					<RangeControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Depth', 'frame-blocks' ) }
						value={ depth }
						min={ 0 }
						max={ 9 }
						onChange={ ( value ) => setAttributes( { depth: value } ) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Active (highlighted row)', 'frame-blocks' ) }
						checked={ isActive }
						onChange={ ( value ) => setAttributes( { isActive: value } ) }
					/>
					{ isActive && (
						<>
							<BaseControl
								__nextHasNoMarginBottom
								label={ __( 'Highlight Color', 'frame-blocks' ) }
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
								__nextHasNoMarginBottom
								label={ __( 'Highlight Text Color', 'frame-blocks' ) }
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
							__nextHasNoMarginBottom
							label={ __( 'Open (expanded arrow)', 'frame-blocks' ) }
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

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	PanelBody,
	RangeControl,
	SelectControl,
	TextareaControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { SpacingPanel, BorderPanel, AppendBlockButton, ResponsiveControls } from '@wpfb/components';
import { SocialPostTemplate, FrameIcon } from '@wpfb/frame-components';
import { buildResponsiveStyles, useDeviceType } from '@wpfb/helpers';
import './editor.scss';

const ALLOWED_COMMENT_BLOCKS = [ 'frameblocks/social-comment' ];

function SocialImageUpload( {
	imageUrl,
	imageAlt,
	imageId,
	onSelect,
	containerClassName,
} ) {
	return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={ onSelect }
				allowedTypes={ [ 'image' ] }
				value={ imageId || undefined }
				render={ ( { open } ) => (
					<div className={ containerClassName }>
						{ imageUrl ? (
							<>
								<img src={ imageUrl } alt={ imageAlt } />
								<button
									className="wp-block-frames-social__image-edit"
									onClick={ open }
								>
									{ __( 'Change Image', 'frame-blocks' ) }
								</button>
							</>
						) : (
							<button
								className="wp-block-frames-social__image-placeholder"
								onClick={ open }
							>
								<FrameIcon iconClass="fa-regular fa-image" />
								<span>{ __( 'Upload Image', 'frame-blocks' ) }</span>
							</button>
						) }
					</div>
				) }
			/>
		</MediaUploadCheck>
	);
}


export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		platform,
		variant,
		username,
		likesCount,
		timestamp,
		pageSubtitle,
		postText,
		reactionsCount,
		commentsCount,
		imageUrl,
		imageAlt,
		imageId,
		avatarUrl,
		avatarId,
		maxWidth,
		isVerified,
		isLiked,
		spacing,
		border,
	} = attributes;

	const [spacingView, setSpacingView] = useState('desktop');
	const [borderView, setBorderView] = useState('desktop');
	const deviceType = useDeviceType();

	const isInstagram = platform === 'instagram';
	const blockClassName = isInstagram
		? `wp-block-frames-social wp-block-frames-ig wp-block-frames-ig--${ variant }`
		: `wp-block-frames-social wp-block-frames-fb wp-block-frames-fb--${ variant }`;

	const blockProps = useBlockProps( {
		className: blockClassName,
		style: {
			...buildResponsiveStyles( attributes, deviceType ),
			maxWidth: `${ maxWidth }px`,
		},
	} );

	const widthMax = isInstagram ? 614 : 680;
	const handlePlatformChange = ( nextPlatform ) => {
		setAttributes( { platform: nextPlatform } );
	};

	return (
		<>
			<InspectorControls>
				<ResponsiveControls
					panelTitle={ __( 'Spacing', 'frame-blocks' ) }
					view={ spacingView }
					handleView={ setSpacingView }
				>
					<SpacingPanel
						group={ spacing }
						setAttributes={ setAttributes }
						enabled={ true }
						view={ spacingView }
					/>
				</ResponsiveControls>
				<ResponsiveControls
					panelTitle={ __( 'Border', 'frame-blocks' ) }
					view={ borderView }
					handleView={ setBorderView }
				>
					<BorderPanel
						group={ border }
						setAttributes={ setAttributes }
						enabled={ true }
						view={ borderView }
					/>
				</ResponsiveControls>
				<PanelBody title={ __( 'Post Settings', 'frame-blocks' ) }>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Platform', 'frame-blocks' ) }
						value={ platform }
						options={ [
							{ label: __( 'Instagram', 'frame-blocks' ), value: 'instagram' },
							{ label: __( 'Facebook', 'frame-blocks' ), value: 'facebook' },
						] }
						onChange={ handlePlatformChange }
					/>
					<RangeControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Width (px)', 'frame-blocks' ) }
						value={ maxWidth }
						min={ 280 }
						max={ widthMax }
						step={ 1 }
						onChange={ ( value ) => setAttributes( { maxWidth: value } ) }
					/>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Theme', 'frame-blocks' ) }
						value={ variant }
						options={ [
							{ label: __( 'Dark', 'frame-blocks' ), value: 'dark' },
							{ label: __( 'Light', 'frame-blocks' ), value: 'light' },
						] }
						onChange={ ( value ) => setAttributes( { variant: value } ) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={
							isInstagram
								? __( 'Verified account', 'frame-blocks' )
								: __( 'Verified page', 'frame-blocks' )
						}
						checked={ isVerified }
						onChange={ ( value ) => setAttributes( { isVerified: value } ) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Post liked', 'frame-blocks' ) }
						checked={ isLiked }
						onChange={ ( value ) => setAttributes( { isLiked: value } ) }
					/>
					<BaseControl
						__nextHasNoMarginBottom
						label={ __( 'Profile photo', 'frame-blocks' ) }
						id="wpfb-social-avatar-upload"
					>
						<div className="wp-block-frames-social__avatar-controls">
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) =>
										setAttributes( {
											avatarUrl: media.url,
											avatarId: media.id,
										} )
									}
									allowedTypes={ [ 'image' ] }
									value={ avatarId || undefined }
									render={ ( { open } ) => (
										<Button
											id="wpfb-social-avatar-upload"
											onClick={ open }
											variant="secondary"
											size="small"
										>
											{ avatarUrl
												? __( 'Change photo', 'frame-blocks' )
												: __( 'Upload photo', 'frame-blocks' ) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
							{ avatarUrl && (
								<Button
									variant="link"
									isDestructive
									size="small"
									onClick={ () =>
										setAttributes( {
											avatarUrl: '',
											avatarId: 0,
										} )
									}
								>
									{ __( 'Remove', 'frame-blocks' ) }
								</Button>
							) }
						</div>
					</BaseControl>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={
							isInstagram
								? __( 'Username', 'frame-blocks' )
								: __( 'Page / Name', 'frame-blocks' )
						}
						value={ username }
						onChange={ ( value ) => setAttributes( { username: value } ) }
					/>

					{ isInstagram ? (
						<>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={ __( 'Likes', 'frame-blocks' ) }
								value={ likesCount }
								placeholder="1,234 likes"
								onChange={ ( value ) => setAttributes( { likesCount: value } ) }
							/>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={ __( 'Timestamp', 'frame-blocks' ) }
								value={ timestamp }
								placeholder="2 days ago"
								onChange={ ( value ) => setAttributes( { timestamp: value } ) }
							/>
							<TextareaControl
								__nextHasNoMarginBottom
								label={ __( 'Post text', 'frame-blocks' ) }
								help={ __(
									'#hashtags and @mentions are highlighted automatically.',
									'frame-blocks'
								) }
								value={ postText }
								onChange={ ( value ) => setAttributes( { postText: value } ) }
							/>
						</>
					) : (
						<>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={ __( 'Subtitle', 'frame-blocks' ) }
								value={ pageSubtitle }
								placeholder="2 hrs - Public"
								help={ __(
									'Shown under the page name (time, audience icon, etc.).',
									'frame-blocks'
								) }
								onChange={ ( value ) => setAttributes( { pageSubtitle: value } ) }
							/>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={ __( 'Reactions count', 'frame-blocks' ) }
								value={ reactionsCount }
								placeholder="1,234"
								onChange={ ( value ) =>
									setAttributes( { reactionsCount: value } )
								}
							/>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={ __( 'Comments count', 'frame-blocks' ) }
								value={ commentsCount }
								placeholder="56 comments"
								onChange={ ( value ) =>
									setAttributes( { commentsCount: value } )
								}
							/>
							<TextareaControl
								__nextHasNoMarginBottom
								label={ __( 'Post text', 'frame-blocks' ) }
								help={ __(
									'#hashtags and @mentions are highlighted automatically.',
									'frame-blocks'
								) }
								value={ postText }
								onChange={ ( value ) => setAttributes( { postText: value } ) }
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<SocialPostTemplate
					isInstagram={ isInstagram }
					username={ username }
					pageSubtitle={ pageSubtitle }
					avatarUrl={ avatarUrl }
					isVerified={ isVerified }
					postText={ postText }
					likesCount={ likesCount }
					reactionsCount={ reactionsCount }
					commentsCount={ commentsCount }
					isLiked={ isLiked }
					timestamp={ timestamp }
					verifiedLabel={ __( 'Verified', 'frame-blocks' ) }
					textPlaceholder={ __( 'Write text...', 'frame-blocks' ) }
					actionLabels={ {
						like: __( 'Like', 'frame-blocks' ),
						comment: __( 'Comment', 'frame-blocks' ),
						share: __( 'Share', 'frame-blocks' ),
					} }
					renderMedia={ ( instagramMode ) => (
						<SocialImageUpload
							imageUrl={ imageUrl }
							imageAlt={ imageAlt }
							imageId={ imageId }
							onSelect={ ( media ) =>
								setAttributes( {
									imageUrl: media.url,
									imageAlt: media.alt || '',
									imageId: media.id,
								} )
							}
							containerClassName={
								instagramMode
									? 'wp-block-frames-ig__image'
									: 'wp-block-frames-fb__image'
							}
						/>
					) }
					renderComments={ () => (
						<>
							<InnerBlocks
								allowedBlocks={ ALLOWED_COMMENT_BLOCKS }
								renderAppender={ false }
							/>
							<AppendBlockButton
								blockName="frameblocks/social-comment"
								blockAttributes={ {} }
								clientId={ clientId }
								className="wp-block-frames-social__add-comment"
								tooltipLabel={ __( 'Add comment', 'frame-blocks' ) }
								buttonText={ __( 'Add comment', 'frame-blocks' ) }
							/>
						</>
					) }
				/>
			</div>
		</>
	);
}

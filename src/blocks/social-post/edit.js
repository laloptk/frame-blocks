import { __ } from '@wordpress/i18n';
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
import {
	StyleControls,
	AppendBlockButton,
} from '@wpfb/components';
import { SocialPostTemplate, FrameIcon } from '@wpfb/frame-components';
import { buildInlineStyle } from '@wpfb/helpers';
import './editor.scss';

const ALLOWED_COMMENT_BLOCKS = [ 'wpframeblocks/social-comment' ];

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
									{ __( 'Change Image', 'wpframeblocks' ) }
								</button>
							</>
						) : (
							<button
								className="wp-block-frames-social__image-placeholder"
								onClick={ open }
							>
								<FrameIcon iconClass="fa-regular fa-image" />
								<span>{ __( 'Upload Image', 'wpframeblocks' ) }</span>
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
	} = attributes;

	const isInstagram = platform === 'instagram';
	const blockClassName = isInstagram
		? `wp-block-frames-social wp-block-frames-ig wp-block-frames-ig--${ variant }`
		: `wp-block-frames-social wp-block-frames-fb wp-block-frames-fb--${ variant }`;

	const blockProps = useBlockProps( {
		className: blockClassName,
		style: {
			...buildInlineStyle( attributes ),
			maxWidth: `${ maxWidth }px`,
		},
	} );

	const widthMax = isInstagram ? 614 : 680;
	const handlePlatformChange = ( nextPlatform ) => {
		setAttributes( { platform: nextPlatform } );
	};

	return (
		<>
			<StyleControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				enable={ { spacing: true, border: true } }
			/>
			<InspectorControls>
				<PanelBody title={ __( 'Post Settings', 'wpframeblocks' ) }>
					<SelectControl
						label={ __( 'Platform', 'wpframeblocks' ) }
						value={ platform }
						options={ [
							{ label: __( 'Instagram', 'wpframeblocks' ), value: 'instagram' },
							{ label: __( 'Facebook', 'wpframeblocks' ), value: 'facebook' },
						] }
						onChange={ handlePlatformChange }
					/>
					<RangeControl
						label={ __( 'Width (px)', 'wpframeblocks' ) }
						value={ maxWidth }
						min={ 280 }
						max={ widthMax }
						step={ 1 }
						onChange={ ( value ) => setAttributes( { maxWidth: value } ) }
					/>
					<SelectControl
						label={ __( 'Theme', 'wpframeblocks' ) }
						value={ variant }
						options={ [
							{ label: __( 'Dark', 'wpframeblocks' ), value: 'dark' },
							{ label: __( 'Light', 'wpframeblocks' ), value: 'light' },
						] }
						onChange={ ( value ) => setAttributes( { variant: value } ) }
					/>
					<ToggleControl
						label={
							isInstagram
								? __( 'Verified account', 'wpframeblocks' )
								: __( 'Verified page', 'wpframeblocks' )
						}
						checked={ isVerified }
						onChange={ ( value ) => setAttributes( { isVerified: value } ) }
					/>
					<ToggleControl
						label={ __( 'Post liked', 'wpframeblocks' ) }
						checked={ isLiked }
						onChange={ ( value ) => setAttributes( { isLiked: value } ) }
					/>
					<BaseControl
						label={ __( 'Profile photo', 'wpframeblocks' ) }
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
												? __( 'Change photo', 'wpframeblocks' )
												: __( 'Upload photo', 'wpframeblocks' ) }
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
									{ __( 'Remove', 'wpframeblocks' ) }
								</Button>
							) }
						</div>
					</BaseControl>
					<TextControl
						label={
							isInstagram
								? __( 'Username', 'wpframeblocks' )
								: __( 'Page / Name', 'wpframeblocks' )
						}
						value={ username }
						onChange={ ( value ) => setAttributes( { username: value } ) }
					/>

					{ isInstagram ? (
						<>
							<TextControl
								label={ __( 'Likes', 'wpframeblocks' ) }
								value={ likesCount }
								placeholder="1,234 likes"
								onChange={ ( value ) => setAttributes( { likesCount: value } ) }
							/>
							<TextControl
								label={ __( 'Timestamp', 'wpframeblocks' ) }
								value={ timestamp }
								placeholder="2 days ago"
								onChange={ ( value ) => setAttributes( { timestamp: value } ) }
							/>
							<TextareaControl
								label={ __( 'Post text', 'wpframeblocks' ) }
								help={ __(
									'#hashtags and @mentions are highlighted automatically.',
									'wpframeblocks'
								) }
								value={ postText }
								onChange={ ( value ) => setAttributes( { postText: value } ) }
							/>
						</>
					) : (
						<>
							<TextControl
								label={ __( 'Subtitle', 'wpframeblocks' ) }
								value={ pageSubtitle }
								placeholder="2 hrs - Public"
								help={ __(
									'Shown under the page name (time, audience icon, etc.).',
									'wpframeblocks'
								) }
								onChange={ ( value ) => setAttributes( { pageSubtitle: value } ) }
							/>
							<TextControl
								label={ __( 'Reactions count', 'wpframeblocks' ) }
								value={ reactionsCount }
								placeholder="1,234"
								onChange={ ( value ) =>
									setAttributes( { reactionsCount: value } )
								}
							/>
							<TextControl
								label={ __( 'Comments count', 'wpframeblocks' ) }
								value={ commentsCount }
								placeholder="56 comments"
								onChange={ ( value ) =>
									setAttributes( { commentsCount: value } )
								}
							/>
							<TextareaControl
								label={ __( 'Post text', 'wpframeblocks' ) }
								help={ __(
									'#hashtags and @mentions are highlighted automatically.',
									'wpframeblocks'
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
					verifiedLabel={ __( 'Verified', 'wpframeblocks' ) }
					textPlaceholder={ __( 'Write text...', 'wpframeblocks' ) }
					actionLabels={ {
						like: __( 'Like', 'wpframeblocks' ),
						comment: __( 'Comment', 'wpframeblocks' ),
						share: __( 'Share', 'wpframeblocks' ),
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
								blockName="wpframeblocks/social-comment"
								blockAttributes={ {} }
								clientId={ clientId }
								className="wp-block-frames-social__add-comment"
								tooltipLabel={ __( 'Add comment', 'wpframeblocks' ) }
								buttonText={ __( 'Add comment', 'wpframeblocks' ) }
							/>
						</>
					) }
				/>
			</div>
		</>
	);
}

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
import { StyleControls, AppendBlockButton } from '@wpfb/components';
import { buildInlineStyle, parseCaptionSegments } from '@wpfb/helpers';
import './editor.scss';

const ALLOWED_COMMENT_BLOCKS = [ 'wpframeblocks/social-comment' ];

function SegmentedText( { text, classPrefix } ) {
	const segments = parseCaptionSegments( text );
	if ( ! segments.length ) return null;
	const lines = [ [] ];

	segments.forEach( ( seg ) => {
		if ( seg.type === 'linebreak' ) {
			lines.push( [] );
			return;
		}
		lines[ lines.length - 1 ].push( seg );
	} );

	return (
		<>
			{ lines.map( ( line, lineIndex ) => {
				return (
					<p key={ lineIndex } className={ `${ classPrefix }line` }>
						{ line.map( ( seg, segIndex ) => {
							const key = `${ lineIndex }-${ segIndex }`;
							if ( seg.type === 'plain' ) return seg.text;
							if ( seg.type === 'url' ) {
								const href = seg.text.startsWith( 'www.' )
									? `https://${ seg.text }`
									: seg.text;
								return (
									<a
										key={ key }
										className={ `${ classPrefix }url` }
										href={ href }
										target="_blank"
										rel="noopener noreferrer"
									>
										{ seg.text }
									</a>
								);
							}
							return (
								<span key={ key } className={ `${ classPrefix }${ seg.type }` }>
									{ seg.text }
								</span>
							);
						} ) }
					</p>
				);
			} ) }
		</>
	);
}

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
								<i className="fa-regular fa-image"></i>
								<span>{ __( 'Upload Image', 'wpframeblocks' ) }</span>
							</button>
						) }
					</div>
				) }
			/>
		</MediaUploadCheck>
	);
}

function SocialTextSection( {
	isInstagram,
	username,
	isVerified,
	caption,
	postText,
} ) {
	if ( isInstagram ) {
		return (
			<div className="wp-block-frames-social__text-area wp-block-frames-ig__caption">
				<span className="wp-block-frames-ig__cap-user">{ username }</span>
				{ isVerified && (
					<i
						className="fa-solid fa-circle-check wp-block-frames-ig__verified wp-block-frames-ig__verified--inline"
						aria-hidden="true"
					></i>
				) }{ ' ' }
				{ caption ? (
					<div className="wp-block-frames-ig__cap-text">
						<SegmentedText text={ caption } classPrefix="wp-block-frames-ig__cap-" />
					</div>
				) : (
					<span className="wp-block-frames-social__cap-placeholder">
						{ __( 'Write a caption...', 'wpframeblocks' ) }
					</span>
				) }
			</div>
		);
	}

	return postText ? (
		<div className="wp-block-frames-social__text-area wp-block-frames-fb__body">
			<SegmentedText text={ postText } classPrefix="wp-block-frames-fb__text-" />
		</div>
	) : (
		<div className="wp-block-frames-social__text-area wp-block-frames-fb__body wp-block-frames-social__body-placeholder">
			{ __( 'Write post text...', 'wpframeblocks' ) }
		</div>
	);
}

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		platform,
		variant,
		username,
		likesCount,
		caption,
		timestamp,
		pageName,
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

	const avatarLetter = pageName ? pageName.charAt( 0 ).toUpperCase() : '?';
	const widthMax = isInstagram ? 614 : 680;
	const handlePlatformChange = ( nextPlatform ) => {
		const nextAttributes = { platform: nextPlatform };

		// Preserve authored text when switching between social networks.
		if ( nextPlatform === 'facebook' && ! postText && caption ) {
			nextAttributes.postText = caption;
		}

		if ( nextPlatform === 'instagram' && ! caption && postText ) {
			nextAttributes.caption = postText;
		}

		setAttributes( nextAttributes );
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

					{ isInstagram ? (
						<>
							<TextControl
								label={ __( 'Username', 'wpframeblocks' ) }
								value={ username }
								onChange={ ( value ) => setAttributes( { username: value } ) }
							/>
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
								label={ __( 'Caption', 'wpframeblocks' ) }
								help={ __(
									'Use #hashtags and @mentions. They are highlighted automatically.',
									'wpframeblocks'
								) }
								value={ caption }
								onChange={ ( value ) => setAttributes( { caption: value } ) }
							/>
						</>
					) : (
						<>
							<TextControl
								label={ __( 'Page / Name', 'wpframeblocks' ) }
								value={ pageName }
								onChange={ ( value ) => setAttributes( { pageName: value } ) }
							/>
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
				<div className="wp-block-frames-social__section wp-block-frames-social__section--header">
					{ isInstagram ? (
						<div className="wp-block-frames-ig__header">
							<div className="wp-block-frames-ig__user-row">
								<div className="wp-block-frames-ig__avatar-ring">
									<div className="wp-block-frames-ig__avatar-inner">
										<div
											className="wp-block-frames-ig__avatar-img"
											style={
												avatarUrl
													? { backgroundImage: `url(${ avatarUrl })` }
													: undefined
											}
										>
											{ ! avatarUrl && <i className="fa-solid fa-user"></i> }
										</div>
									</div>
								</div>
								<div className="wp-block-frames-ig__user-info">
									<div className="wp-block-frames-ig__username-row">
										<span className="wp-block-frames-ig__username">{ username }</span>
										{ isVerified && (
											<i
												className="fa-solid fa-circle-check wp-block-frames-ig__verified"
												aria-label={ __( 'Verified', 'wpframeblocks' ) }
											></i>
										) }
									</div>
								</div>
							</div>
							<div className="wp-block-frames-ig__more-btn" aria-hidden="true">
								<i className="fa-solid fa-ellipsis"></i>
							</div>
						</div>
					) : (
						<div className="wp-block-frames-fb__header">
							<div className="wp-block-frames-fb__user-row">
								<div
									className="wp-block-frames-fb__avatar"
									style={
										avatarUrl
											? { backgroundImage: `url(${ avatarUrl })` }
											: undefined
									}
								>
									{ ! avatarUrl && avatarLetter }
								</div>
								<div className="wp-block-frames-fb__meta">
									<div className="wp-block-frames-fb__name-row">
										<span className="wp-block-frames-fb__name">{ pageName }</span>
										{ isVerified && (
											<i
												className="fa-solid fa-circle-check wp-block-frames-fb__verified"
												aria-label={ __( 'Verified', 'wpframeblocks' ) }
											></i>
										) }
									</div>
									<span className="wp-block-frames-fb__subtitle">{ pageSubtitle }</span>
								</div>
							</div>
							<div className="wp-block-frames-fb__more-btn" aria-hidden="true">
								<i className="fa-solid fa-ellipsis"></i>
							</div>
						</div>
					) }
				</div>

				<div className="wp-block-frames-social__section wp-block-frames-social__section--text">
					<SocialTextSection
						isInstagram={ isInstagram }
						username={ username }
						isVerified={ isVerified }
						caption={ caption }
						postText={ postText }
					/>
				</div>

				<div className="wp-block-frames-social__section wp-block-frames-social__section--media">
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
							isInstagram ? 'wp-block-frames-ig__image' : 'wp-block-frames-fb__image'
						}
					/>
				</div>

				<div className="wp-block-frames-social__section wp-block-frames-social__section--engagement">
					{ isInstagram ? (
						<div className="wp-block-frames-ig__likes">{ likesCount }</div>
					) : (
						<div className="wp-block-frames-fb__reactions-row" aria-hidden="true">
							<div className="wp-block-frames-fb__reactions-left">
								<div className="wp-block-frames-fb__reaction-icons">
									<div className="wp-block-frames-fb__react-emoji wp-block-frames-fb__react-emoji--like">
										<i className="fa-solid fa-thumbs-up"></i>
									</div>
									<div className="wp-block-frames-fb__react-emoji wp-block-frames-fb__react-emoji--love">
										<i className="fa-solid fa-heart"></i>
									</div>
									<div className="wp-block-frames-fb__react-emoji wp-block-frames-fb__react-emoji--care">
										<span aria-hidden="true">&#129303;</span>
									</div>
								</div>
								<span className="wp-block-frames-fb__reactions-text">{ reactionsCount }</span>
							</div>
							<span className="wp-block-frames-fb__comments-count">{ commentsCount }</span>
						</div>
					) }
				</div>

				<div className="wp-block-frames-social__section wp-block-frames-social__section--primary-actions">
					{ isInstagram ? (
						<div className="wp-block-frames-ig__actions" aria-hidden="true">
							<div className="wp-block-frames-ig__actions-left">
								<span className="wp-block-frames-ig__action-btn">
									<i
										className={
											isLiked
												? 'fa-solid fa-heart wp-block-frames-ig__heart--liked'
												: 'fa-regular fa-heart'
										}
									></i>
								</span>
								<span className="wp-block-frames-ig__action-btn">
									<i className="fa-regular fa-comment"></i>
								</span>
								<span className="wp-block-frames-ig__action-btn">
									<i className="fa-regular fa-paper-plane"></i>
								</span>
							</div>
							<span className="wp-block-frames-ig__bookmark">
								<i className="fa-regular fa-bookmark"></i>
							</span>
						</div>
					) : (
						<div className="wp-block-frames-fb__actions" aria-hidden="true">
							<span className="wp-block-frames-fb__action-btn">
								<i
									className={
										isLiked
											? 'fa-solid fa-thumbs-up wp-block-frames-fb__thumb--liked'
											: 'fa-regular fa-thumbs-up'
									}
								></i>
								<span>{ __( 'Like', 'wpframeblocks' ) }</span>
							</span>
							<span className="wp-block-frames-fb__action-btn">
								<i className="fa-regular fa-comment"></i>
								<span>{ __( 'Comment', 'wpframeblocks' ) }</span>
							</span>
							<span className="wp-block-frames-fb__action-btn">
								<i className="fa-solid fa-share-nodes"></i>
								<span>{ __( 'Share', 'wpframeblocks' ) }</span>
							</span>
						</div>
					) }
				</div>

				{ isInstagram && (
					<div className="wp-block-frames-social__section wp-block-frames-social__section--timestamp">
						<div className="wp-block-frames-ig__timestamp">{ timestamp }</div>
					</div>
				) }

				<div className="wp-block-frames-social__section wp-block-frames-social__section--comments">
					<div className="wp-block-frames-social__comments">
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
					</div>
				</div>
			</div>
		</>
	);
}

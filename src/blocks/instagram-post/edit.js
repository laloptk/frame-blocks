import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
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
import { StyleControls } from '@wpfb/components';
import { buildInlineStyle, parseCaptionSegments } from '@wpfb/helpers';
import './editor.scss';

/** Render parsed caption segments as highlighted JSX (editor preview). */
function CaptionText( { text } ) {
	const segments = parseCaptionSegments( text );
	if ( ! segments.length ) return null;
	return (
		<>
			{ segments.map( ( seg, i ) => {
				if ( seg.type === 'plain' ) return seg.text;
				return (
					<span
						key={ i }
						className={ `wp-block-frames-ig__cap-${ seg.type }` }
					>
						{ seg.text }
					</span>
				);
			} ) }
		</>
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const {
		variant,
		username,
		likesCount,
		caption,
		timestamp,
		imageUrl,
		imageAlt,
		imageId,
		avatarUrl,
		avatarId,
		maxWidth,
		isVerified,
		isLiked,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `wp-block-frames-ig wp-block-frames-ig--${ variant }`,
		style: {
			...buildInlineStyle( attributes ),
			maxWidth: `${ maxWidth }px`,
		},
	} );

	return (
		<>
			<StyleControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				enable={ { spacing: true, border: true } }
			/>
			<InspectorControls>
				<PanelBody title={ __( 'Post Settings', 'wpframeblocks' ) }>
					<RangeControl
						label={ __( 'Width (px)', 'wpframeblocks' ) }
						value={ maxWidth }
						min={ 280 }
						max={ 614 }
						step={ 1 }
						onChange={ ( value ) =>
							setAttributes( { maxWidth: value } )
						}
					/>
					<SelectControl
						label={ __( 'Variant', 'wpframeblocks' ) }
						value={ variant }
						options={ [
							{
								label: __( 'Dark', 'wpframeblocks' ),
								value: 'dark',
							},
							{
								label: __( 'Light', 'wpframeblocks' ),
								value: 'light',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { variant: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Verified account', 'wpframeblocks' ) }
						checked={ isVerified }
						onChange={ ( value ) =>
							setAttributes( { isVerified: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Post liked', 'wpframeblocks' ) }
						checked={ isLiked }
						onChange={ ( value ) =>
							setAttributes( { isLiked: value } )
						}
					/>
					<BaseControl
						label={ __( 'Profile photo', 'wpframeblocks' ) }
						id="wpfb-avatar-upload"
					>
						<div className="wp-block-frames-ig__avatar-controls">
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
											id="wpfb-avatar-upload"
											onClick={ open }
											variant="secondary"
											size="small"
										>
											{ avatarUrl
												? __(
														'Change photo',
														'wpframeblocks'
												  )
												: __(
														'Upload photo',
														'wpframeblocks'
												  ) }
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
						label={ __( 'Username', 'wpframeblocks' ) }
						value={ username }
						onChange={ ( value ) =>
							setAttributes( { username: value } )
						}
					/>
					<TextControl
						label={ __( 'Likes', 'wpframeblocks' ) }
						value={ likesCount }
						placeholder="1,234 likes"
						onChange={ ( value ) =>
							setAttributes( { likesCount: value } )
						}
					/>
					<TextControl
						label={ __( 'Timestamp', 'wpframeblocks' ) }
						value={ timestamp }
						placeholder="2 days ago"
						onChange={ ( value ) =>
							setAttributes( { timestamp: value } )
						}
					/>
					<TextareaControl
						label={ __( 'Caption', 'wpframeblocks' ) }
						help={ __(
							'Use #hashtags and @mentions — they are highlighted automatically.',
							'wpframeblocks'
						) }
						value={ caption }
						onChange={ ( value ) =>
							setAttributes( { caption: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ /* ── Header ── */ }
				<div className="wp-block-frames-ig__header">
					<div className="wp-block-frames-ig__user-row">
						<div className="wp-block-frames-ig__avatar-ring">
							<div className="wp-block-frames-ig__avatar-inner">
								<div
								className="wp-block-frames-ig__avatar-img"
								style={
									avatarUrl
										? {
												backgroundImage: `url(${ avatarUrl })`,
										  }
										: undefined
								}
							>
								{ ! avatarUrl && (
									<i className="fa-solid fa-user"></i>
								) }
							</div>
							</div>
						</div>
						<div className="wp-block-frames-ig__user-info">
							<div className="wp-block-frames-ig__username-row">
								<span className="wp-block-frames-ig__username">
									{ username }
								</span>
								{ isVerified && (
									<i
										className="fa-solid fa-circle-check wp-block-frames-ig__verified"
										aria-label={ __(
											'Verified',
											'wpframeblocks'
										) }
									></i>
								) }
							</div>
						</div>
					</div>
					<div
						className="wp-block-frames-ig__more-btn"
						aria-hidden="true"
					>
						<i className="fa-solid fa-ellipsis"></i>
					</div>
				</div>

				{ /* ── Post image ── */ }
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ ( media ) =>
							setAttributes( {
								imageUrl: media.url,
								imageAlt: media.alt || '',
								imageId: media.id,
							} )
						}
						allowedTypes={ [ 'image' ] }
						value={ imageId || undefined }
						render={ ( { open } ) => (
							<div className="wp-block-frames-ig__image">
								{ imageUrl ? (
									<>
										<img
											src={ imageUrl }
											alt={ imageAlt }
										/>
										<button
											className="wp-block-frames-ig__image-edit"
											onClick={ open }
										>
											{ __(
												'Change Image',
												'wpframeblocks'
											) }
										</button>
									</>
								) : (
									<button
										className="wp-block-frames-ig__image-placeholder"
										onClick={ open }
									>
										<i className="fa-regular fa-image"></i>
										<span>
											{ __(
												'Upload Image',
												'wpframeblocks'
											) }
										</span>
									</button>
								) }
							</div>
						) }
					/>
				</MediaUploadCheck>

				{ /* ── Actions ── */ }
				<div
					className="wp-block-frames-ig__actions"
					aria-hidden="true"
				>
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

				{ /* ── Likes ── */ }
				<div className="wp-block-frames-ig__likes">{ likesCount }</div>

				{ /* ── Caption ── */ }
				<div className="wp-block-frames-ig__caption">
					<span className="wp-block-frames-ig__cap-user">
						{ username }
					</span>
					{ isVerified && (
						<i
							className="fa-solid fa-circle-check wp-block-frames-ig__verified wp-block-frames-ig__verified--inline"
							aria-hidden="true"
						></i>
					) }{ ' ' }
					{ caption ? (
						<span className="wp-block-frames-ig__cap-text">
							<CaptionText text={ caption } />
						</span>
					) : (
						<span className="wp-block-frames-ig__cap-placeholder">
							{ __( 'Write a caption…', 'wpframeblocks' ) }
						</span>
					) }
				</div>

				{ /* ── Timestamp ── */ }
				<div className="wp-block-frames-ig__timestamp">
					{ timestamp }
				</div>
			</div>
		</>
	);
}

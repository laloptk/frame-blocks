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
	TextareaControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { StyleControls } from '@wpfb/components';
import { buildInlineStyle, parseCaptionSegments } from '@wpfb/helpers';

import './editor.scss';

/** Render parsed post text with highlighted #tags and @mentions. */
function PostText( { text } ) {
	const segments = parseCaptionSegments( text );
	if ( ! segments.length ) return null;
	return (
		<>
			{ segments.map( ( seg, i ) => {
				if ( seg.type === 'plain' ) return seg.text;
				return (
					<span
						key={ i }
						className={ `wp-block-frames-fb__text-${ seg.type }` }
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
		isVerified,
		isLiked,
		maxWidth,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'wp-block-frames-fb',
		style: {
			...buildInlineStyle( attributes ),
			maxWidth: `${ maxWidth }px`,
		},
	} );

	const avatarLetter = pageName ? pageName.charAt( 0 ).toUpperCase() : '?';

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
						max={ 680 }
						step={ 1 }
						onChange={ ( value ) =>
							setAttributes( { maxWidth: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Verified page', 'wpframeblocks' ) }
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
						id="wpfb-fb-avatar-upload"
					>
						<div className="wp-block-frames-fb__avatar-controls">
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
											id="wpfb-fb-avatar-upload"
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
						label={ __( 'Page / Name', 'wpframeblocks' ) }
						value={ pageName }
						onChange={ ( value ) =>
							setAttributes( { pageName: value } )
						}
					/>
					<TextControl
						label={ __( 'Subtitle', 'wpframeblocks' ) }
						value={ pageSubtitle }
						placeholder="2 hrs · 🌍"
						help={ __(
							'Shown under the page name (time, audience icon, etc.).',
							'wpframeblocks'
						) }
						onChange={ ( value ) =>
							setAttributes( { pageSubtitle: value } )
						}
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
						onChange={ ( value ) =>
							setAttributes( { postText: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ /* ── Header ── */ }
				<div className="wp-block-frames-fb__header">
					<div className="wp-block-frames-fb__user-row">
						<div
							className="wp-block-frames-fb__avatar"
							style={
								avatarUrl
									? {
											backgroundImage: `url(${ avatarUrl })`,
									  }
									: undefined
							}
						>
							{ ! avatarUrl && avatarLetter }
						</div>
						<div className="wp-block-frames-fb__meta">
							<div className="wp-block-frames-fb__name-row">
								<span className="wp-block-frames-fb__name">
									{ pageName }
								</span>
								{ isVerified && (
									<i
										className="fa-solid fa-circle-check wp-block-frames-fb__verified"
										aria-label={ __(
											'Verified',
											'wpframeblocks'
										) }
									></i>
								) }
							</div>
							<span className="wp-block-frames-fb__subtitle">
								{ pageSubtitle }
							</span>
						</div>
					</div>
					<div
						className="wp-block-frames-fb__more-btn"
						aria-hidden="true"
					>
						<i className="fa-solid fa-ellipsis"></i>
					</div>
				</div>

				{ /* ── Post text ── */ }
				{ postText ? (
					<div className="wp-block-frames-fb__body">
						<PostText text={ postText } />
					</div>
				) : (
					<div className="wp-block-frames-fb__body wp-block-frames-fb__body--placeholder">
						{ __( 'Write post text…', 'wpframeblocks' ) }
					</div>
				) }

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
							<div className="wp-block-frames-fb__image">
								{ imageUrl ? (
									<>
										<img
											src={ imageUrl }
											alt={ imageAlt }
										/>
										<button
											className="wp-block-frames-fb__image-edit"
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
										className="wp-block-frames-fb__image-placeholder"
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

				{ /* ── Reactions row ── */ }
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
								🤗
							</div>
						</div>
						<span className="wp-block-frames-fb__reactions-text">
							{ reactionsCount }
						</span>
					</div>
					<span className="wp-block-frames-fb__comments-count">
						{ commentsCount }
					</span>
				</div>

				{ /* ── Actions ── */ }
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
			</div>
		</>
	);
}

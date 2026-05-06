import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
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
	SelectControl,
	TextareaControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { SocialCommentTemplate } from '@wpfb/frame-components';
import './editor.scss';

export default function Edit( { attributes, setAttributes, context } ) {
	const {
		platform,
		theme,
		syncWithContext,
		authorName,
		commentText,
		timeText,
		likesText,
		replyText,
		reactionCount,
		avatarUrl,
		avatarId,
	} = attributes;

	const contextPlatform = context?.[ 'frameblocks/social-platform' ];
	const contextTheme = context?.[ 'frameblocks/social-theme' ];
	const hasContextPlatform =
		contextPlatform === 'instagram' || contextPlatform === 'facebook';
	const hasContextTheme = contextTheme === 'dark' || contextTheme === 'light';

	useEffect( () => {
		if ( ! syncWithContext ) return;

		const nextAttributes = {};
		if ( hasContextPlatform && platform !== contextPlatform ) {
			nextAttributes.platform = contextPlatform;
		}
		if ( hasContextTheme && theme !== contextTheme ) {
			nextAttributes.theme = contextTheme;
		}

		if ( Object.keys( nextAttributes ).length > 0 ) {
			setAttributes( nextAttributes );
		}
	}, [
		syncWithContext,
		hasContextPlatform,
		hasContextTheme,
		platform,
		theme,
		contextPlatform,
		contextTheme,
		setAttributes,
	] );

	const blockProps = useBlockProps( {
		className: `wp-block-frames-social-comment wp-block-frames-social-comment--${ platform } wp-block-frames-social-comment--${ theme }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Comment Settings', 'frame-blocks' ) }>
					{ hasContextPlatform && (
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __( 'Sync with parent social post', 'frame-blocks' ) }
							checked={ syncWithContext }
							onChange={ ( value ) => setAttributes( { syncWithContext: value } ) }
						/>
					) }
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Platform', 'frame-blocks' ) }
						value={ platform }
						disabled={ syncWithContext && hasContextPlatform }
						help={
							syncWithContext && hasContextPlatform
								? __( 'Platform is inherited from the parent social post.', 'frame-blocks' )
								: undefined
						}
						options={ [
							{ label: __( 'Instagram', 'frame-blocks' ), value: 'instagram' },
							{ label: __( 'Facebook', 'frame-blocks' ), value: 'facebook' },
						] }
						onChange={ ( value ) => setAttributes( { platform: value } ) }
					/>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Theme', 'frame-blocks' ) }
						value={ theme }
						disabled={ syncWithContext && hasContextTheme }
						help={
							syncWithContext && hasContextTheme
								? __( 'Theme is inherited from the parent social post.', 'frame-blocks' )
								: undefined
						}
						options={ [
							{ label: __( 'Light', 'frame-blocks' ), value: 'light' },
							{ label: __( 'Dark', 'frame-blocks' ), value: 'dark' },
						] }
						onChange={ ( value ) => setAttributes( { theme: value } ) }
					/>
					<BaseControl
						__nextHasNoMarginBottom
						label={ __( 'Avatar', 'frame-blocks' ) }
						id="wpfb-social-comment-avatar-upload"
					>
						<div className="wp-block-frames-social-comment__avatar-controls">
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
											id="wpfb-social-comment-avatar-upload"
											onClick={ open }
											variant="secondary"
											size="small"
										>
											{ avatarUrl
												? __( 'Change avatar', 'frame-blocks' )
												: __( 'Upload avatar', 'frame-blocks' ) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
							{ avatarUrl && (
								<Button
									variant="link"
									isDestructive
									size="small"
									onClick={ () => setAttributes( { avatarUrl: '', avatarId: 0 } ) }
								>
									{ __( 'Remove', 'frame-blocks' ) }
								</Button>
							) }
						</div>
					</BaseControl>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Author name', 'frame-blocks' ) }
						value={ authorName }
						onChange={ ( value ) => setAttributes( { authorName: value } ) }
					/>
					<TextareaControl
						__nextHasNoMarginBottom
						label={ __( 'Comment text', 'frame-blocks' ) }
						value={ commentText }
						onChange={ ( value ) => setAttributes( { commentText: value } ) }
					/>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Time', 'frame-blocks' ) }
						value={ timeText }
						onChange={ ( value ) => setAttributes( { timeText: value } ) }
					/>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Likes label', 'frame-blocks' ) }
						value={ likesText }
						onChange={ ( value ) => setAttributes( { likesText: value } ) }
					/>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Reply label', 'frame-blocks' ) }
						value={ replyText }
						onChange={ ( value ) => setAttributes( { replyText: value } ) }
					/>
					{ platform === 'facebook' && (
						<TextControl
							label={ __( 'Reaction count', 'frame-blocks' ) }
							value={ reactionCount }
							onChange={ ( value ) => setAttributes( { reactionCount: value } ) }
						/>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<SocialCommentTemplate
					authorName={ authorName }
					commentText={ commentText }
					timeText={ timeText }
					likesText={ likesText }
					replyText={ replyText }
					reactionCount={ reactionCount }
					platform={ platform }
					avatarUrl={ avatarUrl }
				/>
			</div>
		</>
	);
}

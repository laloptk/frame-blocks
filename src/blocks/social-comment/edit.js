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

	const contextPlatform = context?.[ 'wpframeblocks/social-platform' ];
	const contextTheme = context?.[ 'wpframeblocks/social-theme' ];
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
				<PanelBody title={ __( 'Comment Settings', 'wpframeblocks' ) }>
					{ hasContextPlatform && (
						<ToggleControl
							label={ __( 'Sync with parent social post', 'wpframeblocks' ) }
							checked={ syncWithContext }
							onChange={ ( value ) => setAttributes( { syncWithContext: value } ) }
						/>
					) }
					<SelectControl
						label={ __( 'Platform', 'wpframeblocks' ) }
						value={ platform }
						disabled={ syncWithContext && hasContextPlatform }
						help={
							syncWithContext && hasContextPlatform
								? __( 'Platform is inherited from the parent social post.', 'wpframeblocks' )
								: undefined
						}
						options={ [
							{ label: __( 'Instagram', 'wpframeblocks' ), value: 'instagram' },
							{ label: __( 'Facebook', 'wpframeblocks' ), value: 'facebook' },
						] }
						onChange={ ( value ) => setAttributes( { platform: value } ) }
					/>
					<SelectControl
						label={ __( 'Theme', 'wpframeblocks' ) }
						value={ theme }
						disabled={ syncWithContext && hasContextTheme }
						help={
							syncWithContext && hasContextTheme
								? __( 'Theme is inherited from the parent social post.', 'wpframeblocks' )
								: undefined
						}
						options={ [
							{ label: __( 'Light', 'wpframeblocks' ), value: 'light' },
							{ label: __( 'Dark', 'wpframeblocks' ), value: 'dark' },
						] }
						onChange={ ( value ) => setAttributes( { theme: value } ) }
					/>
					<BaseControl
						label={ __( 'Avatar', 'wpframeblocks' ) }
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
												? __( 'Change avatar', 'wpframeblocks' )
												: __( 'Upload avatar', 'wpframeblocks' ) }
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
									{ __( 'Remove', 'wpframeblocks' ) }
								</Button>
							) }
						</div>
					</BaseControl>
					<TextControl
						label={ __( 'Author name', 'wpframeblocks' ) }
						value={ authorName }
						onChange={ ( value ) => setAttributes( { authorName: value } ) }
					/>
					<TextareaControl
						label={ __( 'Comment text', 'wpframeblocks' ) }
						value={ commentText }
						onChange={ ( value ) => setAttributes( { commentText: value } ) }
					/>
					<TextControl
						label={ __( 'Time', 'wpframeblocks' ) }
						value={ timeText }
						onChange={ ( value ) => setAttributes( { timeText: value } ) }
					/>
					<TextControl
						label={ __( 'Likes label', 'wpframeblocks' ) }
						value={ likesText }
						onChange={ ( value ) => setAttributes( { likesText: value } ) }
					/>
					<TextControl
						label={ __( 'Reply label', 'wpframeblocks' ) }
						value={ replyText }
						onChange={ ( value ) => setAttributes( { replyText: value } ) }
					/>
					{ platform === 'facebook' && (
						<TextControl
							label={ __( 'Reaction count', 'wpframeblocks' ) }
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

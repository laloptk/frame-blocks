import FrameIcon from '../../organisms/FrameIcon';
import { Fragment } from '@wordpress/element';

export default function PostActions({
	isInstagram,
	isLiked,
	labels = {
		like: 'Like',
		comment: 'Comment',
		share: 'Share',
	},
}) {
	const network = isInstagram ? 'ig' : 'fb';
	const rootClass = `wp-block-frames-${network}`;
	const actionItems = isInstagram
		? [
			{
				iconClass: isLiked
					? 'fa-solid fa-heart wp-block-frames-ig__heart--liked'
					: 'fa-regular fa-heart',
			},
			{ iconClass: 'fa-regular fa-comment' },
			{ iconClass: 'fa-regular fa-paper-plane' },
		]
		: [
			{
				iconClass: isLiked
					? 'fa-solid fa-thumbs-up wp-block-frames-fb__thumb--liked'
					: 'fa-regular fa-thumbs-up',
				label: labels.like,
			},
			{ iconClass: 'fa-regular fa-comment', label: labels.comment },
			{ iconClass: 'fa-solid fa-share-nodes', label: labels.share },
		];
	const ActionButtonsContainer = isInstagram ? 'div' : Fragment;

	return (
		<div className={`${rootClass}__actions`} aria-hidden="true">
			<ActionButtonsContainer
				{...(isInstagram ? { className: `${rootClass}__actions-left` } : {})}
			>
				{actionItems.map((item) => (
					<span key={item.iconClass} className={`${rootClass}__action-btn`}>
						<FrameIcon iconClass={item.iconClass} />
						<span>{item.label || ''}</span>
					</span>
				))}
			</ActionButtonsContainer>
			{isInstagram && (
				<span className={`${rootClass}__bookmark`}>
					<FrameIcon iconClass="fa-regular fa-bookmark" />
				</span>
			)}
		</div>
	);
}

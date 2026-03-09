import FrameIcon from '../../organisms/FrameIcon';

export default function PostActions( {
	isInstagram,
	isLiked,
	labels = {
		like: 'Like',
		comment: 'Comment',
		share: 'Share',
	},
} ) {
	if ( isInstagram ) {
		return (
			<div className="wp-block-frames-ig__actions" aria-hidden="true">
				<div className="wp-block-frames-ig__actions-left">
					<span className="wp-block-frames-ig__action-btn">
						<FrameIcon
							iconClass={
								isLiked
									? 'fa-solid fa-heart wp-block-frames-ig__heart--liked'
									: 'fa-regular fa-heart'
							}
						/>
					</span>
					<span className="wp-block-frames-ig__action-btn">
						<FrameIcon iconClass="fa-regular fa-comment" />
					</span>
					<span className="wp-block-frames-ig__action-btn">
						<FrameIcon iconClass="fa-regular fa-paper-plane" />
					</span>
				</div>
				<span className="wp-block-frames-ig__bookmark">
					<FrameIcon iconClass="fa-regular fa-bookmark" />
				</span>
			</div>
		);
	}

	return (
		<div className="wp-block-frames-fb__actions" aria-hidden="true">
			<span className="wp-block-frames-fb__action-btn">
				<FrameIcon
					iconClass={
						isLiked
							? 'fa-solid fa-thumbs-up wp-block-frames-fb__thumb--liked'
							: 'fa-regular fa-thumbs-up'
					}
				/>
				<span>{ labels.like }</span>
			</span>
			<span className="wp-block-frames-fb__action-btn">
				<FrameIcon iconClass="fa-regular fa-comment" />
				<span>{ labels.comment }</span>
			</span>
			<span className="wp-block-frames-fb__action-btn">
				<FrameIcon iconClass="fa-solid fa-share-nodes" />
				<span>{ labels.share }</span>
			</span>
		</div>
	);
}

import FrameIcon from '../../organisms/FrameIcon';

export default function PostEngagement( {
	isInstagram,
	likesCount,
	reactionsCount,
	commentsCount,
} ) {
	if ( isInstagram ) {
		return <div className="wp-block-frames-ig__likes">{ likesCount }</div>;
	}

	return (
		<div className="wp-block-frames-fb__reactions-row" aria-hidden="true">
			<div className="wp-block-frames-fb__reactions-left">
				<div className="wp-block-frames-fb__reaction-icons">
					<div className="wp-block-frames-fb__react-emoji wp-block-frames-fb__react-emoji--like">
						<FrameIcon iconClass="fa-solid fa-thumbs-up" />
					</div>
					<div className="wp-block-frames-fb__react-emoji wp-block-frames-fb__react-emoji--love">
						<FrameIcon iconClass="fa-solid fa-heart" />
					</div>
					<div className="wp-block-frames-fb__react-emoji wp-block-frames-fb__react-emoji--care">
						<span aria-hidden="true">&#129303;</span>
					</div>
				</div>
				<span className="wp-block-frames-fb__reactions-text">{ reactionsCount }</span>
			</div>
			<span className="wp-block-frames-fb__comments-count">{ commentsCount }</span>
		</div>
	);
}

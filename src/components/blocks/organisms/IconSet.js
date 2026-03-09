import FrameIcon from './FrameIcon';

export default function IconSet( {
	containerClassName,
	itemClassName,
	items,
	ariaHidden = false,
	withoutContainer = false,
} ) {
	const nodes = items.map( ( item, index ) => (
		<FrameIcon
			key={ `${ item.iconClass || 'item' }-${ index }` }
			className={ [ itemClassName, item.modifier ].filter( Boolean ).join( ' ' ) || undefined }
			iconClass={ item.iconClass }
		>
			{ item.content }
		</FrameIcon>
	) );

	if ( withoutContainer ) {
		return <>{ nodes }</>;
	}

	return (
		<div className={ containerClassName } aria-hidden={ ariaHidden || undefined }>
			{ nodes }
		</div>
	);
}

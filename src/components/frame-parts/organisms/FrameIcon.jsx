export default function FrameIcon( {
	as: Component = 'div',
	className,
	iconClass,
	iconProps,
	children,
	...wrapperProps
} ) {
	return (
		<Component className={ className } { ...wrapperProps }>
			{ iconClass && <i className={ iconClass } { ...iconProps }></i> }
			{ children }
		</Component>
	);
}

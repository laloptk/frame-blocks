import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { Button } from '@wordpress/components';

const AppendBlockButton = ( {
	blockName,
	blockAttributes = {},
	clientId,
	className = '',
	icon = 'plus-alt2',
	tooltipLabel,
	buttonText,
} ) => {
	const { insertBlock } = useDispatch( 'core/block-editor' );

	function addItem() {
		const newBlock = createBlock( blockName, blockAttributes );
		insertBlock( newBlock, undefined, clientId );
	}

	return (
		<Button
			className={ className }
			icon={ icon }
			onClick={ addItem }
			label={ tooltipLabel || __( 'Add item', 'frame-blocks' ) }
			showTooltip
		>
			{ buttonText || __( 'Add item', 'frame-blocks' ) }
		</Button>
	);
};

export default AppendBlockButton;

import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { Button } from '@wordpress/components';

const AppendBlockButton = ({blockName, label = 'new-item', itemType = 'file', depth = 1, clientId}) => {
    const { insertBlock } = useDispatch('core/block-editor');
    
    function addItem() {
        const newBlock = createBlock(blockName, {
            label,
            itemType,
            depth,
        });
        
        insertBlock(newBlock, undefined, clientId);
    }

    return (
        <Button
            className={`
                wp-block-frames-file-tree__add-item 
                wp-block-frames-file-tree__add-item--${label}`
            }
            icon="plus-alt2"
            onClick={addItem}
            label={__('Add tree item', 'wpframeblocks')}
            showTooltip
        >
            {__('Add item', 'wpframeblocks')}
        </Button>
    )
}

export default AppendBlockButton;
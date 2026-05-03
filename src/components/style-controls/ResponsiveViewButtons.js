import { Button } from '@wordpress/components';

const ResponsiveViewButtons = ({screenView = 'desktop', setState}) => {
    return (
        <div className="responsive-view-btns">
            <Button
                variant="secondary"
                onClick={ () => setState('desktop') }
                disabled={screenView === 'desktop'}
                icon="desktop"
                size="small"
            >
            </Button>
            <Button
                variant="secondary"
                onClick={ () => setState('tablet') }
                disabled={screenView === 'tablet'}
                icon="tablet"
                size="small"
            >
            </Button>
            <Button
                variant="secondary"
                onClick={ () => setState('mobile') }
                disabled={screenView === 'mobile'}
                icon="smartphone"
                size="small"
            >
            </Button>
        </div>
    );
}

export default ResponsiveViewButtons;
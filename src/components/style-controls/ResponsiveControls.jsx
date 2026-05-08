import { PanelBody } from '@wordpress/components';
import ResponsiveViewButtons from "./ResponsiveViewButtons";

const ResponsiveControls = ({children, panelTitle, view, handleView}) => {
    return (
        <PanelBody
            title={ panelTitle }
            initialOpen={ false }
        >
            <div className="responsive-controls">
                <ResponsiveViewButtons
                    screenView={view}
                    setState={ handleView }
                />
            </div>
            {children}
        </PanelBody>
    )
}

export default ResponsiveControls;
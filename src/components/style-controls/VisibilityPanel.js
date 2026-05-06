import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

/**
 * Border inspector panel.
 *
 * @param {Object}      props
 * @param {Object}      props.group         Responsive border group: { desktop, tablet, mobile }
 * @param {Function}    props.setAttributes
 * @param {Object|true} props.enabled       true = all on; object = { radius, width, color }
 * @param {string}      props.view          'desktop' | 'tablet' | 'mobile'
 */
export default function VisibilityPanel({ group, setAttributes, enabled, view }) {
    const { showSidebar, showTerminal } = group[view];

    const show =
        enabled === true
            ? { showSidebar: true, showTerminal: true }
            : enabled;

    return (
        <>
            {show.showSidebar && (
                <ToggleControl
                    __nextHasNoMarginBottom
                    label={__("Show Sidebar Area", 'frame-blocks')}
                    checked={ showSidebar }
                    onChange={ (value) => {
                        setAttributes({
                            visibility: {
                                ...group,
                                [view]: {
                                    ...group[view],
                                    showSidebar: value
                                }
                            }
                        })
                    } }
                />
            )}
            {show.showTerminal && (
                <ToggleControl
                    __nextHasNoMarginBottom
                    label={__("Show Terminal Area", 'frame-blocks')}
                    checked={ showTerminal }
                    onChange={ (value) => {
                        setAttributes({
                            visibility: {
                                ...group,
                                [view]: {
                                    ...group[view],
                                    showTerminal: value
                                }
                            }
                        })
                    }}
                />
            )}
        </>
    );
}
import React from "react";
import ReactDOM from 'react-dom';
import { OverlayView } from '@react-google-maps/api';
import invariant from "invariant";

export default class CustomOverlayView extends OverlayView {
    onRemove() {
        if (this.containerElement) {
            this.containerElement.parentNode.removeChild(this.containerElement);
            ReactDOM.unmountComponentAtNode(this.containerElement);
            this.containerElement = null;
        }
    }

    draw() {
        const { mapPaneName } = this.props
        invariant(
            !!mapPaneName,
            `OverlayView requires either props.mapPaneName or props.defaultMapPaneName but got %s`,
            mapPaneName
        )
        if (this.containerElement) {
            // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapPanes
            const mapPanes = this.state[OverlayView.MAP_PANE].getPanes()
            mapPanes[mapPaneName].appendChild(this.containerElement)

            ReactDOM.unstable_renderSubtreeIntoContainer(
                this,
                React.Children.only(this.props.children),
                this.containerElement,
                this.onPositionElement
            )
        }
    }
}

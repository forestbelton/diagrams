import React from 'react';

export default class CategoryArrow extends React.Component {
    render() {
        const lineStyle = {
            stroke: 'rgb(0, 0, 0)',
            strokeWidth: 2
        };

        const arrowStyle = {
            top: this.props.src.y,
            left: this.props.src.x
        };

        const height = Math.abs(this.props.dst.y - this.props.src.y),
            width = Math.abs(this.props.dst.x - this.props.src.x);

        const x1 = this.props.src.x < this.props.dst.x ? 0 : width,
            y1 = this.props.src.y < this.props.dst.y ? 0 : height,
            x2 = this.props.src.x < this.props.dst.x ? width : 0,
            y2 = this.props.src.y < this.props.dst.y ? height : 0;

        return (
            <svg className="arrow" height={height} width={width} style={arrowStyle}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} style={lineStyle} />
            </svg>
        );
    }
}

CategoryArrow.propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    src: React.PropTypes.shape({
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired
    }).isRequired,
    dst: React.PropTypes.shape({
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired
    }).isRequired
};

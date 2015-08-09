import React from 'react';

function startPoint(src, dst) {
    const angle = Math.atan2(dst.y - src.y, dst.x - src.x);

    return {
        x: (src.x + 12.5) + 12.5 * Math.cos(angle),
        y: (src.y + 12.5) + 12.5 * Math.sin(angle)
    };
}

export default class CategoryArrow extends React.Component {
    render() {
        const lineWidth = 4;

        const s0 = startPoint(this.props.src, this.props.dst);
        const arrowStyle = {
            top: s0.y - lineWidth / 2,
            left: s0.x - lineWidth / 2
        };

        const height = Math.max(lineWidth, Math.abs(this.props.dst.y - this.props.src.y) - 25),
            width = Math.max(lineWidth, Math.abs(this.props.dst.x - this.props.src.x) - 25);

        const x1 = this.props.src.x < this.props.dst.x ? 0 : (width == lineWidth ? 0 : width),
            y1 = this.props.src.y < this.props.dst.y ? 0 : (height == lineWidth ? 0 : height),
            x2 = this.props.src.x < this.props.dst.x ? (width == lineWidth ? 0 : width) : 0,
            y2 = this.props.src.y < this.props.dst.y ? (height == lineWidth ? 0 : height) : 0;

        return (
            <svg className="arrow" height={height} width={width} style={arrowStyle}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={lineWidth} stroke="black" />
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

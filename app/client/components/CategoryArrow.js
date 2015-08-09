import React from 'react';

const cellSize = 25;

function startPoint(center, src, dst) {
    const angle = Math.atan2(dst.y - src.y, dst.x - src.x);

    return {
        x: center.x + (cellSize / 2) * Math.cos(angle),
        y: center.y + (cellSize / 2) * Math.sin(angle)
    };
}

export default class CategoryArrow extends React.Component {
    render() {
        const lineWidth = 2;

        const dst = {
            x: this.props.dst.x - this.props.src.x,
            y: this.props.dst.y - this.props.src.y
        };

        const s0 = startPoint({ x: cellSize / 2, y: cellSize / 2 }, this.props.src, this.props.dst);
        const s1 = startPoint({ x: dst.x + cellSize / 2, y: dst.y + cellSize / 2 }, this.props.dst, this.props.src);

        const arrowStyle = {
            top: this.props.src.y,
            left: this.props.src.x
        };

        const width = cellSize + Math.abs(Math.floor(dst.x / cellSize) * cellSize),
            height = cellSize + Math.abs(Math.floor(dst.y / cellSize) * cellSize);

        return (
            <svg className="arrow" height={height} width={width} style={arrowStyle}>
                <line x1={s0.x} y1={s0.y} x2={s1.x} y2={s1.y} strokeWidth={lineWidth} stroke="black" />
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

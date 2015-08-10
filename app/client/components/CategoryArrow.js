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

        const path = `<path id="path" d="M ${Math.round(s0.x)} ${Math.round(s0.y)} L ${Math.round(s1.x)} ${Math.round(s1.y)}" />`;
        const marker = '<marker id="triangle" viewBox="0 0 10 10" refX="5"'
        + ' refY="5" markerWidth="4" markerHeight="4" orient="auto">'
        + '<path d="M 0 0 L 10 5 L 0 10 z" /></marker>';

        const defs = `<defs>${path}${marker}</defs>`;
        const usePath = `<use xlink:href="#path" stroke-width="${lineWidth}" `
        + `stroke="black" marker-end="url(#triangle)" />`;
        const text = `<text text-anchor="middle"><textPath xlink:href="#path" startOffset="50%">${this.props.name}`
        + `</textPath></text>`;

        return (
            <svg className="arrow" height={height} width={width} style={arrowStyle}
                dangerouslySetInnerHTML={{ __html: defs + usePath + text }} />
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

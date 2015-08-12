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
    componentDidMount() {
        const svg = document.getElementById(this.props.id),
            text = svg.querySelector('.label'),
            bbox = text.getBBox(),
            {start, end} = this.getCoords();

        const mid = {
            x: 0.5 * start.x + 0.5 * end.x,
            y: 0.5 * start.y + 0.5 * end.y
        };

        var angle = Math.atan2(end.y - start.y, end.x - start.x);
        angle = Math.abs(angle) > 0.001 && angle < 0 ? angle + Math.PI : angle;

        if(Math.abs(angle) < 0.001 || Math.abs(angle - Math.PI) < 0.001) {
            mid.x -= bbox.width / 2;
            mid.y -= bbox.height / 2;
        } else {
            mid.x += bbox.width / 2 + 5;
        }

        text.setAttribute('x', mid.x);
        text.setAttribute('y', mid.y);

        console.log(bbox.width, bbox.height);
    }

    getCoords() {
        const dst = {
            x: this.props.dst.x - this.props.src.x,
            y: this.props.dst.y - this.props.src.y
        };

        return {
            start: startPoint({ x: cellSize / 2, y: cellSize / 2 }, this.props.src, this.props.dst),
            end: startPoint({ x: dst.x + cellSize / 2, y: dst.y + cellSize / 2 }, this.props.dst, this.props.src)
        };
    }

    render() {
        const lineWidth = 2;

        const {start, end} = this.getCoords();

        const arrowStyle = {
            top: this.props.src.y,
            left: this.props.src.x
        };

        const dst = {
            x: this.props.dst.x - this.props.src.x,
            y: this.props.dst.y - this.props.src.y
        };

        const width = cellSize + Math.abs(Math.floor(dst.x / cellSize) * cellSize),
            height = cellSize + Math.abs(Math.floor(dst.y / cellSize) * cellSize);

        const path = `<path id="path-${this.props.id}" d="M ${Math.round(start.x)} ${Math.round(start.y)} L ${Math.round(end.x)} ${Math.round(end.y)}" />`;
        const marker = '<marker id="triangle" viewBox="0 0 10 10" refX="5"'
        + ' refY="5" markerWidth="4" markerHeight="4" orient="auto">'
        + '<path d="M 0 0 L 10 5 L 0 10 z" /></marker>';

        const defs = `<defs>${path}${marker}</defs>`;
        const usePath = `<use xlink:href="#path-${this.props.id}" stroke-width="${lineWidth}" `
        + `stroke="black" marker-end="url(#triangle)" />`;
        const text = `<text class="label">${this.props.name}</text>`;

        return (
            <svg id={this.props.id} className="arrow" height={height}
                 width={width} style={arrowStyle}
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

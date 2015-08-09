import React from 'react';

export default class CategoryObject extends React.Component {
    render() {
        const style = {
            top: this.props.y,
            left: this.props.x
        };

        return (
            <div className="object" style={style}>
                <div className="object-name">{this.props.name}</div>
            </div>
        );
    }
}

CategoryObject.propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
};

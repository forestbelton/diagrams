import React from 'react';

export default class CategoryObject extends React.Component {
    onClick(e) {
        this.props.onClick(this, e);
    }

    render() {
        const style = {
            top: this.props.y,
            left: this.props.x
        };
        const onClick = this.onClick.bind(this);

        return (
            <div className="object" style={style} onClick={onClick}>
                <div className="object-name">{this.props.name}</div>
            </div>
        );
    }
}

CategoryObject.propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired
};

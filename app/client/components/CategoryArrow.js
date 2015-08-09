import React from 'react';

export default class CategoryArrow extends React.Component {
    render() {
        // todo: position by drawing svg arrow?
        return (
            <div className="arrow" />
        );
    }
}

CategoryArrow.propTypes = {
    src: React.PropTypes.shape({
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired
    }).isRequired
};

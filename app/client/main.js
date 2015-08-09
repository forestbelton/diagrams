import React from 'react';
import CategoryObject from './components/CategoryObject';

class Main extends React.Component {
    render() {
        return (
            <div className="board">
                <CategoryObject x={5} y={5} id="test" name="X" />
            </div>
        );
    }
}

React.render(<Main />, document.body);

import React from 'react';
import CategoryObject from './components/CategoryObject';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actionState: 'NONE',
            objects: []
        };
    }

    createObject() {
        this.setState({
            actionState: 'CREATE_OBJECT'
        });
    }

    handleAction(e) {
        const node = React.findDOMNode(this),
            x = e.pageX - node.offsetLeft,
            y = e.pageY - node.offsetTop;

        switch(this.state.actionState) {
            case 'CREATE_OBJECT':
                this.setState({
                    actionState: 'NONE',
                    objects: this.state.objects.concat(
                        <CategoryObject x={x} y={y} id="test" name="X" />
                    )
                });
                break;
        }
    }

    render() {
        const createObject = this.createObject.bind(this);
        const handleAction = this.handleAction.bind(this);

        return (
            <div>
                <div className="command-list">
                    <button onClick={createObject}>Create object</button>
                </div>
                <div className="board" onClick={handleAction}>
                    {this.state.objects}
                </div>
            </div>
        );
    }
}

React.render(<Main />, document.body);

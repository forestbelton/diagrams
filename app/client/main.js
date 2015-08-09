import React from 'react';
import Request from './Request';
import CategoryObject from './components/CategoryObject';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actionState: 'NONE',
            objects: []
        };
    }

    componentDidMount() {
        Request.registerStateHandler(this.updateBoard.bind(this));
    }

    updateBoard(data) {
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
                Request.CreateObject({
                    x,
                    y,
                    id: "test",
                    name: "X"
                });

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

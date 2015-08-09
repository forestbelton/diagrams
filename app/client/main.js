import React from 'react';
import Request from './Request';
import CategoryObject from './components/CategoryObject';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actionState: 'NONE',
            commands: []
        };
    }

    componentDidMount() {
        Request.registerStateHandler(this.updateCommands.bind(this));
    }

    updateCommands(data) {
        this.setState({
            commands: data
        });
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
                    id: Math.random().toString(),
                    name: "X"
                });

                this.setState({
                    actionState: 'NONE'
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
                    {this.state.commands.map(cmd => {
                        const data = cmd.data;
                        return <CategoryObject key={data.id} id={data.id}
                                               x={data.x} y={data.y}
                                               name={data.name} />;
                    })}
                </div>
            </div>
        );
    }
}

React.render(<Main />, document.body);

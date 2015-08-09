import React from 'react';
import Request from './Request';
import CategoryObject from './components/CategoryObject';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    handleAction(e) {
        const node = React.findDOMNode(this),
            action = node.querySelector('[name="action"]').value,
            x = e.pageX - node.offsetLeft,
            y = e.pageY - node.offsetTop;

        switch(action) {
            case 'CreateObject':
                Request.CreateObject({
                    x,
                    y,
                    id: Math.random().toString(),
                    name: "X"
                });
                break;
        }
    }

    render() {
        const handleAction = this.handleAction.bind(this);

        return (
            <div>
                <div className="command-list">
                    <div>
                        <input type="radio" name="action" value="CreateObject" defaultChecked={true} />
                        <label htmlFor="CreateObject">Create Object</label>
                    </div>
                    <div>
                        <input type="radio" name="action" value="CreateArrow" />
                        <label htmlFor="CreateArrow">Create Arrow</label>
                    </div>
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

import React from 'react';
import Request from './Request';

import CategoryObject from './components/CategoryObject';
import CategoryArrow from './components/CategoryArrow';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commands: [],
            arrowPoints: []
        };
    }

    componentDidMount() {
        Request.registerStateHandler(this.updateCommands.bind(this));
    }

    updateCommands(commands) {
        this.setState({ commands });
    }

    getAction() {
        return React.findDOMNode(this).querySelector('[name="action"]:checked').value;
    }

    handleAction(e) {
        const node = React.findDOMNode(this).querySelector('.board'),
            action = this.getAction(),
            x = e.clientX - node.offsetLeft,
            y = e.clientY - node.offsetTop;

        switch(action) {
            case 'CreateObject':
                Request.CreateObject({
                    x,
                    y,
                    id: Math.random().toString(),
                    name: 'X'
                });
                break;
        }
    }

    onObjectClick(object, e) {
        const action = this.getAction();

        e.stopPropagation();

        if(action === 'CreateArrow') {
            var arrowPoints = this.state.arrowPoints.concat(object);

            if(arrowPoints.length == 2) {
                Request.CreateArrow({
                    src: arrowPoints[0].props.id,
                    dst: arrowPoints[1].props.id,
                    id: Math.random().toString(),
                    name: 'X'
                });
                this.setState({ arrowPoints: [] });
            } else {
                this.setState({ arrowPoints });
            }
        }
    }

    renderCommands() {
        const onObjectClick = this.onObjectClick.bind(this);

        return this.state.commands.map(cmd => {
            const type = cmd.type,
                data = cmd.data;

            switch(type) {
                case 'CreateObject':
                    return <CategoryObject key={data.id} id={data.id} x={data.x}
                                           y={data.y} name={data.name}
                                           onClick={onObjectClick} />;

                case 'CreateArrow':
                    return <CategoryArrow key={data.id} id={data.id}
                                          src={{x:0,y:0}} dst={{x:0,y:0}}
                                          name={data.name} />;
            }
        });
    }

    render() {
        const handleAction  = this.handleAction.bind(this);

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
                    {this.renderCommands()}
                </div>
            </div>
        );
    }
}

React.render(<Main />, document.body);

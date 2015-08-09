import React from 'react';
import Request from './Request';

import CategoryObject from './components/CategoryObject';
import CategoryArrow from './components/CategoryArrow';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commands: [],
            arrowPoints: [],
            hovering: false
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

    getCoords(e) {
        const node = React.findDOMNode(this).querySelector('.board'),
            cellSize = 50;

        return {
            x: Math.round((e.clientX - node.offsetLeft) / cellSize) * cellSize,
            y: Math.round((e.clientY - node.offsetTop) / cellSize) * cellSize
        };
    }

    handleAction(e) {
        const action = this.getAction(),
            coords = this.getCoords(e);

        switch(action) {
            case 'CreateObject': {
                const name = prompt('Name?');

                Request.CreateObject({
                    x: coords.x,
                    y: coords.y,
                    id: Math.random().toString(),
                    name
                });
                break;
            }
        }
    }

    onObjectClick(object, e) {
        const action = this.getAction();

        e.stopPropagation();

        if(action === 'CreateArrow') {
            const arrowPoints = this.state.arrowPoints.concat(object);

            if(arrowPoints.length == 2) {
                const name = prompt('Name?');

                Request.CreateArrow({
                    src: arrowPoints[0].props.id,
                    dst: arrowPoints[1].props.id,
                    id: Math.random().toString(),
                    name
                });
                this.setState({ arrowPoints: [] });
            } else {
                this.setState({ arrowPoints });
            }
        }
    }

    handleClear() {
        Request.Clear({});
    }

    renderCommands() {
        const onObjectClick = this.onObjectClick.bind(this);
        const objects = {};
        const arrows = {};

        this.state.commands.forEach(cmd => {
            const type = cmd.type,
                data = cmd.data;

            switch(type) {
                case 'CreateObject':
                    objects[data.id] = <CategoryObject key={data.id}
                                                       id={data.id} x={data.x}
                                                       y={data.y}
                                                       name={data.name}
                                                       onClick={onObjectClick} />;
                break;

                case 'CreateArrow':
                    const srcObj = objects[data.src],
                        dstObj = objects[data.dst],
                        src = { x: srcObj.props.x, y: srcObj.props.y },
                        dst = { x: dstObj.props.x, y: dstObj.props.y };

                    arrows[data.id] = <CategoryArrow key={data.id} id={data.id}
                                                     src={src} dst={dst}
                                                     name={data.name} />;
                break;
            }
        });

        return Object.keys(objects).map(k => objects[k])
            .concat(Object.keys(arrows).map(k => arrows[k]));
    }

    onMouseMove(e) {
        const coords = this.getCoords(e);

        this.setState({
            hovering: true,
            hoverX: coords.x,
            hoverY: coords.y
        });
    }

    onMouseLeave() {
        this.setState({ hovering: false });
    }

    render() {
        const handleAction = this.handleAction.bind(this),
            onMouseMove = this.onMouseMove.bind(this),
            onMouseLeave = this.onMouseLeave.bind(this);

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
                    <div>
                        <button onClick={this.handleClear}>Clear</button>
                    </div>
                </div>
                <div className="board" onClick={handleAction} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
                    { this.state.hovering ? <div className="hover" style={{ top: this.state.hoverY, left: this.state.hoverX }} /> : null }
                    {this.renderCommands()}
                </div>
            </div>
        );
    }
}

React.render(<Main />, document.body);

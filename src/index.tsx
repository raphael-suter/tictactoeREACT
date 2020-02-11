import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class App extends PureComponent<{}> {
    constructor() {
        super({});

        this.state = {

        }
    }

    render() {
        return (
            <div className="container">
                <h1>Hello World, React!</h1>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"))

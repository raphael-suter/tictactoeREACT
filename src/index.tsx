import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Toolbar from './components/Toolbar';
import './index.scss';

interface State {
    playerX: string;
    pointsX: number;
    playerY: string;
    pointsY: number;
}

class App extends PureComponent<{}, State> {
    constructor() {
        super({});

        this.state = {
            playerX: 'X',
            pointsX: 0,
            playerY: 'O',
            pointsY: 0
        }
    }

    render() {
        const { playerX, pointsX, playerY, pointsY } = this.state;

        return (
            <>
                <Toolbar title='tictactoe' score={playerX + ' ' + pointsX + ':' + pointsY + ' ' + playerY} buttonIcon='delete' />
            </>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"))

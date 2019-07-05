import * as React from "react";
import {randomInteger} from '../services/func';

const Button = {
    lineHeight: '18px',
    fontSize: '18px',
    padding: '10px',
    background: '#fff',
    border: '1px solid',
    borderRadius: '4px',
    margin: '25px',
    cursor: 'pointer'
};

const Dashboard = {
    display: 'flex',
    flexFlow: 'row wrap',
    width: '600px',
};

const Cell = {
    cursor: 'pointer',
    fontSize: '30px',
    boxSizing: 'border-box',
    width: '148px',
    minWidth: '148px',
    height: '148px',
    border: '1px solid',
    borderRadius: '4px',
    margin: '1px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const EmptyCell = {
    boxSizing: 'border-box',
    width: '148px',
    minWidth: '148px',
    height: '148px',
    border: '1px solid',
    borderRadius: '4px',
    margin: '1px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'gray'
};

class BoardItem {
    constructor(id, value) {
        this.id = id;
        this.value = value;
    }
}

class GameBoard {
    constructor() {
        this.items = [];
        this.pos = 0;
    }

    add(id, value) {
        this.items.push(new BoardItem(id, value));
        this.pos++;
    }

    goUp() {
        let pos = this.pos - 1;
        let newPos = pos - 4;
        if (newPos < 0) return;
        this._change(pos, newPos);
    }

    goDown() {
        let pos = this.pos - 1;
        let newPos = pos + 4;
        if (newPos > this.items.length - 1) return;
        this._change(pos, newPos);
    }

    goLeft() {
        let pos = this.pos - 1;
        let newPos = pos - 1;
        if ((newPos + 1) % 4 === 0) return;
        this._change(pos, newPos);
    }

    goRight() {
        let pos = this.pos - 1;
        let newPos = pos + 1;
        if ((pos + 1) % 4 === 0) return;
        this._change(pos, newPos);
    }

    _change = (pos, newPos) => {
        let temp = this.items[pos];

        this.items[pos] = this.items[newPos];
        this.items[newPos] = temp;

        this.pos = newPos + 1;
    }
}

class Task_5 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            gameBoard: new GameBoard(),
        };
    }

    componentDidMount() {
        this.initGame();
    }

    initGame = () => {
        let gameBoard = new GameBoard();

        for (let i = 0; i < 15; i++) {
            gameBoard.add(i, i+1);
        }

        gameBoard.add(gameBoard.items.length, null);

        this.setState({gameBoard});
    };

    shuffle = () => {

    };

    up = (count) => {
        const {gameBoard} = this.state;
        while (count !== 0) {
            gameBoard.goUp();
            count--;
        }
        this.setState({gameBoard});
    };

    down = (count) => {
        const {gameBoard} = this.state;
        while (count !== 0) {
            gameBoard.goDown();
            count--;
        }
        this.setState({gameBoard});
    };

    left = (count) => {
        const {gameBoard} = this.state;
        while (count !== 0) {
            gameBoard.goLeft();
            count--;
        }
        this.setState({gameBoard});
    };

    right = (count) => {
        const {gameBoard} = this.state;
        while (count !== 0) {
            gameBoard.goRight();
            count--;
        }
        this.setState({gameBoard});
    };

    showResolution = () => {

    };

    drawBoard = () => {
        const {gameBoard} = this.state;

        return gameBoard && gameBoard.items.map((item, i) => {
            let callback = this.getMoveCallback(i, gameBoard.pos);
            return <div key={item.id} onClick={callback} style={item.value ? Cell : EmptyCell}>{item.value}</div>
        })
    };

    getMoveCallback = (newPos, pos) => {
        if (!(newPos + 1)) return;
        let step = pos - (newPos + 1);

        if (step > 0 && step < 4) {
            return () => this.left(Math.abs(step));
        } else if (step < 0 && step > -4) {
            return () => this.right(Math.abs(step));
        } else if (step > 0 && step % 4 === 0) {
            return () => this.up(Math.abs(step / 4));
        } else if (step < 0 && step % 4 === 0) {
            return () => this.down(Math.abs(step / 4));
        }
    };

    render() {
        let content = this.drawBoard();

        return <div className="Task_5">
            <div style={Dashboard}>
                {content}
            </div>

            <button style={Button} onClick={this.initGame}>Новая игра</button>
            <button style={Button} onClick={this.shuffle}>Перемешать</button>
            <button style={Button} onClick={this.showResolution}>Показать решение</button>
        </div>
    }
}

export default Task_5;
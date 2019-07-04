import * as React from "react";
import {randomInteger} from '../services/func';

const Bank = {
    margin: '15px'
};

const Input = {
    padding: '5px',
    margin: '0 5px 10px',
    fontSize: '18px',
};

const Money = {
    display: 'flex',
    flexFlow: 'row wrap',
};

const Note = {
    width: '100px',
    padding: '5px 10px',
    border: '1px solid',
    margin: '5px',
    textAlign: 'center'
};

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

let variant = {};
let results = [];
let rCount = 0;

class Task_3 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sum: 0,
            banknotes: [],
            rCount: 0,
            results: [],
            srIndex: 0
        };
    }

    componentDidMount() {
        this.getBanknotes();
    }

    getBanknotes = () => {
        let banknotes = [];
        let bLength = randomInteger(5, 5);

        for (let i = 0; i < bLength; i++) {
            banknotes[i] = randomInteger(1, 100);
        }

        banknotes.sort();

        this.setState({banknotes});
    };

    clearValues = () => {
        variant = {};
        results = {};
        rCount = 0;
    };

    countChange = () => {
        const {sum} = this.state;
        this.clearValues();
        this.cc(sum, 5);
        this.setState({rCount, results});
    };

    cc = (amount, kindsOfCoins) => {
        const {sum} = this.state;
        if (amount === 0) {
            let key = sum;
            results[rCount] = [];
            while (key !== 0) {
                results[rCount].push(key - variant[key]);
                key = variant[key];
            }
            rCount++;
            return 1;
        }
        else if (amount < 0 || kindsOfCoins === 0) {
            return 0;
        }
        else {
            let fp = this.cc(amount, kindsOfCoins-1);
            let newAmount = amount - this.firstDenomination(kindsOfCoins);

            variant[amount] = newAmount;
            let sp = this.cc(newAmount, kindsOfCoins);
            return fp + sp;
        }
    };

    firstDenomination = (kindsOfCoins) => {
        const {banknotes} = this.state;
        return banknotes[kindsOfCoins - 1];
    };

    changeSum = (e) => {
        this.setState({sum: e.target.value});
    };

    nextIndex = () => {
        const {results} = this.state;
        let newIndex = randomInteger(0, Object.keys(results).length);
        this.setState({srIndex: newIndex})
    };

    render() {
        const {banknotes, sum, rCount, results, srIndex} = this.state;
        const content = banknotes.map((money, i) => <div key={i} style={Note}>{money}</div>);

        return <div className="Task_3" style={Bank}>
            <input style={Input} type="text" value={sum} onChange={this.changeSum}/>
            <div style={Money}>{content}</div>
            <div>Итого {rCount} варианта(ов) размена числа {sum} этими купюрами</div>
            {
                Object.keys(results).length
                    ? <div>Один из них: {JSON.stringify(results[srIndex])}
                        <button style={Button} onClick={this.nextIndex}>другой</button>
                    </div> : null
            }
            <button style={Button} onClick={this.countChange}>Разменять</button>
            <button style={Button} onClick={this.getBanknotes}>Новое хранилище</button>
        </div>
    }
}

export default Task_3;
import * as React from "react";

const HLENGTH = 5;

const Hand = {
    display: 'flex',
    margin: '15px 0'
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

const Answer = {
    display: 'flex',
    justifyContent: 'center',
};

const Card = {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '180px',
    height: '300px',
    border: '1px solid',
    margin: '0 25px',
};

const CardSimilar = {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '180px',
    height: '300px',
    border: '1px solid',
    margin: '0 25px',
    background: '#7CEC29'
};

class Task_2 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hand: [],
            equiText: '',
            cards: []
        };
    }

    componentDidMount() {
        this.generateNewHand();
    }

    randomInteger = (min, max) => {
        return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    };

    generateNewHand = () => {
        let newHand = [];
        for (let i = 0; i < HLENGTH; i++) {
            newHand[i] = this.randomInteger(6, 14);
        }

        let result = newHand.map(card => {
            return {
                text: this.getCardValue(card),
                code: card
            };
        });

        this.findEquivalent(result);
    };

    getCardValue = (code) => {
        switch (code) {
            case 11: return 'J';
            case 12: return 'D';
            case 13: return 'K';
            case 14: return 'T';
            default: return code.toString();
        }
    };

    findEquivalent = (hand) => {
        let equiText, equiCount = '';
        let answer = {};
        let cards = [];

        hand.forEach((card, i, arr) => {
            let count = arr.filter(item => item.code === card.code).length;
            if (count > 1) {
                answer[card.code] = count;
            }
        });

        for (let key in answer) {
            if (answer[key] >= 2) {
                equiCount += '' + answer[key];
                cards.push(key);
            }
        }

        equiText = this.getEquiText(+equiCount);
        this.setState({hand, equiText, cards});
    };

    getEquiText = (equiCount) => {
        switch (equiCount) {
            case 5: return 'poker';
            case 4: return 'four of a kind';
            case 32: return 'full house';
            case 23: return 'full house';
            case 3: return 'three of a kind';
            case 22: return 'two pairs';
            case 2: return 'one pair';
            default: return 'all different';
        }
    };

    render() {
        const {hand, equiText, cards} = this.state;

        const content = hand.map((card, i) => <div key={i} style={cards.includes(card.code.toString()) ? CardSimilar : Card}>
            {card.text}
        </div>);

        return <div className="Task_2">
            <div style={Hand}>{content}</div>
            <div style={Answer}>{equiText}</div>
            <button style={Button} onClick={this.generateNewHand}>Новая рука</button>
        </div>
    }
}

export default Task_2;
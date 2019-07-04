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
    flexFlow: 'row'
};

const Schedule = {
    display: 'flex',
    flexFlow: 'column'
};

const ScheduleItem = {
    margin: '15px'
};

class Proposal {
    constructor(id, start, end){
        this.id = id + 1;
        this.start = start;
        this.end = end;
    }
}

class Task_4 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            schedule: [],
            pairs: [],
            ids: []
        };
    }

    componentDidMount() {
        this.getNewSchedule();
    }


    formatSchedule2 = () => {
        const {schedule} = this.state;

        let proposals = schedule.map((item, i) => new Proposal(i, item[0], item[1]));
        proposals.sort((a, b) => a.end - b.end);
        let ids = [...this.recursion2(proposals)];

        this.setState({ids});
    };

    *recursion2(proposals) {
        let time = 1;
        for (let p in proposals) {
            let item = proposals[p];
            if(item.start < time)
                continue;
            time = item.end;
            yield item.id;
        }
    };

    recursion = (pairs, chain, prev, i, arr) => {
        arr.forEach((next, j) => {
            if (j > i && next[0] >= prev[1]) {
                if (pairs[chain[0]].indexOf(prev) !== pairs[chain[0]].length - 1) {
                    let oldChain = chain[0];
                    let prevIndex = pairs[oldChain].indexOf(prev);
                    pairs[++chain[0]] = pairs[oldChain].slice(0, prevIndex+1);
                }
                pairs[chain[0]].push(next);
                this.recursion(pairs, chain, next, j, arr);
            }
        });
    };

    formatSchedule = () => {
        const {schedule} = this.state;

        let pairs = [];
        let chain = [0];

        schedule.forEach((item, i, arr) => {
            pairs[chain[0]] = [];
            pairs[chain[0]].push(item);
            this.recursion(pairs, chain, item, i, arr);
            chain[0]++;
        });

        this.setState({pairs})
    };

    getNewSchedule = () => {
        let n = randomInteger(3, 10);
        let schedule = [];

        for (let i = 0; i < n; i++) {
            let s = randomInteger(1, 28);
            let t = randomInteger(s + 1, 30);
            schedule[i] = [s, t];
        }

        schedule.sort((a, b) => {
            return a[0] - b[0] || a[1] - b[1];
        });

        this.setState({schedule, pairs: [], ids: []})
    };

    drawSchedule = () => {
        const {schedule} = this.state;

        return schedule.map((item, i) => <div key={i} style={ScheduleItem}>{(i+1) + ' - ' + JSON.stringify(item)}</div>);
    };

    drawPairs = () => {
        const {pairs} = this.state;

        return pairs.map((item, i) => <div key={i} style={ScheduleItem}>{JSON.stringify([...item])}</div>);
    };

    drawIds = () => {
        const {ids, schedule} = this.state;

        return ids.map((item, i) => <div key={i} style={ScheduleItem}>{JSON.stringify(item) + ' ' + JSON.stringify(schedule[item-1])}</div>);
    };

    render() {
        let schedule = this.drawSchedule();
        let pairs = this.drawPairs();
        let ids = this.drawIds();

        return <div className="Task_4">
            <div style={Dashboard}>
                <div style={Schedule}>{schedule}</div>
                <div style={Schedule}>{pairs}</div>
                <div style={Schedule}>{ids}</div>
            </div>
            <button style={Button} onClick={this.getNewSchedule}>Новое расписание</button>
            <button style={Button} onClick={this.formatSchedule2}>Сформировать пары</button>
            <button style={Button} onClick={this.formatSchedule}>Показать все варианты</button>
        </div>
    }
}

export default Task_4;
import React from 'react';
import Deque from 'collections/deque';
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

const Castle = (width) => {
    let w = width + 'px';
    return {
        display: 'flex',
        flexFlow: 'row wrap',
        width: w,
        height: 'auto'
    }
};

const CastleRoomFinish = (width, height) => {
    let w = width + 'px';
    let h = height + 'px';
    return {
        width: w,
        minWidth: w,
        height: h,
        margin: '1px',
        backgroundColor: '#D3360F',
    }
};

const CastleRoomVisited = (width, height) => {
    let w = width + 'px';
    let h = height + 'px';
    return {
        width: w,
        minWidth: w,
        height: h,
        margin: '1px',
        backgroundColor: '#F9E28C',
    }
};

const CastleRoomPath = (width, height) => {
    let w = width + 'px';
    let h = height + 'px';
    return {
        width: w,
        minWidth: w,
        height: h,
        margin: '1px',
        backgroundColor: '#1BB400',
    }
};

const CastleRoomClose = (width, height) => {
    let w = width + 'px';
    let h = height + 'px';
    return {
        width: w,
        minWidth: w,
        height: h,
        margin: '1px',
        backgroundColor: '#353E40',
    }
};

const CastleRoomOpen = (width, height) => {
    let w = width + 'px';
    let h = height + 'px';
    return {
        width: w,
        minWidth: w,
        height: h,
        margin: '1px',
        backgroundColor: '#8CE5F9'
    }
};

class SquareGrid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.walls = [];
    }

    in_bounds(id) {
        let x = id[0];
        let y = id[1];

        return (0 <= x && x < this.width) && (0 <= y && y < this.height);
    }


    passable(id) {
        return !this.walls.find(item => item[0] === id[0] && item[1] === id[1]);
    }

    neighbors(id) {
        let x = id[0];
        let y = id[1];

        let dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        let results = [];

        dirs.forEach(dir => {
            results.push([dir[0] + x, dir[1] + y]);
        });

        (x + y) % 2 === 0 && results.reverse();
        results = results.filter(id => this.in_bounds(id));
        results = results.filter(id => this.passable(id));
        return results
    }
}

class Queue {
    constructor() {
        this.elements = new Deque();
    }

    empty() {
        return this.elements.length === 0;
    }

    put(x) {
        this.elements.push(x);
    }

    get() {
        return this.elements.shift();
    }
}

const FINISH_RC = 4;
const START_RC = 3;
const VISITED_RC = 2;
const OPEN_RC = 1;
const CLOSE_RC = 0;

class Task_1 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            m: 16,
            n: 24,
            start: [0, 0],
            goal: [1, 1],
            rooms: [],
            walls: [],
            visited: [],
            visitStep: 0,
            buildEnd: false,

        };
    }

    componentDidMount() {
        this.resetMap();
    }

    breadth_first_search_3(graph, start, goal) {
        let frontier = new Queue();
        frontier.put(start);
        let cameFrom = {};
        cameFrom[start] = null;

        while (!frontier.empty()) {
            let current = frontier.get();
            let cond = current[0] === goal[0] && current[1] === goal[1];
            if (cond) break;

            let nb = graph.neighbors(current);

            nb.forEach(next => {
                if (!cameFrom.hasOwnProperty(next)) {
                    frontier.put(next);
                    cameFrom[next] = current;
                }
            });
        }

        return cameFrom;
    }

    initDiffGraph = (width, height, walls, start, goal) => {
        let g = new SquareGrid(width, height);
        g.walls = walls;
        return this.breadth_first_search_3(g, start, goal);
    };

    buildPath = () => {
        const {rooms, start, goal, m, n, walls} = this.state;

        let result = this.initDiffGraph(m, n, walls, start, goal);
        let visited = [];

        for (let vRoom in result) {
            let room = vRoom.split(',').map(item => +item);
            visited.push(room);
        }

        this.visitRooms(rooms, visited, 0, result, start, goal);
    };
    resetMap = () => {
        const {start, goal, m, n} = this.state;

        let rooms = [],
            walls = [];

        for (let i = 0; i < m; i++) {
            rooms[i] = [];
            for (let j = 0; j < n; j++) {
                let step = randomInteger(0, 3);
                if ((i === goal[0] && j === goal[1]) || (i === start[0] && j === start[1])) {
                    step = 1;
                }
                rooms[i][j] = step ? OPEN_RC : CLOSE_RC;
                !step && walls.push([i, j]);
            }
        }

        rooms[start[0]][start[1]] = START_RC;
        rooms[goal[0]][goal[1]] = FINISH_RC;

        let roomWidth = Math.round(1200 / n);
        let roomHeight = Math.round(800 / m);
        let castleWidth = (roomWidth + 2) * n;

        this.setState({m, n, rooms, roomWidth, roomHeight, castleWidth, walls});
    };

    visitRooms = (rooms, visited, visitStep, path, start, goal) => {

        if (Object.keys(visited).length - 1 <= visitStep) return this.drawPath(path, start, goal);
        let vRoom = visited[visitStep];

        let newCastle = this.changeRoomType(rooms, vRoom, VISITED_RC);

        visitStep++;
        this.setState({visitStep, rooms: newCastle});
        setTimeout(() => this.visitRooms(rooms, visited, visitStep, path, start, goal));
    };

    drawPath = (path, start, goal) => {
        const {rooms} = this.state;

        let next = path[goal];
        if (!next) return;

        let newCastle = this.changeRoomType(rooms, next, START_RC);
        newCastle[goal[0]][goal[1]] = START_RC;

        goal = next;
        this.setState({rooms: newCastle});
        setTimeout(() => this.drawPath(path, start, goal));
    };

    roomType = (index) => {
        const {roomWidth, roomHeight} = this.state;

        switch (index) {
            case 1:
                return CastleRoomOpen(roomWidth, roomHeight);
            case 2:
                return CastleRoomVisited(roomWidth, roomHeight);
            case 3:
                return CastleRoomPath(roomWidth, roomHeight);
            case 4:
                return CastleRoomFinish(roomWidth, roomHeight);
            default:
                return CastleRoomClose(roomWidth, roomHeight);
        }
    };

    changeRoomType = (rooms, chRoom, roomType) => {
        return rooms.map((room, i) => {
            if (i === chRoom[0]) {
                room[chRoom[1]] = roomType;
            }
            return room;
        });
    };

    changeGoalRoom = (room) => {
        const {rooms, goal} = this.state;
        let newRooms = this.changeRoomType(rooms, goal, 1);
        newRooms = this.changeRoomType(newRooms, room, 4);
        this.setState({goal: room, rooms: newRooms});
    };

    render() {
        const {rooms, castleWidth} = this.state;

        let content = rooms.map((row, i) =>
            row.map((item, j) =>
                <div key={'row_' + i + '_col_' + j}
                     className="castle__room"
                     style={this.roomType(item)}
                     onClick={() => this.changeGoalRoom([i, j])}
                />
            )
        );

        return <div className="Task_1">
            <div className="castle" style={Castle(castleWidth)}>
                {content}
            </div>
            <button style={Button} onClick={this.resetMap}>Обновить карту</button>
            <button style={Button} onClick={this.buildPath}>Построить маршрут</button>
        </div>
    }
}

export default Task_1;

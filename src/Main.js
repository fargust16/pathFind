import * as React from "react";
import { Switch, Route } from 'react-router-dom'
import Task_1 from './tasks/Task_1';
import Task_2 from './tasks/Task_2';
import Task_3 from "./tasks/Task_3";
import Task_4 from "./tasks/Task_4";
import Task_5 from "./tasks/Task_5";

class Main extends React.Component{
    render() {
        return <React.Fragment>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/path-find' component={Task_1}/>
                <Route path='/poker' component={Task_2}/>
                <Route path='/bank' component={Task_3}/>
                <Route path='/schedule' component={Task_4}/>
                <Route path='/game-15' component={Task_5}/>
            </Switch>
        </React.Fragment>
    }
}

const Home = () => {
    return (
        <main>
            <h1>Выберите задачу из списка выше</h1>
        </main>
    )
};

export default Main;
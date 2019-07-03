import * as React from "react";
import { Switch, Route } from 'react-router-dom'
import Task_1 from './tasks/Task_1';
import Task_2 from './tasks/Task_2';
import Task_3 from "./tasks/Task_3";

class Main extends React.Component{
    render() {
        return <React.Fragment>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/path-find' component={Task_1}/>
                <Route path='/poker' component={Task_2}/>
                <Route path='/bank' component={Task_3}/>
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
import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import NotFound from '../notFound/NotFound';
import Home from '../home/Home';

class MainLayout extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>

                <Route exact path="/home" component={Home}/>
                {/*<Route exact path="/users/:id/cabinet" component={UserCabinet}/>*/}
                <Route component={NotFound}/>
            </Switch>
        );
    }
}

MainLayout.propTypes = {};

export default MainLayout;

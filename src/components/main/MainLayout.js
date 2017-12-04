import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import NotFound from '../notFound/NotFound';
import Home from '../home/Home';
import SignIn from '../authorization/SignIn';
import requireAuth from '../authorization/auth/requireAuth';
import RecoveryPassword from '../authorization/RecoveryPassword';
import UserCabinet from '../user/UserCabinet';
import UserProfile from '../user/UserProfile';

class MainLayout extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={SignIn}/>
                <Route exact path="/login" component={SignIn}/>
                <Route exact path="/home" component={requireAuth(Home)}/>
                <Route exact path="/recovery" component={RecoveryPassword}/>
                <Route exact path="/users" component={Home}/>
                <Route exact path="/users/:id/cabinet" component={UserCabinet}/>
                <Route exact path="/users/:id/profile/" component={UserProfile}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}

MainLayout.propTypes = {};

export default MainLayout;

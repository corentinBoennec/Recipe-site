import React from 'react';
import {Route, Switch, Redirect, BrowserRouter as Router} from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { CreateRecipePage } from '../CreateRecipePage';
import { RecipePage } from '../RecipePage';
import { create } from '../../../API/models/userModel';





class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }
   

    render() {
        const { alert } = this.props;
        return (
                <div className="container">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/createRecipe" component={CreateRecipePage} />
                                <Route exact path="/recipes/:name" render={(props) => (
                        <RecipePage {...props}/>
                    )}/> 
                                {/*
                                <Route path="/recipes"> 
                                    <RecipePage />
                                </Route>
                                */}
                                
                               <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                     
                       
                </div>
         
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
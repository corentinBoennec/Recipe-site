import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, ReactReduxContext } from 'react-redux';
import { NavBar } from '../NavBar';
import { userActions, recipeActions  } from '../_actions';

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const [recipes, setRecipe] = useState([{}]);
    const [groupedRecipes, setGroupRecipes] = useState([{recipe0:{}, recipe1:{}, recipe2:{}}]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    useEffect(() => {
        recipeActions.getAll().then(value => {
            console.log("value before :" , value);
            if(value.length % 3 == 1){
                value.push(value[0]);
                value.push(value[1]);
            }
            if(value.length % 3 == 2){
                value.push(value[0]);
            }
            console.log("value after :" , value);
            setRecipe(value);

            
            const grouped = [];
            for(let i = 0; i < value.length; i+=3){
                let tmp = {
                    recipe0 : value[i],
                    recipe1 : value[i + 1],
                    recipe2 : value[i + 2]
                }
                grouped.push(tmp);
            }
            setGroupRecipes(grouped);
        });
    }, []);

    console.log("recipe :" , recipes);
    console.log("grouped : " , groupedRecipes);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    var myImage = [new Image(338, 253), new Image(338, 253), new Image(338, 253)];
    myImage[1].src = '../../images/dish1.jpg';
    myImage[2].src = '../../images/dish2.jpg';
    myImage[0].src = '../../images/dish3.jpg';

    return (
        <div className="container-fluid">

            <NavBar></NavBar>

            {groupedRecipes.map((groupe, index) =>
                            <div className="card-deck deck-homePage" >
                            <div className="card">
                                <img className="card-img-top" src={myImage[0].src} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{groupe.recipe0.name}</h5>
                                    <p className="card-text">{groupe.recipe0.description}</p>
                                    <p className="card-text"><small className="text-muted">{groupe.recipe0.origin}</small></p>
                                </div>
                            </div>
                            <div className="card">
                                <img className="card-img-top" src={myImage[1].src} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{groupe.recipe1.name}</h5>
                                    <p className="card-text">{groupe.recipe1.description}</p>
                                    <p className="card-text"><small className="text-muted">{groupe.recipe1.origin}</small></p>
                                </div>
                            </div>
                            <div className="card">
                                <img className="card-img-top" src={myImage[2].src} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{groupe.recipe2.name}</h5>
                                    <p className="card-text">{groupe.recipe2.description}</p>
                                    <p className="card-text"><small className="text-muted">{groupe.recipe2.origin}</small></p>
                                </div>
                            </div>
                        </div>
            
                    )}
            
            <div className="col-lg-8 offset-lg-2">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React Hooks!!</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.username}>
                                {user.username + ' ' + user.email}
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                <p>
                    <Link to="/createRecipe">Create Recipe</Link>
                </p>
            </div>
        </div>
    );

}

export { HomePage };
/*
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.username}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.username}>
                                {user.username + ' ' + user.email}
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                <p>
                    <Link to="/createRecipe">Create Recipe</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };*/
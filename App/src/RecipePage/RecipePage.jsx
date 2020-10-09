import React, { useEffect, useState } from 'react';
import { Link, useParams, Route, useRouteMatch, Switch } from 'react-router-dom';
import { useDispatch, useSelector, ReactReduxContext } from 'react-redux';
import { NavBar } from '../NavBar';
import { userActions, recipeActions } from '../_actions';

function RecipePage(props) {
    let match = useRouteMatch();

    console.log(props);

    return (
        <div className="container-fluid">

            <NavBar></NavBar>

        
           
        </div>
    );



    function Recipe() {
        let { name } = useParams();
        return <h3>Requested topic ID: {name}</h3>;
      }}

export { RecipePage };

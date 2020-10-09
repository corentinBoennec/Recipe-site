import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
            if(value.length % 3 == 1){
                value.push(value[0]);
                value.push(value[1]);
            }
            if(value.length % 3 == 2){
                value.push(value[0]);
            }
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

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

   


    return (
        <div className="container-fluid">

            <NavBar></NavBar>
            <a href= "/recipes/dxfd" >Create my own </a>
            {groupedRecipes.map((groupe, index) =>
                            <div className="card-deck deck-homePage" >
                            <div className="card">
                                <img className="card-img-top" src={groupe.recipe0.imgUrl} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{groupe.recipe0.name}</h5>
                                    <p className="card-text">{groupe.recipe0.description}</p>
                                    <p className="card-text"><small className="text-muted">{groupe.recipe0.origin}</small></p>
                                </div>
                            </div>
                            <div className="card">
                                <img className="card-img-top" src={groupe.recipe1.imgUrl} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{groupe.recipe1.name}</h5>
                                    <p className="card-text">{groupe.recipe1.description}</p>
                                    <p className="card-text"><small className="text-muted">{groupe.recipe1.origin}</small></p>
                                </div>
                            </div>
                            <div className="card">
                                <img className="card-img-top" src={groupe.recipe2.imgUrl} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{groupe.recipe2.name}</h5>
                                    <p className="card-text">{groupe.recipe2.description}</p>
                                    <p className="card-text"><small className="text-muted">{groupe.recipe2.origin}</small></p>
                                </div>
                            </div>
                        </div>
            
                    )}
            
        </div>
    );

}

export { HomePage };

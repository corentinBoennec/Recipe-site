import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { NavBar } from "../NavBar";
import { recipeActions } from "../_actions";

function SearchPage() {
  const [recipes, setRecipes] = useState([]);

  const dispatch = useDispatch();
  let match = useRouteMatch();
  let { search } = useParams();

  useEffect(() => {
    let isMounted = true;

    recipeActions.getAll().then((value) => {
      if (isMounted) {
        const recipeSearched = value.filter((recipe) =>
          recipe.name.includes(search)
        );
        setRecipes(recipeSearched);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  
  return (
    <div className="container-fluid">
      <NavBar></NavBar>

      <div class="row row-cols-1 row-cols-md-3">
        {recipes.map((recipe, index) => (
          <div class="col mb-4">
            <div class="card">
              <Link
                to={"recipes/" + recipe.name}
                className="text-decoration-none"
              >
                <img src={recipe.imgUrl} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{recipe.name}</h5>
                  <p class="card-text">{recipe.description}</p>
                  <p className="card-text">
                    <small className="text-muted">{recipe.origin}</small>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export { SearchPage };

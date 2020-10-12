import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "../NavBar";
import { recipeActions } from "../_actions";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let isMounted = true;

    recipeActions.getAll().then((value) => {
      if (isMounted) {
        setRecipes(value);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container-fluid">
      <NavBar></NavBar>

      <div className="row row-cols-1 row-cols-md-3">
        {recipes.map((recipe, index) => (
          <div className="col mb-4" key={index}>
            <div className="card">
              <Link
                to={"recipes/" + recipe.name}
                className="text-decoration-none"
              >
                <img src={recipe.imgUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">{recipe.description}</p>
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

export { HomePage };

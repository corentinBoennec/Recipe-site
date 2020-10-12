import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { NavBar } from "../NavBar";
import { recipeActions } from "../_actions";

function RecipePage(props) {
  const [recipe, setRecipe] = useState({ ingredients: [], steps: [] });
  const [currentNbEaters, setCurrentNbEaters] = useState(1);
  let { name } = useParams();
  useEffect(() => {
    if (name === "random") {
      recipeActions.getRandom().then((value) => {
        setRecipe(value);
        setCurrentNbEaters(value.nbEaters);
      });
    } else {
      recipeActions.getByName(name).then((value) => {
        setRecipe(value);
        setCurrentNbEaters(value.nbEaters);
      });
    }
  }, []);

  console.log(recipe.ingredients);

  return (
    <div className="container-fluid">
      <NavBar></NavBar>
      <div className="jumbotron">
        <div className="row">
          <div className="col">
            <div>
              Number of eaters :
              <div className="input-group">
                <span className="input-group-btn">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={currentNbEaters <= 1 ? "disabled" : ""}
                    data-type="minus"
                    data-field="quant[1]"
                    onClick={() => setCurrentNbEaters(currentNbEaters - 1)}
                  >
                    -
                  </button>
                </span>
                <input
                  type="text"
                  name="quant[1]"
                  className="form-control input-number text-centered"
                  min="1"
                  value={currentNbEaters}
                  onChange={(e) =>
                    setCurrentNbEaters(
                      e.target.value ? parseInt(e.target.value) : ""
                    )
                  }
                />
                <span className="input-group-btn">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-type="plus"
                    data-field="quant[1]"
                    onClick={() => setCurrentNbEaters(currentNbEaters + 1)}
                  >
                    +
                  </button>
                </span>
              </div>
            </div>
            <div>
              Ingredients :
              {recipe.ingredients.map((ingredient, index) => (
                <h4 key={index}>
                  {(ingredient.quantity / recipe.nbEaters) * currentNbEaters +
                    " " +
                    ingredient.unit +
                    " de " +
                    ingredient.name}
                </h4>
              ))}
            </div>
          </div>

          <div className="col-9">
            <div className="card mb-3">
              <img src={recipe.imgUrl} className="card-img-top" alt="..." />
              <div className="card-body">
                <h2 className="card-title">{recipe.name}</h2>
                <p className="card-text">{recipe.description}</p>
                <span className="badge badge-secondary">{recipe.origin}</span>

                <ul className="list-group">
                  {recipe.steps.map((step, index) => (
                    <li className="list-group-item" key={index}>
                      <div className="media">
                        <div className="numberCircle">{index}</div>
                        <div className="media-body">{step}</div>
                      </div>
                    </li>
                  ))}
                </ul>

                <p>{recipe.additionalNotFromAuthor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { RecipePage };

import { ingredientConstants } from '../_constants';
import { recipeService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { ingredients } from '../_reducers/ingredients.reducer';

export const recipeActions = {
    update,
    addRecipe,
    getAllIngredient,
    getAll

};


function update(recipeParams) {
    return dispatch => {
        recipeService.update(recipeParams)
    };
}

function getAllIngredient() {  
    return recipeService.getAllIngredient();
    /*recipeService.getAllIngredient()
        .then(
            ingredients => {return ingredients});*/

    /*dispatch => {
        dispatch(request());

        recipeService.getAllIngredient()
            .then(
                ingredients => dispatch(success(ingredients)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: ingredientConstants.GETALL_REQUEST } }
    function success(ingredients) { return { type: ingredientConstants.GETALL_SUCCESS, ingredients } }
    function failure(error) { return { type: ingredientConstants.GETALL_FAILURE, error } }*/
}

function addRecipe(recipe) {

   // return dispatch => {
        console.log("recipe : recipe actions", recipe);
        recipeService.create(recipe);
            /*.then(
                user => { 
                    dispatch(success(recipe));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(recipe) { return { type: userConstants.REGISTER_REQUEST, recipe } }
    function success(recipe) { return { type: userConstants.REGISTER_SUCCESS, recipe } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
*/
}

function getAll() {
    return recipeService.getAll();
}
import { userConstants } from '../_constants';
import { ingredientService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const ingredientActions = {
    getAll
};


function getAll() {
    return dispatch => {
        ingredientService.getAll()
    };
}
import { ingredientConstants } from '../_constants';

export function ingredients(state = {}, action) {
    switch (action.type) {
        case ingredientConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case ingredientConstants.GETALL_SUCCESS:
            return {
                items: action.ingredients
            };
        case ingredientConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}
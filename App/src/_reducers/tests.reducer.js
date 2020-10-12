import { testConstants } from '../_constants';

export function test(state = {}, action) {
    switch (action.type) {
        case testConstants.TEST_REQUEST:
            return { registering: true };
        case testConstants.TEST_SUCCESS:
            return {};
        case testConstants.TEST_FAILURE:
            return {};
        default:
            return state
    }
}
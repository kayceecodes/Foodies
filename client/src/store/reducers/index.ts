//  export defaults allows for you to rename your imports
import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
// export {initialState} from './cart_reducer';

const rootReducer = combineReducers({
    counter: counterReducer,
}); 

export default rootReducer;
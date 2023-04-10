import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import projectReducer from './reducer/projects';
import authReducer from './reducer/authen';

const reducer = combineReducers({
  projects: projectReducer,
  authen: authReducer
});
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

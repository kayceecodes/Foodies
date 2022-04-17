import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const middlewares = [thunk];

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__<any>({}) : compose;


const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const makeStore = () => createStore(rootReducer, enhancer)

export const wrapper = createWrapper(makeStore, {debug: true});


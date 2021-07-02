import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import thunk from "redux-thunk";

const loggerMiddleware = store => next => action => {
    // console.log("MyLoggerMiddleware: Dispatching ==> ", action);
    // console.log("MyLoggerMiddleware: State before : ", store.getState());
    const result = next(action);
    // console.log("MyLoggerMiddleware: State after : ", store.getState());
    return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [loggerMiddleware, thunk];

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
export const persistor = persistStore(store);
export default { store, persistor };
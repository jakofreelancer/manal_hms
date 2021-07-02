import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
// import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist/lib/storage';
import { Provider } from 'react-redux';

import { store, persistor } from "./store";

// import thunk from 'redux-thunk';
import App from './pages/App';
import reportWebVitals from "./reportWebVitals";
import EditableTable from "./components/ListEmployees";

// import signupLoginReducer from "./redux/reducer/signupLoginReducer";
// import appointmentReducer from "./redux/reducer/appointmentReducer";
// import permissionSelectorReducer from "./redux/reducer/permissionSelectorReducer";
// import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/lib/integration/react';

// const loggerMiddleware = store => {
//   return next => {
//     return action => {
//         console.log("MyLoggerMiddleware: Dispatching ==> ", action);
//         console.log("MyLoggerMiddleware: State before : ", store.getState());
//         const result = next(action);
//         console.log("MyLoggerMiddleware: State after : ", store.getState());
//         return result;
//     };
//   };
// };

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['permission']
// }

// const rootReducer = combineReducers({
//   login: signupLoginReducer,
//   appointment: appointmentReducer,
//   permission: permissionSelectorReducer
// });

// export default persistReducer(persistConfig, rootReducer)

// const reducers = combineReducers({
//   auth: () => ({ mock: true }),
//   form: persistReducer(
//     {
//       key: "form", // key for localStorage key, will be: "persist:form"
//       storage,
//       debug: true,
//       blacklist: ['permission'],
//     },
//     {
//       signupLoginReducer,
//       appointmentReducer,
//       permissionSelectorReducer
//     }
//   ), });

// const middlewares = [loggerMiddleware, thunk];

// const store = createStore(persistReducer({
//   key: "root",
//     debug: true,
//     storage,
//     whitelist: ['auth'],
// }, reducers), composeEnhancers(applyMiddleware(...middlewares)));

// const persistor = persistStore(store, null, () => {
//   console.log("restoredState", store.getState());
// });

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

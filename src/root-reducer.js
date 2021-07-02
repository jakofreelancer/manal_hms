import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import signupLoginReducer from "./redux/reducer/signupLoginReducer";
import appointmentReducer from "./redux/reducer/appointmentReducer";
import permissionSelectorReducer from "./redux/reducer/permissionSelectorReducer";

const persistConfig = {
    key: "currentPermission",
    storage,
    whitelist: ["permissionSelectorReducer"]
}

const rootReducer = combineReducers({
    signupLoginReducer,
    appointmentReducer,
    permissionSelectorReducer
});

export default persistReducer(persistConfig, rootReducer);
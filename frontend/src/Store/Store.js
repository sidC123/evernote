import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "../Reducers/userReducers";
import {
  noteCreateReducer,
  noteDeleteReducer,
  noteListReducer,
  noteUpdateReducer,
} from "../Reducers/notesReducers";

const reducer = combineReducers({
  // this will contain our reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteList: noteListReducer,
  noteCreate: noteCreateReducer,
  noteDelete: noteDeleteReducer,
  noteUpdate: noteUpdateReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;

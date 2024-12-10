import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import "./index.css";
import App from "./App.jsx";
import { movieReducer } from "./redux/reducers";
import rootSaga from "./redux/sagas";


const sagaMiddleware = createSagaMiddleware();

const store = createStore(movieReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

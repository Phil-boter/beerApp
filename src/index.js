import ReactDOM from "react-dom"; // will render code in DOM
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import "bootstrap/dist/css/bootstrap.css";

// -------Inintializing fireBase--------------
import app from "./Firebase/config";
// -------Inintializing fireBase--------------
let elem = (
    <Provider store={store}>
        <App />
    </Provider>
);
ReactDOM.render(elem, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// reportWebVitals(console.log);

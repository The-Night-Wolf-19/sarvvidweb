import React, { useState, Fragment, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import PrivateRoute from "./utils/PrivateRoute";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import AlertComponent from "./components/AlertComponent/AlertComponent";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Icon from "@material-ui/core/Icon";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar/index";
import Card from "./components/Card/Card.js";
import CardHeader from "./components/Card/CardHeader.js";
import CardIcon from "./components/Card/CardIcon.js";
import CardBody from "./components/Card/CardBody.js";
import CardFooter from "./components/Card/CardFooter.js";
import GridItem from "./components/Grid/GridItem.js";
import Warning from "@material-ui/icons/Warning";
import Danger from "./components/Typography/Danger.js";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "./components/Grid/GridContainer.js";
// import './assets/styles/App.scss';
import styles from "./assets/jss/material-dashboard-react/views/dashboardStyle.js";
import reducers from "./reducers";
import { ViewFiles } from "./pages";
import RightPane from "./components/RightPane/RightPane";
import generatedummyFileSystem from "./utils/dummyFileSystem";
import Axios from "axios";
const useStyles = makeStyles(styles);
const rootEl = document.getElementById("root");
const store = createStore(
  reducers,
  {
    fileSystem:
      localStorage.getItem("fileSystem") &&
      Object.keys(localStorage.getItem("fileSystem")).length > 0
        ? JSON.parse(localStorage.getItem("fileSystem"))
        : generatedummyFileSystem(),
  },
  composeWithDevTools()
);

// export const fileChosenContext = React.createContext({
//   fileTypeChosen: "none",
//   chooseOpen: "false",
// });

function App() {
  const classes = useStyles();
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  const [a, seta] = useState(0);
  const [b, setb] = useState(0);
  // const [chosenFile, setChosenFile] = useState(false);
  // const [chosenFolder, setChosenFolder] = useState(false);
  // const [chosenType, setChosenType] = useState({
  //   fileTypeChosen: "none",
  //   chooseOpen: false,
  // });
  // const chooseClick = (typeChosen) => {
  //   // console.log(typeChosen);
  //   if (typeChosen === "none") {
  //     setChosenType({ fileTypeChosen: typeChosen, chooseOpen: false });
  //   } else {
  //     setChosenType({ fileTypeChosen: typeChosen, chooseOpen: true });
  //   }
  //   // if (typeChosen === "File") {
  //   //   setChosenFile(true);
  //   // }
  //   // else if(typeChosen==="Folder"){
  //   //   setChosenFolder(true);
  //   // }
  // };
  useEffect(() => {
    Axios(
      `http://103.155.73.35:4000/api/getdata/?ping=${localStorage.getItem(
        "ping"
      )}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*", // It can be used to overcome cors errors
          "Content-Type": "application/json",
          Authtoken: localStorage.getItem("authtoken"),
        },
        data: JSON.stringify({
          IMEI: localStorage.getItem("IMEI"),
        }),
      }
    ).then((res) => {
      console.log(res);
      seta((res.data.current_storage * res.data.filled_per).toFixed(2));
      setb(res.data.current_storage);
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <HashRouter>
          <Fragment>
            <div className="App">
              <Switch>
                <Route path="/login" exact={true}>
                  <LoginForm
                    showError={updateErrorMessage}
                    updateTitle={updateTitle}
                  />
                </Route>
                <PrivateRoute path="/">
                  <div className="Dashboard">
                    <Route path="*" component={Sidebar} />
                    <ViewFiles />
                    <RightPane a={a} b={b} title={title} />
                  </div>
                </PrivateRoute>
              </Switch>
              <AlertComponent
                errorMessage={errorMessage}
                hideError={updateErrorMessage}
              />
            </div>
          </Fragment>
        </HashRouter>
      </Router>
    </Provider>
  );
}

export default App;

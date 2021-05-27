import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";
import md5 from "md5";
import sarvvid from "../../assets/img/sarvvid.png";
import loginbg from "../../assets/img/loginbg.png";
import QRCode from "react-qr-code";
import Backdrop from "@material-ui/core/Backdrop";
import QRC from "./QRC/QRC.js";

const crypto = require("crypto");

const platform = require("platform");
const browser = platform.name + platform.version;
// console.log(browser);
const QRvalue = JSON.stringify({
  "browser-name": browser,
  timestamp: new Date(),
});
// const Hash = JSON.stringify({
//   hash: crypto.createHash("sha256").update(QRvalue).digest("hex"),
// });
const Hash = crypto.createHash("sha256").update(QRvalue).digest("hex");
// console.log(Hash);
function LoginForm(props) {
  const [state, setState] = useState({
    email: "",
    authtoken: "",
    piid: "",
    successMessage: null,
  });
  const [err, showerr] = useState(false);
  const [aerr, showautherr] = useState(false);
  const [dis, setdis] = useState(false);
  const [QR, setQR] = useState(false);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleQRCode = () => {
    setQR(!QR);
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      email: state.email,
      password: state.password,
    };
    console.log(state.email);
    console.log(state.authtoken);
    console.log(state.piid);
    if (state.authtoken.trim() == "" || state.piid.trim() == "") {
      showerr(true);
      showautherr(false);
    } else if (state.authtoken.length < 40 || state.authtoken.length > 40) {
      showautherr(true);
      showerr(false);
    } else {
      showautherr(false);
      showerr(false);
      localStorage.setItem("authtoken", state.authtoken);
      localStorage.setItem("ping", state.piid);
      localStorage.setItem("IMEI", state.email);
      axios
        .post(
          `http://103.155.73.35:4000/api/login/?IMEI=${state.email}&ping=${state.piid}`,
          {
            Accept: "application/json, text/plain, */*",
            Authtoken: state.authtoken, // It can be used to overcome cors errors
            "Content-Type": "application/json",
          }
        )
        .then(function (response) {
          console.log(response.data);
          if (response.data.code === 200) {
            const temp = response.data.data;
            var new_data = JSON.parse(localStorage.getItem("fileSystem"));
            var newEntry = {};
            newEntry.name = "SarvvidBox";
            newEntry.type = "__folder__";
            newEntry.creatorName = "";
            newEntry.size = 0;
            newEntry.path = "/SarvvidBox";
            newEntry.parentPath = "/";
            newEntry.children = [];
            newEntry.date = "";
            newEntry.parentID = md5("/" + "__folder__");
            const id_1 = md5("/SarvvidBox" + "__folder__");
            new_data[id_1] = newEntry;
            let i = 0;
            for (i = 0; i < temp.length; i++) {
              var newEntry_1 = {};
              newEntry_1.name = temp[i];
              newEntry_1.type = "__file__";
              newEntry_1.creatorName = "";
              newEntry_1.size = 0;
              newEntry_1.path = "/SarvvidBox/" + temp[i];
              newEntry_1.parentPath = "/SarvvidBox";
              newEntry_1.parentID = md5("/SarvvidBox" + "__folder__");
              newEntry_1.date = "";
              new_data[md5("/SarvvidBox/" + temp[i] + "__file__")] = newEntry_1;
              new_data[md5("/SarvvidBox" + "__folder__")].children.push(
                md5("/SarvvidBox/" + temp[i] + "__file__")
              );
            }
            console.log(new_data);
            localStorage.setItem("fileSystem", JSON.stringify(new_data));
            console.log("dfuysdgfuysdgfuysdgfsdfsdyfsyfds HI I am IN");
            setState((prevState) => ({
              ...prevState,
              successMessage: "Login successful. Redirecting to home page..",
            }));
            localStorage.setItem(ACCESS_TOKEN_NAME, 1);
            redirectToHome();
            props.showError(null);
          } else if (response.code === 204) {
            props.showError("Username and password do not match");
          } else {
            props.showError("Username does not exists");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/");
  };
  const redirectToRegister = () => {
    props.history.push("/register");
    props.updateTitle("Register");
  };
  return (
    <div className="loginPage">
      {/* <img className="loginBg" src={loginbg} alt=""></img> */}
      <div className="loginBgColor"></div>
      <img className="loginLogo" src={sarvvid} alt="Sarvvid AI" />
      <div className="login_form">
        <QRC
          click={handleQRCode}
          updateTitle={props.updateTitle}
          history={props.history}
        />
      </div>
      {/*  */}
    </div>
  );
}

export default withRouter(LoginForm);

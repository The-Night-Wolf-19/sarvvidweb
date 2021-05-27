import React, { useState } from "react";
import QRCode from "react-qr-code";
import Backdrop from "@material-ui/core/Backdrop";
import {
  API_BASE_URL,
  ACCESS_TOKEN_NAME,
} from "../../../constants/apiConstants";
import "./QRC.css";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import md5 from "md5";
const crypto = require("crypto");
const platform = require("platform");
const browser = platform.name + platform.version;
const QRvalue = JSON.stringify({
  "browser-name": browser,
  timestamp: new Date(),
});
const Hash = crypto.createHash("sha256").update(QRvalue).digest("hex");
// console.log(browser);
// const Hash = JSON.stringify({
//   hash: crypto.createHash("sha256").update(QRvalue).digest("hex"),
// });
// console.log(Hash);
const QRC = (props) => {
  var u = 1;
  const [state, setState] = useState({
    email: "",
    authtoken: "",
    piid: "",
    successMessage: null,
  });
  setInterval(() => {
    axios
      .post(`http://103.155.73.35:1200/barcodeweb/?barcodehash=${Hash}`, {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      })
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          localStorage.setItem("IMEI", response.data.IMEI);
          localStorage.setItem("authtoken", response.data.authtoken);
          localStorage.setItem("ping", response.data.pingid);
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
          props.updateTitle("Home");
          props.history.push("/");
          // props.showError(null);
          clearTimeout();
        } else {
          console.log("TRYING AGAIN<<<<<<<<<<<<<<");
        }
      });
  }, 3000);

  return (
    <Backdrop style={{ zIndex: "4001", opacity: "1", visibility: "visible" }}>
      <div className="login_QR">
        <div className="login_QR_instruction">
          <h3>To use SarvvidBox on your computer:</h3>
          <br></br>
          <ol>
            <li>Open SarvvidBox on your phone</li>
            <li>Tap Menu or Settings and select SarvvidBox Web</li>
            <li>Point your phone to this screen to capture the code</li>
          </ol>
        </div>
        <QRCode value={Hash} size={200} level={"Q"} />
        <div className="login_QR_close" onClick={props.click}>
          <CloseIcon fontSize="large" />
        </div>
      </div>
    </Backdrop>
  );
};

export default QRC;

import React from "react";
import QRCode from "react-qr-code";
import Backdrop from "@material-ui/core/Backdrop";
import "./QRC.css";
import CloseIcon from "@material-ui/icons/Close";

const crypto = require("crypto");
const platform = require("platform");
const browser = platform.name + platform.version;
// console.log(browser);
// const Hash = JSON.stringify({
//   hash: crypto.createHash("sha256").update(QRvalue).digest("hex"),
// });
// console.log(Hash);
const QRC = (props) => {
  const QRvalue = JSON.stringify({
    "browser-name": browser,
    timestamp: new Date(),
  });
  const Hash = crypto.createHash("sha256").update(QRvalue).digest("hex");
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

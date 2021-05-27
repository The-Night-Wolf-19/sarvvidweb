import React, { useState, useEffect } from "react";
import "./RightPane.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Chart } from "react-google-charts";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
import userGif from "../../assets/gif/user.gif";
import logoutGif from "../../assets/gif/logout.gif";
import upgradeGif from "../../assets/gif/upgrade.gif";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
const chartOptions = {
  pieHole: 0.6,
  slices: [
    {
      // color: "#2BB673",
      color: "red",
      // color: "black",
      // color: "#0f0",
      // offset: 0.05,
    },
    {
      color: "#05e395",
      // color: "black",
      // color: "#05e395",
      offset: 0.1,
    },
  ],
  legend: {
    position: "none",
  },
  tooltip: {
    showColorCode: true,
  },
  // pieSliceBorderColor: "#343951",
  pieSliceBorderColor: "white",
  chartArea: {
    left: 10,
    top: 20,
    bottom: 10,
    width: "100%",
    height: "90%",
  },
  fontName: "Roboto",
  backgroundColor: "none",
  // title: "Storage",
};
const useUpgradeStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    top: "5%",
    left: "7%",
    width: "66%",
    height: "90%",
    // backgroundColor: "#05e395",
    backgroundColor: "white",
    // backgroundImage: "linear-gradient(to bottom right,#00b3ff, #ecfaff )",
    // border: "2px solid #000",
    // boxShadow: "0 0 20px rgb(0, 195, 255)",
    borderRadius: "1%",
    padding: theme.spacing(2, 4, 3),
    color: "black",
    textAlign: "center",
  },
}));
const useUpgradeCounterStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      backgroundColor: "none",
    },
  },
}));
const RightPane = (props) => {
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const [upgradeCounter, setUpgradeCounter] = useState(0);
  const [userAnim, setUserAnim] = useState(true);
  const [LogoutAnim, setLogoutAnim] = useState(true);
  const [upgradeSlide, setUpgradeSlide] = useState(true);
  const classesUpgrade = useUpgradeStyles();
  const classesUpgradeCounter = useUpgradeCounterStyles();
  const current_plan = isNaN(props.b) ? 20 : props.b;
  useEffect(() => {
    setTimeout(() => {
      setUpgradeSlide(!upgradeSlide);
    }, 10000);
  }, [upgradeSlide]);
  let used = isNaN(props.a) ? 100 : (props.a / props.b) * 100;
  let unused = isNaN(props.b) ? 0 : ((props.b - props.a) / props.b) * 100;
  //Logout Functionality Starts
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  let title = capitalize(
    props.location.pathname.substring(1, props.location.pathname.length)
  );
  if (props.location.pathname === "/") {
    title = "Welcome";
  }

  // function renderLogout() {
  //   if (props.location.pathname === "/") {
  //     return (
  //       <div className="ml-auto">
  //         <button className="btn btn-danger" onClick={() => handleLogout()}>
  //           Logout
  //         </button>
  //       </div>
  //     );
  //   }
  // }
  function handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    props.history.push("/login");
  }
  //Logout Functionality Ends
  return (
    <div className="rightPane">
      <div className="rightPane_user">
        {/* <div className="user_icons">
          <i class="fa fa-bell-o bell_icon" aria-hidden="true"></i>
          &nbsp;&nbsp;
          <i class="fa fa-cog settings_icon" aria-hidden="true"></i>
        </div> */}
        <div
          className="user_info"
          onMouseEnter={() => setUserAnim(false)}
          onMouseLeave={() => setUserAnim(true)}
        >
          {/* <span className="username">{localStorage.getItem("IMEI")}&nbsp;</span> */}
          <span className="username">User&nbsp;</span>
          {userAnim ? (
            <AccountCircleIcon className="user_circle" />
          ) : (
            <img
              className="animated_icon"
              width={40}
              height={40}
              src={userGif}
              alt=""
            />
          )}
        </div>
        <div
          className="user_logoutDiv"
          onMouseEnter={() => setLogoutAnim(false)}
          onMouseLeave={() => setLogoutAnim(true)}
          onClick={() => handleLogout()}
        >
          <span className="logout_text">Logout &nbsp;</span>
          {LogoutAnim ? (
            <ExitToAppIcon className="user_logout" />
          ) : (
            <img
              className="animated_icon"
              width={40}
              height={40}
              src={logoutGif}
              alt=""
            />
          )}
        </div>
      </div>
      <hr />
      <div className="storage_detail">
        <h2 className="storage_detail_heading">Storage</h2>
        <Chart
          width={"100%"}
          height={"250px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Storage Status", "Size"],
            ["Used", used],
            ["Unused", unused],
          ]}
          options={chartOptions}
          rootProps={{ "data-testid": "1" }}
        />
        <p className="storage_total">
          {isNaN(props.b) ? "NaN" : props.b + " GB"}
        </p>
        <p className="storage_detail_desc">
          {isNaN(props.a) ? "NaN" : props.a} GB of{" "}
          {isNaN(props.b) ? "NaN" : props.b} GB used
        </p>
      </div>
      <button className="storage_button" onClick={() => setOpenUpgrade(true)}>
        Upgrade Storage
      </button>
      {/* <div className="storage_upgrade" onClick={() => setOpenUpgrade(true)}>
        {upgradeSlide ? (
          <img
            className="animated_upgrade_icon"
            width={300}
            height={310}
            src={upgradeGif}
            alt=""
          />
        ) : (
          [
            <p className="storage_heading storage_heading1">Get more space</p>,
            <p className="storage_heading">for Files</p>,
            <p className="storage_detail" style={{ marginTop: "3%" }}>
              More than 200 Gb for your files
            </p>,
            <button
              className="storage_button"
              onClick={() => setOpenUpgrade(true)}
            >
              Upgrade Storage
            </button>,
          ]
        )}
      </div> */}
      <div className="Detail-Modal">
        <Modal
          open={openUpgrade}
          // open={true}
          onClose={() => {
            setUpgradeCounter(0);
            setOpenUpgrade(!openUpgrade);
          }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="upgrade_modal"
        >
          <div className={classesUpgrade.paper}>
            <div className="div_upgrade_heading">
              <h2 id="simple-modal-title" className="upgradeStorageHeading">
                Upgrade Storage
              </h2>
              <hr style={{ borderTop: "1px solid rgba(0,179,255,0.3)" }} />
            </div>
            <div className="upgrade_plans_div">
              <div className="upgrade_plan_div">
                <div className="upgrade_plan_top">
                  <p className="upgrade_plan_recommendation">&nbsp;</p>
                  <p className="upgrade_plan_storage">20 GB</p>
                  <p className="upgrade_plan_recommendation">Free</p>
                  <p>&nbsp;</p>
                  {current_plan === 20 ? (
                    <button
                      type="button"
                      className="upgrade_plan_button"
                      disabled={true}
                    >
                      Current Plan
                    </button>
                  ) : (
                    <button type="button" className="upgrade_plan_button">
                      &#8377; 0/month
                    </button>
                  )}
                </div>
                <hr />
                <div className="upgrade_plan_bottom">
                  <p style={{ margin: "2%" }}>Base Plan Includes:</p>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">20 GB storage</span>
                  </div>
                </div>
              </div>
              {/* -------------------------------------- */}
              <div
                className="upgrade_plan_div"
                style={{ border: "5px solid rgb(0, 195, 255)" }}
              >
                <div className="upgrade_plan_top">
                  <p className="upgrade_plan_recommendation">Recommended</p>
                  <p className="upgrade_plan_storage">100 GB</p>
                  <p className="upgrade_plan_recommendation">&nbsp;</p>
                  <p>&nbsp;</p>
                  {current_plan === 100 ? (
                    <button
                      type="button"
                      className="upgrade_plan_button"
                      disabled={true}
                    >
                      Current Plan
                    </button>
                  ) : (
                    <button
                      type="button"
                      style={{ color: "white", background: "#00b3ff" }}
                      className="upgrade_plan_button"
                    >
                      &#8377; 130/month
                    </button>
                  )}
                </div>
                <hr />
                <div className="upgrade_plan_bottom">
                  <p style={{ margin: "2%" }}>Advanced Plan Includes:</p>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">100 GB storage</span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Access to Sarvvid experts
                    </span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Option to add your family
                    </span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Extra member benefits
                    </span>
                  </div>
                </div>
              </div>
              {/* -------------------------------------- */}
              <div className="upgrade_plan_div">
                <div className="upgrade_plan_top">
                  <p className="upgrade_plan_recommendation">&nbsp;</p>
                  <p className="upgrade_plan_storage">200 GB</p>
                  <p className="upgrade_plan_recommendation">&nbsp;</p>
                  <p>&nbsp;</p>
                  {current_plan === 200 ? (
                    <button
                      type="button"
                      className="upgrade_plan_button"
                      disabled={true}
                    >
                      Current Plan
                    </button>
                  ) : (
                    <button type="button" className="upgrade_plan_button">
                      &#8377; 210/month
                    </button>
                  )}
                </div>
                <hr />
                <div className="upgrade_plan_bottom">
                  <p style={{ margin: "2%" }}>Pro Plan Includes:</p>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">200 GB storage</span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Access to Sarvvid experts
                    </span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Option to add your family
                    </span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Extra member benefits
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="upgrade_plan_div">
                <div className="upgrade_plan_top">
                  <p className="upgrade_plan_recommendation">&nbsp;</p>
                  <p className="upgrade_plan_storage">20 GB</p>
                  <p className="upgrade_plan_recommendation">Free</p>
                  <p>&nbsp;</p>
                  {current_plan === 20 ? (
                    <button
                      type="button"
                      className="upgrade_plan_button"
                      disabled={true}
                    >
                      Current Plan
                    </button>
                  ) : (
                    <button type="button" className="upgrade_plan_button">
                      &#8377; 0/month
                    </button>
                  )}
                </div>
                <hr />
                <div className="upgrade_plan_bottom">
                  <p style={{ margin: "0.5%" }}>Base Plan Includes:</p>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">20 GB storage</span>
                  </div>
                </div>
              </div> */}
              {/* -------------------------------------- */}
              <div className="upgrade_plan_div">
                <div className="upgrade_plan_top">
                  <p className="upgrade_plan_recommendation">&nbsp;</p>
                  <p className="upgrade_plan_storage">500 GB</p>
                  <p className="upgrade_plan_recommendation">&nbsp;</p>
                  <p>&nbsp;</p>
                  {current_plan === 500 ? (
                    <button
                      type="button"
                      className="upgrade_plan_button"
                      disabled={true}
                    >
                      Current Plan
                    </button>
                  ) : (
                    <button type="button" className="upgrade_plan_button">
                      &#8377; 530/month
                    </button>
                  )}
                </div>
                <hr />
                <div className="upgrade_plan_bottom">
                  <p style={{ margin: "2%" }}>Advanced Plan Includes:</p>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">500 GB storage</span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Access to Sarvvid experts
                    </span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Option to add your family
                    </span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Extra member benefits
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default withRouter(RightPane);

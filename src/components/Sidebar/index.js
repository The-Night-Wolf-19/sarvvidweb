import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import { connect } from "react-redux";
import homeGif from "../../assets/gif/home.gif";
import myFilesGif from "../../assets/gif/myfiles.gif";
import recentFilesGif from "../../assets/gif/recentfiles.gif";
import sharedFileGif from "../../assets/gif/sharedfile.gif";
import fileRequestGif from "../../assets/gif/filerequest.gif";
import recycleBinGif from "../../assets/gif/recyclebin.gif";
import { generateTreeFromList } from "../../utils/fileSystem";
// import { Route } from "react-router-dom";
import { SideBarContainer, Root, ShowMenu } from "./styles";
import { addEntry, deleteEntry, setEntry } from "../../actions/fileSystem";
import { FOLDER } from "../../utils/constants";
import md5 from "md5";
import CustomizedMenus from "./AddBtn/CustomizedMenus";
import sarvvid from "../../assets/img/sarvvid.png";
import "./LeftPane.css";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useFileRequestStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    top: "30%",
    left: "19.5%",
    width: "50%",
    height: "40%",
    // backgroundColor: "#05e395",
    backgroundColor: "white",
    // backgroundImage: "linear-gradient(to bottom right,#00b3ff, #ecfaff )",
    border: "0.5px solid #000",
    // boxShadow: "0 0 20px rgb(0, 195, 255)",
    borderRadius: "0.85%",
    padding: theme.spacing(2, 4, 3),
    color: "black",
    textAlign: "center",
  },
}));

const Sidebar = ({ fileStructure, ...props }) => {
  // console.log("AAAAAAAAAAAAAAAAAAAA-->", fileStructure);
  let children = fileStructure[0].children;
  const [toggle, handleToggle] = useState(true);
  const [sideDrawerToggle, setSideDrawerToggle] = useState(false);
  const [home, setHome] = useState(true);
  const [myFiles, setMyFiles] = useState(true);
  const [recentFiles, setRecentFiles] = useState(true);
  const [sharedFiles, setSharedFiles] = useState(true);
  const [fileRequest, setFileRequest] = useState(true);
  const [recycleBin, setRecycleBin] = useState(true);
  const [handleFileRequest, setHandleFileRequest] = useState(false);
  const classesFileRequest = useFileRequestStyles();
  const [fileHash, setFileHash] = useState("");
  return (
    <div
      className="leftContainer"
      onMouseEnter={() => setSideDrawerToggle(true)}
      onMouseLeave={() => setSideDrawerToggle(false)}
    >
      {sideDrawerToggle ? (
        <div className="leftPane">
          <img className="sarvvid_logo" src={sarvvid} alt="Sarvvid AI"></img>
          <div className="leftPane_buttons">
            <div
              className="leftPane_buttons_button"
              onMouseEnter={() => setHome(false)}
              onMouseLeave={() => setHome(true)}
            >
              <Link to="/" className="home_link">
                {home ? (
                  <i class="fa fa-home" aria-hidden="true"></i>
                ) : (
                  <img
                    className="animated_icon"
                    width={40}
                    height={40}
                    src={homeGif}
                    alt=""
                  />
                )}
                &nbsp;Home
              </Link>
            </div>
            <div className="leftPane_folders">
              <SideMenu fileStructure={children} />
            </div>

            <div
              className="leftPane_buttons_button"
              onMouseEnter={() => setSharedFiles(false)}
              onMouseLeave={() => setSharedFiles(true)}
            >
              {sharedFiles ? (
                <i class="fa fa-users" aria-hidden="true"></i>
              ) : (
                <img
                  className="animated_icon"
                  width={40}
                  height={40}
                  src={sharedFileGif}
                  alt=""
                />
              )}
              &nbsp;Shared Files
            </div>

            <div
              className="leftPane_buttons_button"
              onMouseEnter={() => setFileRequest(false)}
              onMouseLeave={() => setFileRequest(true)}
              onClick={() => setHandleFileRequest(true)}
            >
              {fileRequest ? (
                <i class="fa fa-upload" aria-hidden="true"></i>
              ) : (
                <img
                  className="animated_icon"
                  width={40}
                  height={40}
                  src={fileRequestGif}
                  alt=""
                />
              )}
              &nbsp;File Request
            </div>

            <div
              className="leftPane_buttons_button"
              onMouseEnter={() => setRecycleBin(false)}
              onMouseLeave={() => setRecycleBin(true)}
            >
              {recycleBin ? (
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              ) : (
                <img
                  className="animated_icon"
                  width={40}
                  height={40}
                  src={recycleBinGif}
                  alt=""
                />
              )}
              &nbsp;Recycle Bin
            </div>
          </div>
          <div className="leftPane_new">
            <CustomizedMenus
              btnSize="long"
              addEntry={(value) => {
                console.log(value);
                props.addEntry({
                  ...value,
                });
              }}
              setEntry={(val) => props.setEntry(val)}
              currentpath={props.match.url}
              onEnterProgress={() => setSideDrawerToggle(false)}
            />
          </div>
        </div>
      ) : (
        <div className="leftPane_short">
          <img
            className="sarvvid_logo_short"
            src={sarvvid}
            alt="Sarvvid AI"
          ></img>
          <div className="leftPane_buttons">
            <div className="leftPane_buttons_button_short">
              <i class="fa fa-home" aria-hidden="true"></i>
            </div>

            <div className="leftPane_buttons_button_short">
              <i class="fa fa-users" aria-hidden="true"></i>
            </div>
            <div className="leftPane_buttons_button_short">
              <i class="fa fa-upload" aria-hidden="true"></i>
            </div>
            <div className="leftPane_buttons_button_short">
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </div>
          </div>
          <div className="leftPane_new_short">
            <CustomizedMenus
              btnSize="short"
              onEnterProgress={() => setSideDrawerToggle(false)}
            />
          </div>
        </div>
      )}
      <div className="FileRequestModal">
        <Modal
          open={handleFileRequest}
          onClose={() => {
            setHandleFileRequest(!handleFileRequest);
            setSideDrawerToggle(false);
          }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classesFileRequest.paper}>
            <div className="div_FileRequest_heading">
              <h2 id="simple-modal-title" className="FileRequestHeading">
                Download Shared File
              </h2>
              <hr style={{ borderTop: "1px solid rgba(0,179,255,0.3)" }} />
            </div>
            <div className="FileRequestBody">
              <p className="FileRequestInstruction">
                Enter File Hash to Download Shared File:
              </p>
              <form className="FileHash_Bar" noValidate autoComplete="off">
                <TextField
                  id="outlined-search"
                  className="FileHash_text"
                  label="File Hash"
                  type="search"
                  variant="outlined"
                  onChange={(event) => setFileHash(event.target.value)}
                />
              </form>
              <button
                className="FileRequest_button"
                onClick={() => {
                  setHandleFileRequest(!handleFileRequest);
                  setSideDrawerToggle(false);
                }}
              >
                Download File
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const fileStructure = generateTreeFromList(state.fileSystem);

  const path = ownProps.match.url;
  console.log(
    state.fileSystem[md5(path + FOLDER)].children.map(
      (childrenID) => state.fileSystem[childrenID]
    )
  );
  return {
    fileStructure,
  };
};

export default connect(mapStateToProps, { addEntry, deleteEntry, setEntry })(
  Sidebar
);

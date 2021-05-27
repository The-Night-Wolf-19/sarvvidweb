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
import { addEntry, deleteEntry } from "../../actions/fileSystem";
import { FOLDER } from "../../utils/constants";
import md5 from "md5";
import CustomizedMenus from "./AddBtn/CustomizedMenus1";
import sarvvid from "../../assets/img/sarvvid.png";
import "./LeftPane.css";

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

  return (
    // <SideBarContainer toggle={toggle}>
    //   <ShowMenu onClick={() => handleToggle(!toggle)} />
    //   <Link to="/" className="rootLink">
    //     <Root />
    //   </Link>
    //   <SideMenu fileStructure={children} />
    // </SideBarContainer>
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
              onMouseEnter={() => setMyFiles(false)}
              onMouseLeave={() => setMyFiles(true)}
            >
              {myFiles ? (
                <i class="fa fa-folder-o" aria-hidden="true"></i>
              ) : (
                <img
                  className="animated_icon"
                  width={40}
                  height={40}
                  src={myFilesGif}
                  alt=""
                />
              )}
              &nbsp;My Files
            </div>
            <div
              className="leftPane_buttons_button"
              onMouseEnter={() => setRecentFiles(false)}
              onMouseLeave={() => setRecentFiles(true)}
            >
              {recentFiles ? (
                <i class="fa fa-folder-open" aria-hidden="true"></i>
              ) : (
                <img
                  className="animated_icon"
                  width={40}
                  height={40}
                  src={recentFilesGif}
                  alt=""
                />
              )}
              &nbsp;Recent Files
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
              currentpath={props.match.url}
              // chooseClick={chooseClick}
              onEnterProgress={() => setSideDrawerToggle(false)}
              // onMouseLeave={() => setSideDrawerToggle(false)}
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
              <i class="fa fa-folder-o" aria-hidden="true"></i>
            </div>
            <div className="leftPane_buttons_button_short">
              <i class="fa fa-folder-open" aria-hidden="true"></i>
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
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const fileStructure = generateTreeFromList(state.fileSystem);
  // const fileStructure = generateTreeFromList(
  //   JSON.parse(localStorage.getItem("fileSystem"))
  // );
  // console.log("BBBBBBBBBBBBBBBBBBB---->>>>", fileStructure);
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

export default connect(mapStateToProps, { addEntry, deleteEntry })(Sidebar);

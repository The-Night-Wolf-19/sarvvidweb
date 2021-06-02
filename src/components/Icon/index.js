import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import { FILE, FOLDER } from "../../utils/constants";

import FileIcon from "../../assets/img/file.png";
// import FolderIcon from "../../assets/img/folder.png";
import FolderIcon from "../../assets/img/folder-icon.png";
import axios from "axios";
import { Container, Logo, Img, Name } from "./styles";
import Menu from "../Menu";
import FileInfo from "../FileInfo";
import Axios from "axios";
import fileDownload from "js-file-download";
import LoadingContainer from "../LoadingContainer/LoadingContainer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
class Icon extends Component {
  nodeRef = createRef();

  state = {
    visible: false,
    showInfo: false,
    style: {
      right: 0,
      left: 0,
    },
    loading: false,
  };

  componentDidMount() {
    document.addEventListener("contextmenu", this._handleContextMenu);

    document.addEventListener("click", this._handleMouseLeave);
  }

  componentWillUnmount() {
    document.removeEventListener("contextmenu", this._handleContextMenu);

    document.removeEventListener("click", this._handleMouseLeave);
  }

  _handleContextMenu = (event) => {
    event.preventDefault();

    const path = event.composedPath();

    const wasOutside = !path.includes(this.nodeRef.current) || false;

    if (wasOutside) {
      this.setState({
        visible: false,
        style: {
          right: 0,
          left: 0,
        },
        previousValue: {
          right: 0,
          left: 0,
        },
      });
      return;
    }

    const clickX = event.clientX;
    const clickY = event.clientY;
    // const screenW = window.innerWidth;
    // const screenH = window.innerHeight;
    // const rootW = this.nodeRef.current.offsetWidth;
    // const rootH = this.nodeRef.current.offsetHeight;

    // const right = screenW - clickX > rootW;
    const right = clickX;
    const left = !right;
    // const top = screenH - clickY > rootH;
    const top = clickY;
    const bottom = !top;

    const style = {
      left: 0,
      top: 0,
    };

    if (right) {
      style.left = `${clickX}`;
    }

    if (left) {
      style.left = `${clickX}`;
    }

    if (top) {
      style.top = `${clickY}`;
    }

    if (bottom) {
      style.top = `${clickY}`;
    }

    const prevStyle = {
      top: style.top,
      left: style.left,
    };

    this.setState({
      style,
      visible: true,
      prevStyle,
    });
  };

  _handleMouseLeave = (event) => {
    const { visible } = this.state;
    const wasOutside = !(event.target.contains === this.nodeRef.current);

    if (wasOutside && visible)
      this.setState({
        visible: false,
        style: {
          right: 0,
          left: 0,
        },
      });
  };

  _handleClick = (event) => {
    const { visible } = this.state;
    const wasOutside = !(event.target.contains === this.nodeRef);

    if (wasOutside && visible)
      this.setState({
        visible: false,
        style: {
          right: 0,
          left: 0,
        },
      });
  };

  _handleScroll = () => {
    const { visible } = this.state;

    if (visible)
      this.setState({
        visible: false,
        style: {
          right: 0,
          left: 0,
        },
      });
  };

  handleDelete = () => {
    this.props.deleteFn();
  };

  enterFolder = () => {
    if (this.props.entry.type === FOLDER)
      this.props.history.push(this.props.entry.path);
  };

  render() {
    const { entry } = this.props;
    let ext = entry.name.split(".").filter((el) => el);

    ext = ext.length >= 2 ? ext[ext.length - 1] : "";

    return (
      <Container ref={this.nodeRef} onClick={() => this.enterFolder()}>
        <Logo onClick={() => this.enterFolder()}>
          <Img src={entry.type == FILE ? FileIcon : FolderIcon} />
          {entry.type == FILE ? <span>{`.${ext}`}</span> : ""}
        </Logo>
        <Name>{entry.name}</Name>
        {this.state.visible && (
          <Menu
            style={this.state.style}
            content={[
              {
                info: "Download",
                onClick: () => {
                  this.setState({ loading: true });
                  axios
                    .request({
                      method: "get",
                      url: `http://103.155.73.35:3000/cat?filehash=${
                        entry.name
                      }&IMEI=${localStorage.getItem(
                        "IMEI"
                      )}&ping=${localStorage.getItem("ping")}`,
                      headers: {
                        Accept: "application/json, text/plain, */*",
                        Authtoken: localStorage.getItem("authtoken"),
                        "Content-Type": "application/json",
                      },
                      responseType: "blob",
                    })
                    .then((response) => {
                      this.setState({ loading: false });
                      fileDownload(response.data, entry.name);

                      console.log(response);
                    });
                },
              },
              {
                info: "Share",
                onClick: () =>
                  this.setState({
                    showInfo: true,
                  }),
              },
              {
                info: "Delete",
                style: { color: "red" },
                onClick: () => {
                  this.handleDelete();
                },
              },
            ]}
          />
        )}
        {this.state.showInfo ? (
          <FileInfo
            title="File Info"
            style={this.state.prevStyle}
            closeFn={() =>
              this.setState({
                showInfo: false,
              })
            }
            entry={{
              type: entry.type,
              name: entry.name,
              path: "/",
              ext: ext,
              size: entry.size,
              date: entry.date,
              creatorName: entry.creatorName,
            }}
          />
        ) : (
          ""
        )}
        {this.state.loading ? <LoadingContainer /> : ""}
      </Container>
    );
  }
}

export default withRouter(Icon);

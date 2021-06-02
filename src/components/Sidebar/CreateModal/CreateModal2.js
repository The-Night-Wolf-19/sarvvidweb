import { Modal } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { Formik, Field } from "formik";
import withModal from "../../../elements/Modal";
import axios from "axios";
import { FILE, FOLDER } from "../../../utils/constants";
import { useDropzone } from "react-dropzone";
import { Container, Error, Top, Toggle, Form } from "./styles";
import md5 from "md5";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import createNewGif from "../../../assets/gif/createnew.gif";
const useCreateNewStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    top: "30%",
    left: "30%",
    width: 400,
    height: 300,
    // backgroundColor: "#05e395",
    backgroundColor: "#d7f4fe",
    // backgroundImage: "linear-gradient(to bottom right,#00b3ff, #ecfaff )",
    border: "2px solid #000",
    boxShadow: "0 0 20px rgb(0, 195, 255)",
    padding: theme.spacing(2, 4, 3),
    color: "black",
    textAlign: "center",
  },
}));

const CreateModal = (_props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    getFilesFromEvent: (event) => myCustomFileGetter(event),
  });
  const [type, handleType] = useState(FILE);
  const [files, selectedfiles] = useState([]);
  const onFileChange = (event) => {
    // Update the state
    console.log(event.target.files);
    console.log(event.target.files[0].webkitRelativePath);
    selectedfiles(event.target.files);
    console.log(files);
  };
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();
    setLoading(true);
    // Update the formData object
    let i = 0;
    formData.append("IMEI", "c1a75a2b8a73f014");
    formData.append("name", "avatar");
    for (i = 0; i < files.length; i++) {
      formData.append("filedata", files[i]);
    }
    // Details of the uploaded file
    var sys_data = localStorage.getItem("fileSystem");

    // Request made to the backend api
    if (localStorage.getItem("authtoken")) {
      console.log(localStorage.getItem("authtoken"));
    } else {
      localStorage.setItem("authtoken", "65aa9ad20c8a2e900c8a65aa51f66c140c8a");
    }
    const at = localStorage.getItem("authtoken");
    console.log("fsdfsdddddddddddddddDDDDDDDD", at);
    axios({
      method: "post",
      url: "http://103.155.73.35:3000/upload?ping=15",
      headers: {
        "Content-type": "multipart/form-data",
        Authtoken: at,
      },
      data: formData,
      onUploadProgress: function (progressEvent) {
        if (totalProgress != progressEvent.total) {
          setTotalProgress(progressEvent.total);
        }

        setProgress(progressEvent.loaded);
      },
    }).then((response) => {
      if (response.data.newtoken) {
        console.log(response.data.newtoken);
        localStorage.setItem("authtoken", response.data.newtoken);
        const values = {
          type: FOLDER,
          name: "",
        };
        const data = JSON.parse(localStorage.getItem("fileSystem"));
        const pid = md5(_props.currentpath + FOLDER);

        var newEntry = {};
        newEntry.parentPath = _props.currentpath;
        newEntry.name = files[0].webkitRelativePath.split("/")[0];
        newEntry.type = FOLDER;
        newEntry.path =
          newEntry.parentPath === "/"
            ? `${newEntry.parentPath}${newEntry.name}`
            : `${newEntry.parentPath}/${newEntry.name}`;
        const id = md5(newEntry.path + newEntry.type);

        if (newEntry.type === FOLDER) {
          newEntry.children = [];
        }
        newEntry.creatorName = "";
        newEntry.size = 0;
        newEntry.parentID = pid;
        data[id] = newEntry;
        data[newEntry.parentID].children.push(id);

        var dic = {};
        var folder = {};
        var currentpath =
          _props.currentpath + files[0].webkitRelativePath.split("/")[0];
        var currentid = id;
        console.log(currentpath);
        let k = 0;
        var files_new = [];
        for (k = 0; k < files.length; k++) {
          temp = files[k].webkitRelativePath.split("/").slice(1).join("/");
          files_new.push(temp);
        }
        let i = 0;
        for (i = 0; i < files_new.length; i++) {
          let j = 0;
          var temp = files_new[i].split("/");
          console.log(temp);
          for (j = 0; j < temp.length; j++) {
            if (!currentpath.includes(temp.slice(0, j).join("/"))) {
              currentpath = currentpath + temp.slice(0, j).join("/");
            }

            console.log(currentpath);
            if (temp[j].includes(".") && j == temp.length - 1) {
              console.log(dic);
              if (!(currentpath in dic)) {
                currentid = md5(currentpath + FOLDER);
                dic[currentpath] = currentid;
              } else {
                console.log("FOUND............");
                currentid = dic[currentpath];
              }
              var newEntry = {};
              newEntry.parentPath = currentpath;
              newEntry.name = temp[temp.length - 1];
              newEntry.path =
                newEntry.parentPath === "/"
                  ? `${newEntry.parentPath}${newEntry.name}`
                  : `${newEntry.parentPath}/${newEntry.name}`;
              newEntry.type = FILE;
              newEntry.creatorName = "";
              newEntry.size = 0;
              newEntry.parentID = currentid;
              const id = md5(newEntry.path + newEntry.type);
              data[id] = newEntry;
              console.log("data", data);
              console.log("NewEntry", newEntry);
              data[newEntry.parentID].children.push(id);
            } else {
              console.log(
                "CREATING FOLDER>>>>>>>>>>>>>>>>>>>>>>>>>> of currentpath ",
                currentpath
              );
              if (!(currentpath in dic)) {
                currentid = md5(currentpath + FOLDER);
                dic[currentpath] = currentid;
              } else {
                console.log("FOUND............");
                currentid = dic[currentpath];
              }
              if (!(temp[j] in folder)) {
                folder[temp[j]] = 1;
                var newEntry = {};
                newEntry.parentPath = currentpath;
                newEntry.name = temp[j];
                newEntry.path =
                  newEntry.parentPath === "/"
                    ? `${newEntry.parentPath}${newEntry.name}`
                    : `${newEntry.parentPath}/${newEntry.name}`;
                newEntry.type = FOLDER;
                newEntry.creatorName = "";
                newEntry.size = 0;
                newEntry.children = [];
                newEntry.parentID = currentid;
                const id = md5(newEntry.path + newEntry.type);
                data[id] = newEntry;
                console.log("data", data);
                console.log("NewEntry", newEntry);
                data[newEntry.parentID].children.push(id);
                console.log("created");
                currentpath = currentpath + "/";
              } else {
              }
            }
          }
        }
        localStorage.setItem("fileSystem", JSON.stringify(data));
        if (response.status == 200) {
          setLoading(false);
        }
      } else {
        console.log(response.data.notsecure);
        alert("Please Try Again");
        setLoading(false);
      }
    });
  };
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const classesCreateNew = useCreateNewStyles();
  //   const [createNewAnim, setCreateNewAnim] = useState(true);
  return (
    <div className="createNewModal">
      <Modal
        open={_props.open}
        onClose={() => {
          _props.closeFn();
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classesCreateNew.paper}>
          <Container>
            {_props.type === "File" ? (
              <h2>Upload File</h2>
            ) : (
              <h2>Upload Folder</h2>
            )}
            <div
              {...getRootProps({ className: "dropzone" })}
              //   style={{
              //     width: "96%",
              //     height: "30%",
              //     border: "1px solid black",
              //     alignItems: "center",
              //   }}
            >
              <img
                className="animated_icon"
                width={150}
                height={150}
                src={createNewGif}
                alt=""
              />
              {_props.type === "File"
                ? [
                    <input
                      {...getInputProps()}
                      type="file"
                      onChange={onFileChange}
                    />,
                    <p>Click Here to Select Files</p>,
                  ]
                : [
                    <input
                      {...getInputProps()}
                      directory=""
                      webkitdirectory=""
                      type="file"
                      onChange={onFileChange}
                    />,
                    <p>Click Here to Select Folder</p>,
                  ]}
            </div>
            <button
              style={{
                // width: "50%",
                background: "#00b3ff",
                border: "2px solid #4dc9ff",
                color: "#ecfaff",
                height: "50px",
                fontSize: "20px",
                fontWeight: "500",
                // fontSize: "20px",
                // fontWeight: "500",
                // transition-duration: "0.5s",
                // margin-top: 20px;"
              }}
              onClick={onFileUpload}
            >
              Upload!
            </button>
            {loading ? (
              <div style={{ width: "100%" }}>
                <Box display="flex" alignItems="center">
                  <Box width="100%" mr={1}>
                    <LinearProgress
                      variant="determinate"
                      value={(progress * 100) / totalProgress}
                    />
                  </Box>
                  <Box minWidth={35}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >{`${Math.round(
                      (progress * 100) / totalProgress
                    )}%`}</Typography>
                  </Box>
                </Box>
              </div>
            ) : (
              " "
            )}
          </Container>
        </div>
      </Modal>
    </div>
  );
};

async function myCustomFileGetter(event) {
  const files = [];
  // Retrieves the files loaded by the drag event or the select event
  const fileList = event.dataTransfer
    ? event.dataTransfer.files
    : event.target.files;

  for (var i = 0; i < fileList.length; i++) {
    const file = fileList.item(i);
    files.push(file);
  }

  // files returned from this function will be acceptedFiles
  return files;
}

export default CreateModal;

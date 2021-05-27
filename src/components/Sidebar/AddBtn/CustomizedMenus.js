import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import { NavigateBeforeSharp } from "@material-ui/icons";
import CreateModal from "../CreateModal/CreateModal";
import AddIcon from "@material-ui/icons/Add";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openCreateModal, setOpenCreateModal] = useState({
    open: false,
    type: "None",
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // props.chooseClick("none");
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{ height: "60px", borderRadius: "60px", outline: "none" }}
      >
        {props.btnSize === "short" ? "" : <span>Create New&nbsp;</span>}
        <AddIcon
          fontSize="medium"
          style={{ color: "#00b3ff", fontSize: "30px" }}
        />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={() => {
          // if(openCreateModal.type==="None")
          handleClose();
        }}
      >
        <StyledMenuItem
          onClick={() => {
            setOpenCreateModal({ open: true, type: "File" });
          }}
        >
          <ListItemIcon>
            <InsertDriveFileIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Upload File" />
        </StyledMenuItem>

        <StyledMenuItem
          onClick={() => {
            setOpenCreateModal({ open: true, type: "Folder" });
          }}
        >
          <ListItemIcon>
            <CloudUploadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Upload Folder" />
        </StyledMenuItem>
        {/* <StyledMenuItem>
          <ListItemIcon>
            <CreateNewFolderIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="New Folder" />
        </StyledMenuItem> */}
      </StyledMenu>
      {openCreateModal.open ? (
        <CreateModal
          open={openCreateModal.open}
          type={openCreateModal.type}
          title="Create New"
          closeFn={() => setOpenCreateModal({ open: false, type: "None" })}
          addEntry={(value) => props.saveEntry(value)}
          currentpath={props.currentpath}
        />
      ) : (
        " "
      )}
    </div>
  );
}

import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./loading.json";
import styled from "styled-components";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    // zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    zIndex: "4001",
  },
}));
const LoadingContainer = () => {
  const classes = useStyles();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Loading>
      <Backdrop
        className={classes.backdrop}
        style={{ zIndex: "4001", opacity: "1", visibility: "visible" }}
      >
        <Lottie options={defaultOptions} width={200} height={200} />
      </Backdrop>
    </Loading>
  );
};

export default LoadingContainer;

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

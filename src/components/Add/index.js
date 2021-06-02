import React, { useState, memo } from "react";
import styled from "styled-components";
import CreateNew from "../CreateNew";
import addGif from "../../assets/gif/add.gif";
// import { fileChosenContext } from "../../App";
function Add(props) {
  const [open, handleOpen] = useState(false);
  const [addAnim, setAddAnim] = useState(true);
  return (
    <Adder
      onMouseEnter={() => setAddAnim(false)}
      onMouseLeave={() => setAddAnim(true)}
    >
      {open ? (
        <CreateNew
          title="Create New"
          closeFn={() => handleOpen(false)}
          addEntry={(value) => props.saveEntry(value)}
          currentpath={props.currentpath}
        />
      ) : (
        <Container onClick={() => handleOpen(true)}>
          {addAnim ? (
            "+"
          ) : (
            <img
              className="animated_icon"
              width={100}
              height={100}
              src={addGif}
              alt=""
            />
          )}
        </Container>
      )}
    </Adder>
  );
}

export default memo(Add);

const Adder = styled.div`
  // width: 316px;
  min-width: 15%;
  // max-width: 15%;
  color: #005288;
  padding-bottom: 3%;
  padding-top: 3%;
  padding-left: 1%;
  padding-right: 1%;
  background-color: #b2d6f8;
  margin-left: 4%;
  border-radius: 10px;
  margin-bottom: 2.5%;
  cursor: default;
  // position: relative;
  display: flex;
  flex-direction: row;
  &:hover {
    position: relative;
    box-shadow: 0 0 20px rgb(0, 195, 255);
  }
`;
const Container = styled.div`
  height: 94%;
  width: 98%;
  // border: 3px dashed #dee0e4;
  border: 3px dashed grey;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  align-items: center;
  font-size: 30px;
  // color: #dee0e4;
  color: grey;
  cursor: copy;
`;

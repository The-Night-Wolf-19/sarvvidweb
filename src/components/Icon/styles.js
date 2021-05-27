import styled from "styled-components";

export const Container = styled.div`
  width: 15%;
  min-width: 15%;
  max-width: 15%;
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
  &:hover {
    position: relative;
    box-shadow: 0 0 20px rgb(0, 195, 255);
  }
`;
// height: 117px;
// width: 96px;
// display: flex;
// cursor: pointer;
// flex-direction: column;
// justify-content: space-between;
// align-items: center;
// font-family: Lato, sans-serif;
// font-weight: lighter;
// color: #535b62;
// margin-bottom: 22px;
// padding: 8px 7px 10px 10px;
// border-radius: 8px;
// transition: background 230ms ease-in;
// &:hover {
//   background: #e6f5ff;
// }

export const Logo = styled.div`
  position: relative;
  & span {
    position: absolute;
    bottom: 10px;
    left: 4px;
    width: 96%;
    font-weight: bold;
    color: white;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const Img = styled.img`
  width: 65%;
`;

export const Name = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

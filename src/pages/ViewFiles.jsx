// import React, { Component } from 'react';
// import styled from 'styled-components';
// import { Route } from 'react-router-dom';

// import Navigation from '../components/Navigation';
// import SearchBar from '../components/SearchBar';
// import Grid from '../components/Grid';

// export default class ViewFiles extends Component {
//   render() {
//     return (
//       <Container>
//         <TopBar>
//           <Navigation />
//           <SearchBar />
//         </TopBar>
//         <Route path="*" component={Grid} />
//       </Container>
//     );
//   }
// }
 
// const Container = styled.div`
//   padding: 41px;
//   margin-left: -500px;
//   transition: margin-left 250ms ease-in;
//   @media screen and (max-width: 768px) {
//     margin-left: 0px;
//     padding: 55px 15px 15px 15px;
//   }
// `;

// const TopBar = styled.div`
//   display: flex;
//   margin-left : 0px;
//   @media screen and (max-width: 768px) {
//     display: block;
//   }
// `;
import React from "react";
import "./MiddlePane.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card/Card";
import { Route } from 'react-router-dom'; 
import Navigation from '../components/Navigation'
import SearchBar from '../components/SearchBar';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
})); 
const ViewFiles = () => {
  const classes = useStyles();
  return (
    <div className="middlePane">
      <div className="middlePane_searchBar">
        <SearchBar/>
      </div>
      <div className="middlePane_cards">
        <Navigation />
        <Route path="*"
        // render={()=>(<Card chosenType={props.chosenType}/>)} 
        component={Card} 
        />
      </div>
      {/* <div className="middlePane_recent">
        <div className="recent_heading">
          <h2>Recent Files</h2>
          <h4>View All</h4>
        </div>
        <div className="recent_content">
          <div className="file_content">
            <div>
              <i class="fa fa-file-image-o" aria-hidden="true"></i>
              <span>&nbsp;Logo.jpg</span>
            </div>
            <span>1.2Mb</span>
          </div>
          <div className="file_content">
            <div>
              <i class="fa fa-file-code-o" aria-hidden="true"></i>
              <span>&nbsp;LandingPage.js</span>
            </div>
            <span>16KB</span>
          </div>
          <div className="file_content">
            <div>
              <i class="fa fa-film" aria-hidden="true"></i>
              <span>&nbsp;Snyder-Cut.mp4</span>
            </div>
            <span>975Mb</span>
          </div>
          <div className="file_content">
            <div>
              <i class="fa fa-file-word-o" aria-hidden="true"></i>
              <span>&nbsp;DailyReport.docx</span>
            </div>
            <span>28KB</span>
          </div>
          <div className="file_content">
            <div>
              <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
              <span>&nbsp;Presentation.pdf</span>
            </div>
            <span>12.8Mb</span>
          </div>
          <div className="file_content">
            <div>
              <i class="fa fa-file-image-o" aria-hidden="true"></i>
              <span>&nbsp;Screenshot20042021093522.png</span>
            </div>
            <span>800KB</span>
          </div>
          <div className="file_content">
            <div>
              <i class="fa fa-file-code-o" aria-hidden="true"></i>
              <span>&nbsp;BinarySearch.cpp</span>
            </div>
            <span>3104KB</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ViewFiles;

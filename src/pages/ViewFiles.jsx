
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
        component={Card} 
        />
      </div>
    </div>
  );
};

export default ViewFiles;

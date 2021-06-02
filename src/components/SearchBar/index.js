import React, { Component, createRef, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { LOCAL } from "../../utils/constants";
import { showPathEntries } from "../../utils/fileSystem";

import MagnifyIcon from "./MagnifyIcon";
import SearchResults from "./SearchResults";
import Filter from "./Filter";
import { Container, Line, Input, Search } from "./styles";
import TextField from "@material-ui/core/TextField";
// import { makeStyles } from "@material-ui/core/styles";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "25ch",
//     },
//   },
// }));
class SearchBar extends Component {
  _ref = createRef();
  state = {
    term: "",
    width: 0,
    mode: LOCAL,
    data: null,
  };

  componentDidMount() {
    this.setState(() => {
      const { width } = getComputedStyle(this._ref.current);
      return {
        width,
      };
    });
  }

  handleMode = (mode) => {
    this.setState({
      mode,
    });
  };

  render() {
    return (
      <div className="middlePane_searchBar" ref={this._ref}>
        <form className="search_bar" noValidate autoComplete="off">
          <TextField
            id="outlined-search"
            className="searchBar_text"
            label="Search"
            type="search"
            variant="outlined"
            onChange={(event) =>
              this.setState({ term: event.target.value.toLowerCase() })
            }
          />
        </form>
        {this.state.term.length > 0 ? (
          <Container style={{ width: "35%" }}>
            <Filter mode={this.state.mode} handleMode={this.handleMode} />
            <Line />
            <SearchResults
              // style={{ width: "50%" }} //wi dth:1136.47px
              term={this.state.term}
              isDraggable={false}
              data={
                this.state.mode === LOCAL
                  ? this.props.entry
                  : Object.keys(this.props.fileSystem).map(
                      (id) => this.props.fileSystem[id]
                    )
              }
              closeResult={() => this.setState({ term: "" })}
            />
          </Container>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.location.pathname;
  return {
    entry: showPathEntries(path, state.fileSystem),
    fileSystem: state.fileSystem,
  };
};

export default withRouter(connect(mapStateToProps)(SearchBar));

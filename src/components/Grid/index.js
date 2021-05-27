import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import md5 from "md5";
import SEO from "../../components/SEO";

import { showPathEntries, entriesAreSame } from "../../utils/fileSystem";
import { FOLDER } from "../../utils/constants";
import { addEntry, deleteEntry } from "../../actions/fileSystem";

import Icon from "../Icon";
import Add from "../Add";

import FolderIcon from "../../assets/img/folder.png";
class Grid extends Component {
  componentDidMount() {
    // let j = 0;
    // for(j=0;j<this.props.fileSystem.length;j++){
    //    if(this.props.fileSystem[md5("/SarvvidBox" + FOLDER)]){
    //      this.props.entry.push(this.props.fileSystem)
    //    }
    // }
    console.log(this.props.fileSystem[md5("/SarvvidBox" + FOLDER)]);
    if (
      !Object.keys(this.props.fileSystem).includes(
        md5(this.props.location.pathname + FOLDER)
      )
    ) {
      this.props.history.push("/");
    }
    console.log(this.props.entry);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.location.pathname === nextProps.location.pathname) {
  //     if (entriesAreSame(this.props.entry, nextProps.entry)) {
  //       return false;
  //     }
  //     return true;
  //   }
  //   return true;
  // }

  render() {
    return (
      <Container>
        <SEO
          url={this.props.match.url}
          title={this.props.match.url}
          image={FolderIcon}
          description={this.props.match.url}
        />
        {this.props.entry.map((entry, _) => (
          <Icon
            entry={entry}
            index={_}
            key={`${entry.path}_${entry.type}`}
            deleteFn={() => {
              this.props.deleteEntry(md5(entry.path + entry.type));
            }}
          />
        ))}
        <Add
          saveEntry={(value) => {
            console.log(value);
            this.props.addEntry({
              ...value,
            });
          }}
          currentpath={this.props.match.url}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.match.url);
  const path = ownProps.match.url;
  console.log(
    state.fileSystem[md5(path + FOLDER)].children.map(
      (childrenID) => state.fileSystem[childrenID]
    )
  );

  return {
    entry: state.fileSystem[md5(path + FOLDER)]
      ? state.fileSystem[md5(path + FOLDER)].children.map(
          (childrenID) => state.fileSystem[childrenID]
        )
      : [],
    fileSystem: state.fileSystem,
  };
};

export default connect(mapStateToProps, { addEntry, deleteEntry })(Grid);

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 40px 0;
`;

import React, { Component } from "react";
import "./Card.css";
import { connect } from "react-redux";
import md5 from "md5";
import SEO from "../../components/SEO";

import { showPathEntries, entriesAreSame } from "../../utils/fileSystem";
import { FOLDER } from "../../utils/constants";
import { addEntry, deleteEntry } from "../../actions/fileSystem";

import Icon from "../../components/Icon";
import Add from "../../components/Add";
import FolderIcon from "../../assets/img/folder-icon.png";
// import FolderIcon from "../../assets/img/folder.png";
class Card extends Component {
  componentDidMount() {
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
  render() {
    return (
      <div className="midPane_cards">
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

        {/* <Add
          saveEntry={(value) => {
            console.log(value);
            this.props.addEntry({
              ...value,
            });
          }}
          currentpath={this.props.match.url}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.match.url);
  const path = ownProps.match.url;
  console.log(
    state.fileSystem
    // state.fileSystem[md5(path + FOLDER)].children.map(
    //   (childrenID) => state.fileSystem[childrenID]
    // )
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

export default connect(mapStateToProps, { addEntry, deleteEntry })(Card);

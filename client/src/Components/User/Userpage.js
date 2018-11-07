import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Header from "../Header/Header";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CreateUser from "./CreateUser";
import CloseIcon from "@material-ui/icons/Close";

class UserPage extends Component {
  state = {
    create: false
  };
  handleAdd = () => {
    this.setState({ create: !this.state.create });
  };
  render() {
    return (
      <div>
        <Header
          history={this.props.history}
          username={this.props.username}
          usertype={this.props.usertype}
        />
        <div style={{ display: "flex" }}>
          <div
            style={{
              textAlign: "center",
              fontSize: "25px",
              flex: 1
            }}
          >
            <p>Name : {this.props.username}</p>
            <p> User Type: {this.props.usertype}</p>
          </div>
          <div style={{ flex: 1 }}>
            <Button onClick={this.handleAdd}>
              {!this.state.create && <AddIcon />}
              {this.state.create && <CloseIcon />}
            </Button>
            {this.state.create && <CreateUser />}
          </div>
        </div>
      </div>
    );
  }
}
export default UserPage;

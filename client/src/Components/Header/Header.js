import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import FileIcon from "@material-ui/icons/Work";
import UserIcon from "@material-ui/icons/Person";
import Axios from "Utils/Axios";
import Hidden from "@material-ui/core/Hidden";
import styles from "./headerStyle";
import { Popover } from "@material-ui/core";

class MenuAppBar extends React.Component {
  state = {
    anchorEl: null,
    project: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleProject = event => {
    this.setState({ project: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    this.setState({ project: null });
  };

  handleLogout = () => {
    let that = this;
    Axios.logout(function() {
      //that.setState({logged: 'login', name: '', username: ''})
      that.props.history.push("/");
    });
    this.setState({ anchorEl: null });
  };

  setpage = (e, n) => {
    console.log(n + "setpage");
    this.props.setpage(n);
  };

  render() {
    const { anchorEl, project } = this.state;
    let button = (
      <Button
        color="inherit"
        style={{
          color: "#FFF",
          fontFamily: "Dekko",
          fontSize: 36,
          textTransform: "none",
          paddingRight: 50,
          paddingLeft: 50
        }}
      >
        ProTrack
      </Button>
    );

    let head = "",
      menu = "";
    console.log(this.props.usertype);
    if (this.props.usertype === "admin") {
      head = (
        <Button
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          color="inherit"
          onClick={this.handleMenu}
        >
          <MenuIcon />
        </Button>
      );
      menu = (
        <Popover
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{
            horizontal: "center",
            vertical: "top"
          }}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => this.props.history.push("/product")}>
            Products
          </MenuItem>
          <MenuItem onClick={() => this.props.history.push("/step")}>
            Steps
          </MenuItem>
          <MenuItem onClick={() => this.props.history.push("/specification")}>
            Specifications
          </MenuItem>
        </Popover>
      );
    }
    return (
      <div>
        <AppBar position="static">
          <Hidden only={["xs", "sm"]}>
            <Toolbar>
              <div style={{ flex: 1 }}>
                {button}

                <Button
                  color="inherit"
                  onClick={() => this.props.history.push("/createproject")}
                  style={{
                    color: "#FFF",
                    fontFamily: "Dekko",
                    fontSize: 20,
                    textTransform: "none",
                    padding: 9
                  }}
                  //onClick={() => this.props.history.push("/project/ongoing")}
                >
                  Running Project
                </Button>
                <Button
                  color="inherit"
                  style={{
                    color: "#FFF",
                    fontFamily: "Dekko",
                    fontSize: 20,
                    textTransform: "none",
                    padding: 9
                  }}
                  value="pendingproject"
                  onClick={() => this.props.history.push("/project/pending")}
                >
                  Pending Project
                </Button>
                <Button
                  color="inherit"
                  style={{
                    color: "#FFF",
                    fontFamily: "Dekko",
                    fontSize: 20,
                    textTransform: "none",
                    padding: 9
                  }}
                  onClick={() => this.props.history.push("/project/history")}
                >
                  Project History
                </Button>

                {head}
                {menu}
              </div>

              <Button
                onClick={this.handleLogout}
                color="inherit"
                style={{
                  color: "#FFF",
                  fontFamily: "Dekko",
                  fontSize: 20,
                  textTransform: "none",
                  padding: 4
                }}
              >
                {this.props.username}
              </Button>
            </Toolbar>
          </Hidden>
          <Hidden only={["md", "lg", "xl"]}>
            <Toolbar
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center"
              }}
            >
              <Button
                aria-owns={project ? "simple-menu" : null}
                aria-haspopup="true"
                color="inherit"
                onClick={this.handleProject}
              >
                <FileIcon />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={project}
                open={Boolean(project)}
                anchorOrigin={{
                  horizontal: "right",
                  vertical: "bottom"
                }}
                onClose={this.handleClose}
              >
                <MenuItem
                  onClick={() => this.props.history.push("/project/ongoing")}
                >
                  Running Project
                </MenuItem>
                <MenuItem
                  onClick={() => this.props.history.push("/project/pending")}
                >
                  Pending Project
                </MenuItem>
                <MenuItem
                  onClick={() => this.props.history.push("/project/history")}
                >
                  Project History
                </MenuItem>
              </Menu>
              {button}
              {head}
              {menu}

              <Button onClick={this.handleLogout} color="inherit">
                <UserIcon />
              </Button>
            </Toolbar>
          </Hidden>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);

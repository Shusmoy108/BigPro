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
  handleLogout = () => {
    let that = this;
    Axios.logout(function() {
      //that.setState({logged: 'login', name: '', username: ''})
      that.props.history.push("/");
    });
    this.setState({ anchorEl: null });
  };
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleProject = event => {
    this.setState({ project: event.currentTarget });
  };
  handleMenuChange = e => {
    this.props.history.push("/" + e);
    this.setState({ anchorEl: null });
  };
  handleProjectChange = e => {
    this.props.history.push("/project/" + e);
    this.setState({ project: null });
  };
  render() {
    const { anchorEl, project } = this.state;
    const { classes } = this.props;
    let button = (
      <Button color="inherit" className={classes.elementStyle}>
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
          <MenuItem onClick={() => this.handleMenuChange("product")}>
            Products
          </MenuItem>
          <MenuItem onClick={() => this.handleMenuChange("step")}>
            Steps
          </MenuItem>
          <MenuItem onClick={() => this.handleMenuChange("specification")}>
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
                  className={classes.elementStyle}
                  onClick={() => this.handleProjectChange("ongoing")}
                >
                  Running Project
                </Button>
                <Button
                  color="inherit"
                  className={classes.elementStyle}
                  value="pendingproject"
                  onClick={() => this.handleProjectChange("pending")}
                >
                  Pending Project
                </Button>
                <Button
                  color="inherit"
                  className={classes.elementStyle}
                  onClick={() => this.handleProjectChange("history")}
                >
                  Project History
                </Button>

                {head}
                {menu}
              </div>

              <Button
                onClick={this.handleLogout}
                color="inherit"
                className={classes.elementStyle}
              >
                {this.props.username}
              </Button>
            </Toolbar>
          </Hidden>
          <Hidden only={["md", "lg", "xl"]}>
            <Toolbar className={classes.hiddenToolbar}>
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
                <MenuItem onClick={() => this.handleProjectChange("ongoing")}>
                  Running Project
                </MenuItem>
                <MenuItem onClick={() => this.handleProjectChange("pending")}>
                  Pending Project
                </MenuItem>
                <MenuItem onClick={() => this.handleProjectChange("history")}>
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
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import Production from "@material-ui/icons/OpenInBrowser";
import DoneAll from "@material-ui/icons/DoneAll";
import Redo from "@material-ui/icons/Redo";
import EditIcon from "@material-ui/icons/Edit";
import Deleteicon from "@material-ui/icons/Delete";
import LinearProgress from "@material-ui/core/LinearProgress";

import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "../Modal/Modal";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";
import { usereditInput } from "../../Validator/userValidator";
import FormHelperText from "@material-ui/core/FormHelperText";
import { insertUser } from "../../Utils/userAxios";
const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  fontStyle: {
    fontFamily: "Helvetica Neue",
    fontSize: "20px"
  }
});

class UserCard extends React.Component {
  state = {
    expanded: false,
    username: "",
    name: "",
    password: "",
    glbErr: "",
    usertype: "",
    showPassword: false,
    errors: {},
    open: false
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  handleOpen = () => {
    this.setState({ open: !this.state.open });
  };
  componentDidMount() {
    this.setState({
      username: this.props.user.username,
      name: this.props.user.name,
      usertype: this.props.user.usertype
    });
  }
  handleDelete = () => {
    this.props.delete(this.props.i, this.props.user._id, (err, data) => {
      if (data) {
        this.setState({ open: !this.state.open });
      }
    });
  };
  handleEdit = () => {
    let data = {
      name: this.state.name,
      username: this.state.username,
      usertype: this.state.usertype
    };

    const { errors, isValid } = usereditInput(data);
    console.log(isValid, errors);
    if (!isValid) {
      this.setState({ errors: errors });
      console.log(errors);
    } else {
      this.props.edit(
        this.props.i,
        this.props.user._id,
        this.state.name,
        this.state.username,
        this.state.usertype,
        (err, data) => {
          if (data) {
            this.setState({ expanded: !this.state.expanded });
          }
        }
      );
    }
  };
  render() {
    const { classes } = this.props;
    let user = (
      <div>
        <div>Name : {this.props.user.name}</div>
        <div>User Name : {this.props.user.username}</div>
        <div>User-Type : {this.props.user.usertype}</div>
      </div>
    );
    if (this.state.expanded) {
      user = (
        <div>
          <FormHelperText id="component-error-text" style={{ color: "red" }}>
            {this.props.glbErr}
          </FormHelperText>
          <div>
            <TextField
              label="User-Name"
              value={this.state.username}
              onChange={this.handleChange("username")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
            />
            <FormHelperText id="component-error-text" style={{ color: "red" }}>
              {this.state.errors.username}
            </FormHelperText>
          </div>
          <div>
            <TextField
              label="Name"
              value={this.state.name}
              onChange={this.handleChange("name")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
            />
            <FormHelperText id="component-error-text" style={{ color: "red" }}>
              {this.state.errors.name}
            </FormHelperText>
          </div>
          <div>
            <InputLabel>User-Type</InputLabel>
            <Radio
              checked={this.state.usertype === "Manager"}
              onChange={this.handleChange("usertype")}
              value="Manager"
              name="radio-button-demo"
              aria-label="A"
            />
            Manager
            <Radio
              checked={this.state.usertype === "Admin"}
              onChange={this.handleChange("usertype")}
              value="Admin"
              name="radio-button-demo"
              aria-label="B"
            />
            Admin
          </div>
          <FormHelperText id="component-error-text" style={{ color: "red" }}>
            {this.state.errors.usertype}
          </FormHelperText>
        </div>
      );
    }
    return (
      <Card className={classes.card}>
        <Modal
          name={this.state.username}
          handleYes={this.handleDelete}
          handleNo={this.handleOpen}
          open={this.state.open}
        />
        <CardHeader title={"User"} />

        <CardContent
          style={{
            fontFamily: "Helvetica Neue"

            //marginLeft:"30%"
          }}
        >
          {user}
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton onClick={this.handleExpandClick}>
            {!this.state.expanded && <EditIcon />}
            {this.state.expanded && <CloseIcon />}
          </IconButton>
          {this.state.expanded && (
            <IconButton onClick={this.handleEdit}>
              <DoneIcon />
            </IconButton>
          )}
          <IconButton onClick={this.handleOpen}>
            <Deleteicon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

UserCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserCard);

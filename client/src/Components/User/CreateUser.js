import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";
import { userInput } from "../../Validator/userValidator";
import FormHelperText from "@material-ui/core/FormHelperText";
import { insertUser } from "../../Utils/userAxios";
class CreateUser extends Component {
  state = {
    username: "",
    name: "",
    password: "",
    glbErr: "",
    usertype: "",
    showPassword: false,
    errors: {}
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };
  handleAdd = () => {
    let data = {
      name: this.state.name,
      username: this.state.username,
      usertype: this.state.usertype,
      password: this.state.password
    };

    const { errors, isValid } = userInput(data);
    console.log(isValid, errors);
    if (!isValid) {
      this.setState({ errors: errors });
      console.log(errors);
    } else {
      this.props.add(data.name, data.username, data.password, data.usertype);
    }
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
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
          <TextField
            label="Password"
            id="adornment-password"
            type={this.state.showPassword ? "text" : "password"}
            value={this.state.password}
            onChange={this.handleChange("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <FormHelperText id="component-error-text" style={{ color: "red" }}>
            {this.state.errors.password}
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
        <div>
          <Button onClick={this.handleAdd}>
            <DoneIcon />
          </Button>
        </div>
      </div>
    );
  }
}

export default CreateUser;

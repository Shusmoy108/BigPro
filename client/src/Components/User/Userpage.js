import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Header from "../Header/Header";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CreateUser from "./CreateUser";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import {
  insertUser,
  getUsers,
  editUser,
  deleteUser
} from "../../Utils/userAxios";
import Axios from "../../Utils/Axios";
import UserCard from "./UserCard";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import LogoutIcon from "@material-ui/icons/Launch";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";
import { usereditInput } from "../../Validator/userValidator";
import FormHelperText from "@material-ui/core/FormHelperText";
class UserPage extends Component {
  state = {
    create: false,
    glbErr: "",
    editErr: [],
    userList: [],
    edit: false,
    errors: {},
    id: null,
    proErr: ""
  };
  handleAdd = () => {
    this.setState({ create: !this.state.create, glbErr: "" });
  };
  handlecreate = (name, username, password, usertype) => {
    let that = this;
    insertUser(name, username, password, usertype, (err, data) => {
      if (data.success) {
        console.log(data.newUser);
        let userList = that.state.userList;
        userList.push(data.newUser);
        that.setState({
          create: !this.state.create,
          userList: userList,
          glbErr: ""
        });
      } else {
        console.log(data.err);
        that.setState({ glbErr: data.err.msg });
      }
    });
  };
  handleEdit = (i, id, name, username, usertype, cb) => {
    let that = this;
    editUser(id, name, username, usertype, (err, data) => {
      if (data.success) {
        console.log(data.user);
        let userList = this.state.userList;
        let index = userList.findIndex(el => el._id === id);
        userList[index] = data.user;
        that.setState({ userList: userList });
        cb(null, true);
      } else {
        console.log(data.err);
        let editErr = this.state.editErr;
        editErr[i] = data.err.msg;
        cb(null, false);
        that.setState({ editErr: editErr });
      }
    });
  };
  handleDelete = (i, id, cb) => {
    let that = this;
    deleteUser(id, (err, data) => {
      if (data.success) {
        let userList = this.state.userList;
        userList.splice(i, 1);
        that.setState({ userList: userList });
        cb(null, true);
      }
    });
  };
  handleEditBool = () => {
    this.setState({ edit: !this.state.edit });
  };
  componentDidMount() {
    let that = this;
    Axios.getProfile(function(err, data) {
      if (!err) {
        console.log("hello", data);
        that.setState(
          {
            usertype: data.usertype,
            username: data.username,
            id: data._id,
            name: data.name
          },
          () => {
            if (that.state.usertype === "Admin") {
              getUsers((err, data) => {
                if (!err) {
                  if (data.success) {
                    let userList = data.users;
                    userList = userList.filter(
                      el => el.username !== that.state.username
                    );
                    that.setState({ userList: userList });
                    console.log(userList);
                  }
                }
              });
            }
          }
        );
      } else {
        that.history.push("/");
      }
    });
  }
  handleLogout = () => {
    let that = this;
    Axios.logout(function () {
        //that.setState({logged: 'login', name: '', username: ''})
        that.props.history.push("/");


    });
    //this.setState({ anchorEl: null });
};
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleEditProfile = () => {
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
      this.setState({ errors: errors });
      let that = this;
      editUser(
        this.state.id,
        this.state.name,
        this.state.username,
        this.state.usertype,
        (err, data) => {
          if (data.success) {
            console.log(data.user);

            that.setState(
              {
                username: data.user.username,
                usertype: data.user.usertype,
                name: data.user.name,
                proErr: "",
                edit: false
              },
              () => {}
            );
          } else {
            that.setState({ proErr: data.err.msg });
          }
        }
      );
    }
  };
  render() {
    let user = (
      <div>
        <p>User - Name : {this.state.username}</p>
        <p>Name : {this.state.name}</p>
        <p> User Type: {this.state.usertype}</p>
      </div>
    );
    if (this.state.edit) {
      user = (
        <div>
          <FormHelperText
            id="component-error-text"
            style={{ color: "red", textAlign: "center" }}
          >
            {this.state.proErr}
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
            <FormHelperText
              id="component-error-text"
              style={{ color: "red", textAlign: "center" }}
            >
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
            <FormHelperText
              id="component-error-text"
              style={{ color: "red", textAlign: "center" }}
            >
              {this.state.errors.name}
            </FormHelperText>
          </div>
          <Button onClick={this.handleEditProfile}>
            <DoneIcon />
          </Button>
        </div>
      );
    }
    return (
      <div>
        <Header
          history={this.props.history}
          username={this.state.username}
          usertype={this.state.usertype}
        />

        <div style={{ display: "flex" }}>
          <div
            style={{
              textAlign: "center",
              fontSize: "25px",
              flex: 1
            }}
          >
            {user}
          </div>
          <div style={{ display: "flex", flex: 1 }}>
            {this.state.usertype === "Admin" && (
              <div>
                <Button onClick={this.handleAdd}>
                  {!this.state.create && <AddIcon />}
                  {this.state.create && <CloseIcon />}
                </Button>
                {this.state.create && (
                  <CreateUser
                    add={this.handlecreate}
                    glbErr={this.state.glbErr}
                  />
                )}
              </div>
            )}
            <div>
              <Button onClick={this.handleEditBool}>
                {!this.state.edit && <EditIcon />}
                {this.state.edit && <CloseIcon />}
              </Button>
            </div>
            <div>
              <Button onClick={this.handleLogout}>
                <LogoutIcon />
              </Button>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          {this.state.userList.map((user, i) => {
            return (
              <div style={{ margin: 10 }}>
                <UserCard
                  key={i}
                  i={i}
                  user={user}
                  glbErr={this.state.editErr[i]}
                  edit={this.handleEdit}
                  delete={this.handleDelete}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default UserPage;

import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Header from "../Header/Header";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CreateUser from "./CreateUser";
import CloseIcon from "@material-ui/icons/Close";
import { insertUser, getUsers } from "../../Utils/userAxios";
import Axios from "../../Utils/Axios"
class UserPage extends Component {
    state = {
        create: false,
        glbErr: "",
        userList: []
    };
    handleAdd = () => {
        this.setState({ create: !this.state.create, glbErr: "" });
    };
    handlecreate = (name, username, password, usertype) => {
        insertUser(
            name, username, password, usertype,
            (err, data) => {
                if (data.success) {
                    console.log(data.newUser);
                    this.setState({ create: !this.state.create, glbErr: "" });
                } else {
                    console.log(data.err);
                    this.setState({ glbErr: data.err.msg });
                }
            }
        );
    }
    componentDidMount() {
        let that = this;
        Axios.getProfile(function (err, data) {
            if (!err) {
                console.log("hello", data);
                that.setState({ usertype: data.usertype, username: data.username, name: data.name }, () => {

                })
            }
            else {
                that.history.push('/');
            }
        });
        if (this.props.usertype === 'Admin') {
            getUsers((err, data) => {
                if (!err) {
                    if (data.success) {
                        this.setState({ userList: data.users });
                        console.log(data.users);
                    }
                }
            })
        }
    }
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
                        <p>User - Name : {this.props.username}</p>
                        <p>Name : {this.props.name}</p>
                        <p> User Type: {this.props.usertype}</p>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Button onClick={this.handleAdd}>
                            {!this.state.create && <AddIcon />}
                            {this.state.create && <CloseIcon />}
                        </Button>
                        {this.state.create && <CreateUser add={this.handlecreate} glbErr={this.state.glbErr} />}
                    </div>
                </div>
            </div>
        );
    }
}
export default UserPage;

import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Header from '../Header/Header'
class UserPage extends Component {
    render() {
        return (
            <div>
                <Header history={this.props.history}
                    username={this.props.username}
                    usertype={this.props.usertype} />
                <div style={{

                    textAlign: "center",
                    fontSize: "25px"
                }}>
                    <p>

                        Name : {this.props.username}
                    </p>
                    <p>  User Type: {this.props.usertype}</p>

                </div>

            </div>

        );
    }
} export default (UserPage);
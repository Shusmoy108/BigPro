import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { getProjects } from "../../Utils/projectAxios";
import Header from "../Header/Header";
import Project from "./Project";

class ShowProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usertype: "",
            username: "",
            projects: []
        };
    }
    componentDidMount() {
        let that = this;
        getProjects(this.props.match.params.project_status, (err, data) => {
            console.log(data, err);
            that.setState({
                usertype: data.user.usertype,
                username: data.user.username,
                projects: data.projects
            });
        });
    }
    render() {
        if (this.state.projects.length) {
        }
        return (
            <div>
                <Header
                    history={this.props.history}
                    username={this.state.username}
                    usertype={this.state.usertype}
                />
                {this.state.projects.length && (
                    <Project project={this.state.projects[1]} />
                )}
            </div>
        );
    }
}

ShowProject.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles()(ShowProject);

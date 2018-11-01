import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { getProjects } from "../../Utils/projectAxios";
import Header from "../Header/Header";
import Project from "./Project";
import Grid from "@material-ui/core/Grid";
import ProjectCard from "./ProjectCard";

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
                <div style={{ margin: "2% 3%" }}>
                    <Grid container>
                        {this.state.projects.length &&
                            this.state.projects.map((project, i) => {
                                return (
                                    <Grid item sm={4} xs={6}>
                                        <ProjectCard project={project} />
                                    </Grid>
                                );
                            })}
                    </Grid>
                </div>
            </div>
        );
    }
}

ShowProject.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles()(ShowProject);

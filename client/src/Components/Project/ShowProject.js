import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "../Modal/Modal";
import {
  getProjects,
  deleteProject,
  updateProject
} from "../../Utils/projectAxios";
import Header from "../Header/Header";
import Project from "./Project";
import Grid from "@material-ui/core/Grid";
import ProjectCard from "./ProjectCard";
import StatusModal from "../Modal/StatusModal";

class ShowProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usertype: "",
      username: "",
      projects: [],
      deleteopen: false,
      project_id: "",
      page: "",
      nextstatus: "",
      statusOpen: false
    };
  }
  deleteProject = id => {
    let that = this;
    deleteProject(that.state.project_id, (err, data) => {
      if (data.success) {
        let projects = that.state.projects;
        projects = projects.filter(
          project => project.project_id !== that.state.project_id
        );
        that.setState({ projects: projects, deleteopen: false });
      }
    });
  };
  showProject = e => {
    this.props.history.push("/projectshow/" + e);
  };
  updateProject = id => {
    let status;
    let projects = this.state.projects;
    let project = projects.find(project => project.project_id !== id);
    if (
      (this.state.page === "ongoing" || this.state.page === "redo") &&
      project.completed_task / project.total_task === 1
    ) {
      status = "history";
      let that = this;
      updateProject(id, status, (err, data) => {
        if (data.success) {
          let projects = that.state.projects;
          projects = projects.filter(project => project.project_id !== id);
          that.setState({ projects: projects, statusOpen: false });
        }
      });
    }
    if (this.state.page === "pending") {
      status = "ongoing";
      let that = this;
      updateProject(id, status, (err, data) => {
        if (data.success) {
          let projects = that.state.projects;
          projects = projects.filter(project => project.project_id !== id);
          that.setState({ projects: projects, statusOpen: false });
        }
      });
    }
    if (this.state.page === "history") {
      status = "redo";
      let that = this;
      updateProject(id, status, (err, data) => {
        if (data.success) {
          let projects = that.state.projects;
          projects = projects.filter(project => project.project_id !== id);
          that.setState({ projects: projects, statusOpen: false });
        }
      });
    }
    this.setState({ statusOpen: false });
  };
  closeDelete = () => {
    this.setState({ deleteopen: false });
  };
  openDelete = e => {
    this.setState({ deleteopen: true, project_id: e });
  };
  closeStatus = () => {
    this.setState({ statusOpen: false });
  };
  openStatus = e => {
    this.setState({ statusOpen: true, project_id: e });
  };
  componentDidMount() {
    let that = this;

    getProjects(this.props.match.params.project_status, (err, data) => {
      console.log(data, err);
      that.setState(
        {
          usertype: data.user.usertype,
          username: data.user.username,
          projects: data.projects,
          page: that.props.match.params.project_status
        },
        () => {
          let status;
          if (that.state.page === "ongoing" || that.state.page === "redo") {
            status = "history";
          }
          if (that.state.page === "pending") {
            status = "ongoing";
          }
          if (that.state.page === "history") {
            status = "redo";
          }
          that.setState({ nextstatus: status });
        }
      );
    });
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.project_status !==
      this.props.match.params.project_status
    ) {
      let that = this;

      getProjects(nextProps.match.params.project_status, (err, data) => {
        console.log(data, err);
        that.setState(
          {
            usertype: data.user.usertype,
            username: data.user.username,
            projects: data.projects,
            page: that.props.match.params.project_status
          },
          () => {
            let status;
            if (that.state.page === "ongoing" || that.state.page === "redo") {
              status = "history";
            }
            if (that.state.page === "pending") {
              status = "ongoing";
            }
            if (that.state.page === "history") {
              status = "redo";
            }
            that.setState({ nextstatus: status });
          }
        );
      });
    }
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
        <Modal
          name={this.state.project_id}
          handleYes={this.deleteProject}
          handleNo={this.closeDelete}
          open={this.state.deleteopen}
        />
        <StatusModal
          name={this.state.project_id}
          status={this.state.nextstatus}
          handleYes={this.updateProject}
          handleNo={this.closeStatus}
          open={this.state.statusOpen}
        />
        <div style={{ margin: "2% 3%" }}>
          <Grid container>
            {this.state.projects.length &&
              this.state.projects.map((project, i) => {
                return (
                  <Grid item sm={3} xs={6}>
                    <div style={{ margin: "1.5% 1.5%" }}>
                      <ProjectCard
                        project={project}
                        delete={this.openDelete}
                        updateStatus={this.openStatus}
                        showProject={this.showProject}
                      />
                    </div>
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

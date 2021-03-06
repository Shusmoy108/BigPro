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
import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Tooltip'
import ProjectCard from "./ProjectCard";
import StatusModal from "../Modal/StatusModal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import AddIcon from "@material-ui/icons/Add";
import Checkbox from '@material-ui/core/Checkbox';


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
            statusOpen: false,
            sortValue: "Project ID",
            sortType: "Ascending",
            refresh: false,
        };
    }
    handleRefresh = () => {
        this.setState({ refresh: !this.state.refresh });
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
    handleSortValue = e => {
        let that = this;
        this.setState({ sortValue: e.target.value }, () => {
            let projects = that.state.projects;
            if (that.state.sortValue === "Client Name") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.client_name > b.client_name
                            ? -1
                            : a.client_name < b.client_name
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.client_name < b.client_name
                            ? -1
                            : a.client_name > b.client_name
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Project ID") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.project_id > b.project_id
                            ? -1
                            : a.project_id < b.project_id
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.project_id < b.project_id
                            ? -1
                            : a.project_id > b.project_id
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Product Name") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.product_name > b.product_name
                            ? -1
                            : a.product_name < b.product_name
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.product_name < b.product_name
                            ? -1
                            : a.product_name > b.product_name
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Quantity") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.quantity > b.quantity
                            ? -1
                            : a.quantity < b.quantity
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.quantity < b.product_name
                            ? -1
                            : a.quantity > b.quantity
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Current Step") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.current_position > b.current_position
                            ? -1
                            : a.current_position < b.current_position
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.current_position < b.current_position
                            ? -1
                            : a.current_position > b.current_position
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Next Step") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.next_position > b.next_position
                            ? -1
                            : a.next_position < b.next_position
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.next_position < b.next_position
                            ? -1
                            : a.next_position > b.next_position
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Next Step") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.next_position > b.next_position
                            ? -1
                            : a.next_position < b.next_position
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.next_position < b.next_position
                            ? -1
                            : a.next_position > b.next_position
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            }
            if (that.state.sortValue === "Progress") {
                projects.sort(function (a, b) {
                    let x = a.completed_task / a.total_task;
                    let y = b.completed_task / b.total_task;
                    if (that.state.sortType === "Ascending") {
                        return x > y ? -1 : x < y ? 1 : 0;
                    }
                    if (that.state.sortType === "Descending") {
                        return x < y ? -1 : x > y ? 1 : 0;
                    }
                });
                that.setState({ projects: projects });
            }
            if (that.state.sortValue === "Deadline") {
                projects.sort(function (a, b) {
                    let x = new Date(a.deadline);
                    let y = new Date(b.deadline);
                    if (that.state.sortType === "Ascending") {
                        return x > y ? -1 : x < y ? 1 : 0;
                    }
                    if (that.state.sortType === "Descending") {
                        return x < y ? -1 : x > y ? 1 : 0;
                    }
                });
                that.setState({ projects: projects });
            }
        });
    };
    handleSortType = e => {
        let that = this;
        this.setState({ sortType: e.target.value }, () => {
            let projects = that.state.projects;
            if (that.state.sortValue === "Client Name") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.client_name > b.client_name
                            ? -1
                            : a.client_name < b.client_name
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.client_name < b.client_name
                            ? -1
                            : a.client_name > b.client_name
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Project ID") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.project_id > b.project_id
                            ? -1
                            : a.project_id < b.project_id
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.project_id < b.project_id
                            ? -1
                            : a.project_id > b.project_id
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Product Name") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.product_name > b.product_name
                            ? -1
                            : a.product_name < b.product_name
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.product_name < b.product_name
                            ? -1
                            : a.product_name > b.product_name
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Quantity") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.quantity > b.quantity
                            ? -1
                            : a.quantity < b.quantity
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.quantity < b.product_name
                            ? -1
                            : a.quantity > b.quantity
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Current Step") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.current_position > b.current_position
                            ? -1
                            : a.current_position < b.current_position
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.current_position < b.current_position
                            ? -1
                            : a.current_position > b.current_position
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Next Step") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.next_position > b.next_position
                            ? -1
                            : a.next_position < b.next_position
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.next_position < b.next_position
                            ? -1
                            : a.next_position > b.next_position
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Next Step") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.next_position > b.next_position
                            ? -1
                            : a.next_position < b.next_position
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.next_position < b.next_position
                            ? -1
                            : a.next_position > b.next_position
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            }
            if (that.state.sortValue === "Progress") {
                projects.sort(function (a, b) {
                    let x = a.completed_task / a.total_task;
                    let y = b.completed_task / b.total_task;
                    if (that.state.sortType === "Ascending") {
                        return x > y ? -1 : x < y ? 1 : 0;
                    }
                    if (that.state.sortType === "Descending") {
                        return x < y ? -1 : x > y ? 1 : 0;
                    }
                });
                that.setState({ projects: projects });
            }
            if (that.state.sortValue === "Deadline") {
                projects.sort(function (a, b) {
                    let x = new Date(a.deadline);
                    let y = new Date(b.deadline);
                    if (that.state.sortType === "Ascending") {
                        return x > y ? -1 : x < y ? 1 : 0;
                    }
                    if (that.state.sortType === "Descending") {
                        return x < y ? -1 : x > y ? 1 : 0;
                    }
                });
                that.setState({ projects: projects });
            }
        });
    };
    updateProject = id => {
        let status;
        let projects = this.state.projects;
        let project = projects.find(
            project => project.project_id === this.state.project_id
        );

        if (
            (this.state.page === "ongoing" || this.state.page === "redo") &&
            project.completed_task / project.total_task === 1
        ) {
            status = "history";
            let that = this;
            updateProject(id, status, (err, data) => {
                if (data.success) {
                    let projects = that.state.projects;
                    projects = projects.filter(
                        project => project.project_id !== this.state.project_id
                    );
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
                    projects = projects.filter(
                        project => project.project_id !== this.state.project_id
                    );
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
                    projects = projects.filter(
                        project => project.project_id !== this.state.project_id
                    );
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
    getProjects = () => {
        let that = this;

        getProjects(this.props.match.params.project_status, (err, data) => {
            if (err) {
                that.props.history.push("/");
            } else {
                that.setState(
                    {
                        usertype: data.user.usertype,
                        username: data.user.username,
                        projects: data.projects,
                        page: that.props.match.params.project_status
                    },
                    () => {
                        let status;
                        if (
                            that.state.page === "ongoing" ||
                            that.state.page === "redo"
                        ) {
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
            }
        });
    }
    componentDidMount() {
        this.getProjects()
        let that = this;
        setInterval(() => {
            if (that.state.refresh) {
                that.getProjects();
            }
        }, 30000)
    }
    componentWillReceiveProps(nextProps) {
        if (
            nextProps.match.params.project_status !==
            this.props.match.params.project_status
        ) {
            let that = this;

            getProjects(nextProps.match.params.project_status, (err, data) => {
                that.setState(
                    {
                        usertype: data.user.usertype,
                        username: data.user.username,
                        projects: data.projects,
                        page: that.props.match.params.project_status
                    },
                    () => {
                        let status;
                        if (
                            that.state.page === "ongoing" ||
                            that.state.page === "redo"
                        ) {
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
        let addbutton;
        if (this.state.page === "pending") {
            addbutton = (
                <Tooltip title="Add Project">

                    <Button
                        onClick={() => {
                            this.props.history.push("/createproject");
                        }}
                    >
                        <AddIcon />
                    </Button>
                </Tooltip>
            );
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            fontFamily: "Helvetica Neue",
                            fontSize: "30px",
                            margin: "2% 3%"
                        }}
                    >
                        Sort{" "}
                        <Select
                            value={this.state.sortValue}
                            onChange={this.handleSortValue}
                            input={<Input name="age" id="age-helper" />}
                            style={{ margin: "0 3%" }}
                        >
                            <MenuItem value={"Project ID"}>
                                {"Project ID"}
                            </MenuItem>
                            <MenuItem value={"Product Name"}>
                                {"Product Name"}
                            </MenuItem>
                            <MenuItem value={"Client Name"}>
                                {"Client Name"}
                            </MenuItem>
                            <MenuItem value={"Progress"}>{"Progress"}</MenuItem>
                            <MenuItem value={"Deadline"}>{"Deadline"}</MenuItem>
                            <MenuItem value={"Quantity"}>{"Quantity"}</MenuItem>
                            <MenuItem value={"Current Step"}>
                                {"Current Step"}
                            </MenuItem>
                            <MenuItem value={"Next Step"}>
                                {"Next Step"}
                            </MenuItem>
                        </Select>
                        <Select
                            value={this.state.sortType}
                            onChange={this.handleSortType}
                            input={<Input name="age" id="age-helper" />}
                            style={{ margin: "0 3%" }}
                        >
                            <MenuItem value={"Ascending"}>
                                {"Ascending"}
                            </MenuItem>
                            <MenuItem value={"Descending"}>
                                {"Descending"}
                            </MenuItem>
                        </Select>
                        {addbutton}
                        <Checkbox
                            checked={this.state.refresh}
                            onChange={this.handleRefresh}
                            color='primary'
                        /> <div style={{ marginTop: 5 }}>
                            Auto Refresh
                            </div>
                    </div>

                    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: "center" }}>
                        {this.state.projects.map((project, i) => {
                            return (

                                <div style={{ margin: 10 }}>
                                    <ProjectCard
                                        project={project}
                                        delete={this.openDelete}
                                        updateStatus={this.openStatus}
                                        showProject={this.showProject}
                                    />
                                </div>

                            );
                        })}
                    </div>

                    {!this.state.projects.length && (
                        <div
                            style={{
                                fontFamily: "Helvetica Neue",
                                fontSize: "30px",
                                margin: "2% 3%"
                            }}
                        >
                            {" "}
                            No Projects Available
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

ShowProject.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles()(ShowProject);

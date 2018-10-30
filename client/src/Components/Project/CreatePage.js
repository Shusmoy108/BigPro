import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Header from "../Header/Header";
import styles from "../Product/productstyle";
import moment from "moment";
import Axios from "Utils/Axios";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import CreateProject from "./CreateProject";
import { projectInput } from "../../Validator/projectValidator";
import { insertProject } from "../../Utils/projectAxios";

class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name: "",
            client_name: "",
            quantity: "0",
            deadline: Date.now(),
            project_id: "",
            productlist: [],
            usertype: "",
            username: "",
            productnames: [],
            createflag: 0,
            errors: {},
            product: {
                task: []
            },
            taskError: [
                {
                    task_name: "",
                    subtask: [
                        {
                            subtask_name: "",
                            subtask_err: ""
                        }
                    ]
                }
            ],
            task: [
                {
                    task_name: "",
                    subtask: [
                        {
                            subtask_name: "",
                            subtask_type: "",
                            subtask_value: ""
                        }
                    ]
                }
            ],
            error: {}
        };
    }
    componentDidMount() {
        let that = this;
        Axios.showproduct(function(err, data) {
            if (err) {
                that.props.history.push("/");
            } else {
                that.setState({
                    productlist: data.products,
                    usertype: data.user.usertype,
                    username: data.user.username,
                    product_name: data.products[0].product_name
                });
                let tasks = [];
                let taskError = [];
                data.products[0].task.map((taski, i) => {
                    let task = {
                        task_name: taski.task_name,
                        task_status: "undone",
                        subtask: []
                    };
                    let taskerr = {
                        task_name: taski.task_name,
                        subtask: []
                    };
                    taski.subtask.map((subtaskj, j) => {
                        let subtask_err = {
                            subtask_name: subtaskj.subtask_name,
                            subtask_error: ""
                        };
                        taskerr.subtask.push(subtask_err);
                        if (subtaskj.subtask_type === "Dropdown") {
                            let subtask = {
                                subtask_name: subtaskj.subtask_name,
                                subtask_type: "Dropdown",
                                subtask_value: ""
                            };

                            subtask.subtask_value = subtaskj.subtask_option[0];
                            task.subtask.push(subtask);
                        } else if (subtaskj.subtask_type === "Checkbox") {
                            let subtask = {
                                subtask_name: subtaskj.subtask_name,
                                subtask_type: "Checkbox",
                                subtask_value: [],
                                subtask_check: []
                            };
                            subtaskj.subtask_option.map((e, c) => {
                                subtask.subtask_check[c] = false;
                            });
                            task.subtask.push(subtask);
                        } else {
                            let subtask = {
                                subtask_name: subtaskj.subtask_name,
                                subtask_type: subtaskj.subtask_type,
                                subtask_value: ""
                            };
                            task.subtask.push(subtask);
                        }
                    });
                    tasks.push(task);
                    taskError.push(taskerr);
                });
                that.setState({ taskError: taskError }, () => {
                    that.setState({ task: tasks }, () => {
                        that.setState({ product: data.products[0] });
                    });
                });

                let productnames = [];
                data.products.map((item, i) => {
                    productnames.push(item.product_name);
                });
                that.setState({ productnames: productnames });
            }
        });
    }

    handleproductname = product_name => {
        this.setState({ product_name: product_name.target.value });
        let product = this.state.productlist.find(
            product => product.product_name === product_name.target.value
        );
        let tasks = [];
        let taskError = [];

        product.task.map((taski, i) => {
            let task = {
                task_name: taski.task_name,
                task_status: "undone",
                subtask: []
            };
            let taskerr = {
                task_name: taski.task_name,
                subtask: []
            };
            taski.subtask.map((subtaskj, j) => {
                let subtask_err = {
                    subtask_name: subtaskj.subtask_name,
                    subtask_error: ""
                };
                taskerr.subtask.push(subtask_err);
                if (subtaskj.subtask_type === "Dropdown") {
                    let subtask = {
                        subtask_name: subtaskj.subtask_name,
                        subtask_type: "Dropdown",
                        subtask_value: ""
                    };
                    subtask.subtask_value = subtaskj.subtask_option[0];
                    task.subtask.push(subtask);
                } else if (subtaskj.subtask_type === "Checkbox") {
                    let subtask = {
                        subtask_name: subtaskj.subtask_name,
                        subtask_type: "Checkbox",
                        subtask_value: [],
                        subtask_check: []
                    };
                    subtaskj.subtask_option.map((e, c) => {
                        subtask.subtask_check[c] = false;
                    });
                    task.subtask.push(subtask);
                } else {
                    let subtask = {
                        subtask_name: subtaskj.subtask_name,
                        subtask_type: subtaskj.subtask_type,
                        subtask_value: ""
                    };
                    task.subtask.push(subtask);
                }
            });
            tasks.push(task);
            taskError.push(taskerr);
        });
        if (tasks.length === product.task.length) {
            this.setState({ product: { task: [] }, taskError: [] }, () => {
                this.setState({ task: tasks, taskError: taskError }, () => {
                    this.setState({ product: product });
                });
            });
        }
    };

    handleChange = prop => event => {
       // console.log(event, "gegge");
        this.setState({ [prop]: event.target.value });
    };
    handleDateChange = e => {
        // console.log("heteghg", typeof e.target.value);
        // let date = moment(new Date(e.target.value)).format("LLL");
        // console.log(date.toString(), "jkkljkj");
        this.setState({ deadline: e.target.value });
    };
    handdleSpecChange = (i, j) => e => {
        let task = this.state.task;
        task[i].subtask[j].subtask_value = e.target.value;
        this.setState({ task: task });
    };
    handleCheckChange = (i, j, k, e) => {
        let task = this.state.task;
        task[i].subtask[j].subtask_check[k] = !task[i].subtask[j].subtask_check[
            k
        ];
        if (task[i].subtask[j].subtask_check[k]) {
            task[i].subtask[j].subtask_value.push(e);
        } else {
            var index = task[i].subtask[j].subtask_value.indexOf(e);
            if (index !== -1) task[i].subtask[j].subtask_value.splice(index, 1);
        }
        console.log(task[i].subtask[j].subtask_value);
        this.setState({ task: task });
    };
    createproject = () => {
        let data = {
            project_id: this.state.project_id,
            deadline: this.state.deadline,
            client_name: this.state.client_name,
            quantity: this.state.quantity,
            task: this.state.task
        };
        let { errors, isValid } = projectInput(data);
        if (!isValid) {
            console.log("err");
            this.setState({ taskError: errors.taskError, errors: errors });
        } else {
            console.log('beforeax');
            insertProject(data, (data, res) => {
                console.log(res);
            });
            this.setState({ taskError: errors.taskError, errors: {} });
        }
    };

    render() {
        const { classes } = this.props;
        let button;

        button = (
            <Button onClick={this.createproject}>
                <DoneIcon />
            </Button>
        );
        let values = [];

        for (let i = 0; i < this.state.productnames.length; i++) {
            values.push(
                <MenuItem key={i} value={this.state.productnames[i]}>
                    {this.state.productnames[i]}
                </MenuItem>
            );
        }
        //console.log(this.state.task);
        return (
            <div>
                <Header
                    history={this.props.history}
                    username={this.state.username}
                    usertype={this.state.usertype}
                />
                <div
                    style={{
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center"
                    }}
                >
                    <div>
                        <div>
                            <FormControl
                                style={{ fullWidth: "true", width: "100%" }}
                            >
                                <InputLabel
                                    htmlFor="adornment-amount"
                                    style={{ marginRight: 10 }}
                                >
                                    Project Id
                                </InputLabel>
                                <Input
                                    id="standard-required"
                                    value={this.state.project_id}
                                    onChange={this.handleChange("project_id")}
                                />
                            </FormControl>
                            <FormHelperText
                                id="component-error-text"
                                style={{ color: "red" }}
                            >
                                {this.state.errors.project_id}
                            </FormHelperText>
                        </div>
                        <div style={{ padding: "5% 0" }}>
                            <InputLabel
                                shrink
                                htmlFor="productname"
                                style={{ paddingRight: "5%" }}
                            >
                                Product Name :
                            </InputLabel>
                            <Select
                                value={this.state.product_name}
                                onChange={this.handleproductname}
                                input={<Input name="age" id="age-helper" />}
                            >
                                {values}
                            </Select>
                        </div>
                        <div>
                            <FormControl
                                style={{ fullWidth: "true", width: "100%" }}
                            >
                                <InputLabel
                                    htmlFor="adornment-amount"
                                    style={{ marginRight: 10 }}
                                >
                                    Client Name
                                </InputLabel>
                                <Input
                                    id="standard-required"
                                    value={this.state.client_name}
                                    onChange={this.handleChange("client_name")}
                                />
                            </FormControl>
                            <FormHelperText
                                id="component-error-text"
                                style={{ color: "red" }}
                            >
                                {this.state.errors.client_name}
                            </FormHelperText>
                        </div>
                        <div>
                            <FormControl
                                style={{ fullWidth: "true", width: "100%" }}
                            >
                                <InputLabel
                                    htmlFor="adornment-amount"
                                    style={{ marginRight: 10 }}
                                >
                                    Quantity
                                </InputLabel>
                                <Input
                                    id="standard-required"
                                    value={this.state.quantity}
                                    onChange={this.handleChange("quantity")}
                                />
                            </FormControl>
                            <FormHelperText
                                id="component-error-text"
                                style={{ color: "red" }}
                            >
                                {this.state.errors.quantity}
                            </FormHelperText>
                        </div>
                        <div>
                            <FormControl
                                style={{ fullWidth: "true", width: "100%" }}
                            >
                                <div
                                    htmlFor="adornment-amount"
                                    style={{ marginRight: 10 }}
                                >
                                    Deadline
                                </div>
                                <Input
                                    type="datetime-local"
                                    value={this.state.deadline}
                                    onChange={this.handleChange("deadline")}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>
                            <FormHelperText
                                id="component-error-text"
                                style={{ color: "red" }}
                            >
                                {this.state.errors.deadline}
                            </FormHelperText>
                        </div>

                        <CreateProject
                            product={this.state.product}
                            handleSpecChange={this.handdleSpecChange}
                            handleCheckChange={this.handleCheckChange}
                            task={this.state.task}
                            taskError={this.state.taskError}
                        />
                        {button}
                    </div>
                </div>
            </div>
        );
    }
}

CreatePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreatePage);

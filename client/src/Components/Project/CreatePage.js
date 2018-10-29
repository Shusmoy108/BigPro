import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import InputBase from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import Header from "../Header/Header";
import styles from "../Product/productstyle";

import Axios from "Utils/Axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import CreateProject from "./CreateProject";

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
      product: {
        task: []
      },
      task: [
        {
          task_name: "",
          subtask: [
            {
              subtask_name: "",
              subtask_type: ""
            }
          ]
        }
      ]
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
        data.products[0].task.map((taski, i) => {
          let task = {
            task_name: taski.task_name,
            subtask: []
          };
          taski.subtask.map((subtaskj, j) => {
            if (subtaskj.subtask_type === "Dropdown") {
              let subtask = {
                subtask_name: subtaskj.subtask_name,
                subtask_value: ""
              };
              subtask.subtask_value = subtaskj.subtask_option[0];
              task.subtask.push(subtask);
            } else if (subtaskj.subtask_type === "Checkbox") {
              let subtask = {
                subtask_name: subtaskj.subtask_name,
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
                subtask_value: ""
              };
              task.subtask.push(subtask);
            }
          });
          tasks.push(task);
        });
        that.setState({ task: tasks }, () => {
          that.setState({ product: data.products[0] });
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
    product.task.map((taski, i) => {
      let task = {
        task_name: taski.task_name,
        subtask: []
      };
      taski.subtask.map((subtaskj, j) => {
        if (subtaskj.subtask_type === "Dropdown") {
          let subtask = {
            subtask_name: subtaskj.subtask_name,
            subtask_value: ""
          };
          subtask.subtask_value = subtaskj.subtask_option[0];
          task.subtask.push(subtask);
        } else if (subtaskj.subtask_type === "Checkbox") {
          let subtask = {
            subtask_name: subtaskj.subtask_name,
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
            subtask_value: ""
          };
          task.subtask.push(subtask);
        }
      });
      tasks.push(task);
    });
    if (tasks.length === product.task.length) {
      this.setState({ product: { task: [] } }, () => {
        this.setState({ task: tasks }, () => {
          this.setState({ product: product });
        });
      });
    }
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handdleSpecChange = (i, j) => e => {
    let task = this.state.task;
    task[i].subtask[j].subtask_value = e.target.value;
    this.setState({ task: task });
  };
  handleCheckChange = (i, j, k, e) => {
    let task = this.state.task;
    task[i].subtask[j].subtask_check[k] = !task[i].subtask[j].subtask_check[k];
    if (task[i].subtask[j].subtask_check[k]) {
      task[i].subtask[j].subtask_value.push(e);
    } else {
      var index = task[i].subtask[j].subtask_value.indexOf(e);
      if (index !== -1) task[i].subtask[j].subtask_value.splice(index, 1);
    }
    console.log(task[i].subtask[j].subtask_value);
    this.setState({ task: task });
  };
  createproject = () => {};

  render() {
    const { classes } = this.props;
    let button;
    if (
      this.state.project_id === "" ||
      this.state.product_name === "" ||
      this.state.deadline === "" ||
      this.state.client_name === "" ||
      this.state.quantity === ""
    )
      button = (
        <Button>
          <CloseIcon />
        </Button>
      );
    else
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
            <div style={{ padding: "5% 0" }}>
              <InputLabel
                shrink
                htmlFor="productname"
                className={classes.bootstrapFormLabel}
                style={{ paddingRight: "5%" }}
              >
                Project ID{" "}
              </InputLabel>
              <InputBase
                id="productname"
                placeholder="Enter a Project ID....."
                value={this.state.project_id}
                onChange={this.handleChange("project_id")}
              />
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
            <div style={{ padding: "5% 0" }}>
              <InputLabel
                shrink
                htmlFor="productname"
                className={classes.bootstrapFormLabel}
                style={{ paddingRight: "0" }}
              >
                Client Name:{" "}
              </InputLabel>
              <InputBase
                id="productname"
                placeholder="Enter a Client Name....."
                value={this.state.client_name}
                onChange={this.handleChange("client_name")}
              />
            </div>
            <div style={{ padding: "5% 0" }}>
              <InputLabel
                shrink
                htmlFor="productname"
                className={classes.bootstrapFormLabel}
                style={{ paddingRight: "5%" }}
              >
                Quantity :
              </InputLabel>
              <InputBase
                id="productname"
                placeholder="Enter a Quantity....."
                value={this.state.quantity}
                onChange={this.handleChange("quantity")}
              />
            </div>
            <div style={{ padding: "5% 0" }}>
              <InputLabel
                shrink
                htmlFor="productname"
                className={classes.bootstrapFormLabel}
              >
                Deadline:{" "}
              </InputLabel>
              <TextField
                type="datetime-local"
                value={this.state.deadline}
                onChange={this.handleChange("deadline")}
              />
            </div>
          </div>
        </div>
        <CreateProject
          product={this.state.product}
          handleSpecChange={this.handdleSpecChange}
          handleCheckChange={this.handleCheckChange}
          task={this.state.task}
        />
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          {button}
        </div>
      </div>
    );
  }
}

CreatePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreatePage);

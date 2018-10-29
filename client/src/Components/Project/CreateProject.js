import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import InputBase from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import Checkbox from "@material-ui/core/Checkbox";
import styles from "../Product/productstyle";

import TextField from "@material-ui/core/TextField";
class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  render() {
    const { classes } = this.props;
    let tasks = [];
    if (this.props.product) {
      this.props.product.task.map((taski, i) => {
        tasks.push(
          <div key={i} style={{ margin: "5% 0" }}>
            <InputLabel
              shrink
              htmlFor="productname"
              className={classes.bootstrapFormLabel}
            >
              Step Name : {taski.task_name}
            </InputLabel>
          </div>
        );
        taski.subtask.map((subtaskj, j) => {
          let subtaskname = (
            <InputLabel
              key={j}
              shrink
              htmlFor="productname"
              className={classes.bootstrapFormLabel}
            >
              {subtaskj.subtask_name}{" "}
            </InputLabel>
          );
          if (subtaskj.subtask_type === "Textfield") {
            tasks.push(
              <div>
                {subtaskname}

                <InputBase
                  id="productname"
                  //placeholder="Enter a Project ID....."
                  value={this.props.task[i].subtask[j].subtask_value}
                  onChange={this.props.handleSpecChange(i, j)}
                />
              </div>
            );
          } else if (subtaskj.subtask_type === "Number") {
            tasks.push(
              <div>
                {subtaskname}
                <InputBase
                  id="productname"
                  //placeholder="Enter a Project ID....."
                  value={this.props.task[i].subtask[j].subtask_value}
                  onChange={this.props.handleSpecChange(i, j)}
                />
              </div>
            );
          } else if (subtaskj.subtask_type === "Date") {
            tasks.push(
              <div>
                {subtaskname}
                <TextField
                  type="datetime-local"
                  value={this.props.task[i].subtask[j].subtask_value}
                  onChange={this.props.handleSpecChange(i, j)}
                />
              </div>
            );
          } else if (subtaskj.subtask_type === "Dropdown") {
            let values = [];
            for (let k = 0; k < subtaskj.subtask_option.length; k++) {
              values.push(
                <MenuItem key={k} value={subtaskj.subtask_option[k]}>
                  {subtaskj.subtask_option[k]}
                </MenuItem>
              );
            }
            tasks.push(
              <div>
                {subtaskname}
                <Select
                  value={this.props.task[i].subtask[j].subtask_value}
                  onChange={this.props.handleSpecChange(i, j)}
                  input={<Input name="age" id="age-helper" />}
                >
                  {values}
                </Select>
              </div>
            );
          } else if (subtaskj.subtask_type === "Checkbox") {
            let value = [];
            subtaskj.subtask_option.map((f, k) => {
              value.push(
                <div>
                  <Checkbox
                    checked={this.props.task[i].subtask[j].subtask_check[k]}
                    onChange={() => this.props.handleCheckChange(i, j, k, f)}
                    color="primary"
                  />
                  {f}
                </div>
              );
            });
            tasks.push(
              <div>
                {subtaskname}
                {value}
              </div>
            );
          }
        });
      });
    }
    return (
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center"
        }}
      >
        <div>{tasks}</div>
      </div>
    );
  }
}

export default withStyles(styles)(CreateProject);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CreateSubtask from "../Subtask/CreateSubtask";
import styles from "../Subtask/subtaskstyle";
import Subtask from "../Subtask/Subtask";
import BackIcon from "@material-ui/icons/FastRewind";
import Axios from "Utils/Axios";
import DropDown from "../Dropdown/Dropdown";
import Grid from "@material-ui/core/Grid/Grid";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/Add";
import Showspec from "../Subtask/Showspec";

class SubtaskBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createflag: 0,
      subtasklist: this.props.subtasklist,
      taskname: this.props.taskname,
      showpage: "subtask",
      usertype: "",
      username: "",
      showsubtask: -1,
      subtasknumber: -1,
      spec: -1,
      subtaskname: "",
      allsubtask: [],
      subtasknames: []
    };
  }
  componentDidMount() {
    let that = this;
    Axios.showsubtask(function(err, data) {
      if (err) {
        that.props.history.push("/");
      } else {
        that.setState({
          allsubtask: data.subtasks,
          subtaskname: data.subtasks[0].subtask_name
        });
        let subtasknames = [];
        for (let i = 0; i < data.subtasks.length; i++) {
          subtasknames.push(data.subtasks[i].subtask_name);
        }
        that.setState({ subtasknames: subtasknames });
      }
    });
  }
  openallsubtask = e => {
    this.setState({ createflag: -1 });
    this.setState(state => ({ subtasknumber: e }));
  };
  opencreatebox = () => {
    let e = 1;
    this.setState(state => ({ createflag: e }));
    this.setState(state => ({ subtasknumber: -1 }));
  };
  closecreatebox = () => {
    let e = 0;
    this.setState(state => ({ createflag: e }));
    this.setState(state => ({ subtasknumber: -1 }));
  };
  opennextcreatebox = x => {
    this.setState(state => ({ createflag: 1 }));
  };
  createsubtask = (e, n, f) => {
    this.props.createsubtask(
      this.props.taskname,
      e,
      n,
      f,
      this.state.subtasknumber
    );
    this.setState(state => ({ subtasknumber: -1 }));
    let subtask = {
      subtask_name: e,
      subtask_type: n,
      subtask_option: f
    };
    let allsubtask = this.state.allsubtask;
    allsubtask.push(subtask);
    let subtasknames = this.state.subtasknames;
    subtasknames.push(e);

    this.setState({ allsubtask: allsubtask, subtasknames: subtasknames });
    this.setState(state => ({ subtasklist: this.props.subtasklist }));
  };
  createoldsubtask = () => {
    let subtask = this.state.allsubtask.find(
      subtask => subtask.subtask_name === this.state.subtaskname
    );
    this.props.createoldsubtask(
      this.props.taskname,
      subtask,
      this.state.subtasknumber
    );
    this.setState({ createflag: 0 });
    this.setState(state => ({ subtasknumber: -1 }));
  };
  deletesubtask = e => {
    this.props.deletesubtask(this.props.taskname, e);
  };
  editsubtask = (e, n, f, g) => {
    this.props.editsubtask(this.props.taskname, e, n, f, g);
  };

  showsubtask = () => {
    this.props.showsubtask(-1);
  };
  showspec = x => {
    this.setState({ spec: x });
  };
  handlesubtaskname = subtaskname => {
    this.setState({ subtaskname: subtaskname });
  };

  render() {
    const { classes } = this.props;
    let subtask;
    if (this.state.showsubtask === -1) {
      let create;
      if (this.state.createflag === 1 && this.state.subtasknumber == -1) {
        create = (
          <CreateSubtask
            createsubtask={this.createsubtask}
            show={this.closecreatebox}
          />
        );
      }
      if (this.state.createflag === -1 && this.state.subtasknumber == -1) {
        create = (
          <DropDown
            createtask={this.createoldsubtask}
            close={this.closecreatebox}
            newcreate={this.opencreatebox}
            value={this.state.subtaskname}
            inputfield={"Specification-Name"}
            values={this.state.subtasknames}
            handleChange={this.handlesubtaskname}
          />
        );
      }
      let subtasklist = [];

      for (var i = 0; i < this.props.subtasklist.length; i++) {
        subtasklist.push(
          <Subtask
            key={i}
            add={1}
            showspec={this.showspec}
            id={this.props.subtasklist[i]._id}
            opennextcreatebox={this.opennextcreatebox}
            openallsubtask={this.openallsubtask}
            subtask_number={i}
            subtask_name={this.props.subtasklist[i].subtask_name}
            subtask_type={this.props.subtasklist[i].subtask_type}
            subtask_option={this.props.subtasklist[i].subtask_option}
            deletesubtask={this.deletesubtask}
            editsubtask={this.editsubtask}
          />
        );
        if (i === this.state.subtasknumber && this.state.createflag === 1) {
          subtasklist.push(
            <CreateSubtask
              createsubtask={this.createsubtask}
              show={this.closecreatebox}
              key={this.props.subtasklist.length}
            />
          );
        }
        if (i === this.state.subtasknumber && this.state.createflag === -1) {
          subtasklist.push(
            <DropDown
              createtask={this.createoldsubtask}
              close={this.closecreatebox}
              newcreate={this.opennextcreatebox}
              value={this.state.subtaskname}
              inputfield={"Specification-Name"}
              values={this.state.subtasknames}
              handleChange={this.handlesubtaskname}
              key={this.props.subtasklist.length + 1}
            />
          );
        }
      }
      subtask = (
        <Grid container direction="row" align="center">
          {create}

          <Grid
            item
            sm={4}
            xs={10}
            style={{
              fontFamily: "Dekko",
              fontSize: 15
              //marginLeft:"5%"
            }}
          >
            {" "}
            <Button variant="flat" onClick={this.showsubtask} color={"primary"}>
              <BackIcon />
            </Button>
            Specifications of {this.props.taskname}
          </Grid>
          <Hidden only={["xs"]}>
            <Grid item sm={2} xs={6}>
              {" "}
              <Button
                onClick={() => this.openallsubtask(-1)}
                //style=
              >
                <AddIcon />
              </Button>{" "}
            </Grid>
          </Hidden>
          {subtasklist}
        </Grid>
      );
    }
    if (this.state.spec !== -1) {
      subtask = (
        <Showspec
          back={this.showspec}
          subtaskname={this.props.subtasklist[this.state.spec].subtask_name}
          subtasktype={this.props.subtasklist[this.state.spec].subtask_type}
          option={this.props.subtasklist[this.state.spec].subtask_option}
        />
      );
    }
    return (
      <div>
        {subtask}
        <Hidden only={["sm", "md", "lg", "xl"]}>
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            onClick={() => this.openallsubtask(-1)}
            className={classes.button}
          >
            <AddIcon />
          </Button>
        </Hidden>
      </div>
    );
  }
}

SubtaskBody.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubtaskBody);

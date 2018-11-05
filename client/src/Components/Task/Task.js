import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./taskstyle";
import PropTypes from "prop-types";
import InputBase from "@material-ui/core/Input/Input";
import Grid from "@material-ui/core/Grid/Grid";
import Listicon from "@material-ui/icons/List";
import Editicon from "@material-ui/icons/Edit";
import Deleteicon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Modal from "../Modal/Modal";
class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_name: "",
            edit_flag: 0,
            task_name: "",
            createflag: 0,
            open: false
        };
    }
    opencreatebox = () => {
        this.props.opennextcreatebox(this.props.task_number);
    };
    settaskname = e => {
        this.setState({ edit_name: e.target.value });
    };
    seteditflag = () => {
        this.setState({ edit_name: this.props.task_name });
        this.setState({ edit_flag: 1 });
    };
    deletetask = () => {
        this.props.deletetask(this.props.task_name);
        this.setState({ open: false });
    };
    edittask = () => {
        if (this.state.edit_name !== this.props.task_name)
            this.props.edittask(this.props.task_name, this.state.edit_name);
        this.setState({ edit_flag: 0 });
    };
    showsubtask = () => {
        this.props.showsubtask(this.props.task_number);
    };
    modalopen = () => {
        this.setState({ open: true });
    };
    modalclose = () => {
        this.setState({ open: false });
    };
    render() {
        const { classes } = this.props;
        let task;
        let button;

        if (this.state.edit_flag === 1) {
            task = (
                <Grid item sm={8} xs={6}>
                    {" "}
                    <InputBase
                        id="productname"
                        placeholder="Enter a Taskname....."
                        value={this.state.edit_name}
                        onChange={this.settaskname}
                        classes={{
                            root: classes.bootstrapRoot,
                            input: classes.bootstrapInput
                        }}
                    />
                </Grid>
            );
            if (this.state.edit_name === this.props.task_name)
                button = (
                    <Grid sm={4} xs={6}>
                        {" "}
                        <Button onClick={this.edittask}>
                            <CloseIcon />
                        </Button>
                    </Grid>
                );
            else
                button = (
                    <Grid sm={4} xs={6}>
                        {" "}
                        <Button onClick={this.edittask}>
                            <DoneIcon />
                        </Button>
                    </Grid>
                );
        } else {
            let add;
            if (this.props.add === 1) {
                add = (
                    <Button
                        onClick={() =>
                            this.props.openalltask(this.props.task_number)
                        }
                    >
                        <AddIcon />
                    </Button>
                );
            }
            task = (
                <Grid item sm={4} xs={2} className={classes.fontStyle}>
                    {this.props.task_name}
                </Grid>
            );
            button = (
                <Grid
                    item
                    sm={4}
                    xs={10}
                    // style={{marginLeft:"2%"}}
                >
                    <Button onClick={this.showsubtask}>
                        <Listicon />
                    </Button>
                    {add}
                    <Button onClick={this.modalopen}>
                        <Deleteicon />
                    </Button>{" "}
                    <Button onClick={this.seteditflag}>
                        <Editicon />
                    </Button>
                </Grid>
            );
        }

        return (
            <Grid container direction="row" align="center">
                <Modal
                    name={this.props.task_name}
                    handleYes={this.deletetask}
                    handleNo={this.modalclose}
                    open={this.state.open}
                />
                {task}
                {button}
            </Grid>
        );
    }
}

Task.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Task);

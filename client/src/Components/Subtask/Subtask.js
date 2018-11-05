import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell/TableCell";

import { withStyles } from "@material-ui/core";
import styles from "./subtaskstyle";
import PropTypes from "prop-types";
import InputBase from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Grid from "@material-ui/core/Grid";
import Listicon from "@material-ui/icons/List";
import Editicon from "@material-ui/icons/Edit";
import Deleteicon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Hidden from "@material-ui/core/Hidden";
import Showspec from "./Showspec";
import Modal from "../Modal/Modal";
let options = [];
class Subtask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_name: this.props.subtask_name,
            edit_type: this.props.subtask_type,
            edit_option: this.props.subtask_option,
            option: "",
            edit_flag: 0,
            spec: -1,
            open: false
        };
    }
    modalopen = () => {
        this.setState({ open: true });
    };
    modalclose = () => {
        this.setState({ open: false });
    };
    setoption = e => {
        this.setState({ option: e.target.value });
    };
    setsubtaskname = e => {
        this.setState({ edit_name: e.target.value });
    };
    seteditflag = () => {
        this.setState({ edit_name: this.props.subtask_name });
        this.setState({ edit_flag: 1 });
    };
    deletesubtask = () => {
        this.props.deletesubtask(this.props.subtask_name);
        this.setState({ open: false });
    };
    closebox = () => {
        this.setState({ edit_flag: 0 });
    };
    opencreatebox = () => {
        this.props.opennextcreatebox(this.props.subtask_number);
    };
    editsubtask = () => {
        if (
            (this.state.edit_name !== this.props.subtask_name ||
                this.state.edit_type !== this.props.subtask_type) &&
            this.state.option === ""
        ) {
            this.props.editsubtask(
                this.props.id,
                this.state.edit_name,
                this.state.edit_type,
                this.state.edit_option
            );
            this.setState({ edit_flag: 0 });
        } else if (this.state.option !== "") {
            options.push(this.state.option);
            this.setState({ option: "" });
            this.setState({ edit_option: options });
        }
    };
    createnextsubtask = () => {
        this.props.createnexttask(this.props.subtask_number);
    };
    handleChange = event => {
        this.setState({ edit_option: [] });
        options = [];
        this.setState({ edit_type: event.target.value });
    };
    showspec = () => {
        this.props.showspec(this.props.subtask_number);
    };
    render() {
        const { classes } = this.props;
        let subtask, subtasktype;
        let button;
        let option1 = [];
        let inputbox, inputlabel;
        let label1, label2, input1, radio, page;
        if (this.state.edit_flag === 1) {
            label1 = (
                <FormLabel className={classes.bootstrapFormLabel}>
                    Specification Name
                    <br />
                </FormLabel>
            );
            input1 = (
                <InputBase
                    id="subtaskname"
                    placeholder="Enter a Specification name....."
                    value={this.state.edit_name}
                    onChange={this.setsubtaskname}
                    classes={{
                        root: classes.bootstrapRoot
                    }}
                />
            );

            label2 = (
                <FormLabel className={classes.bootstrapFormLabel}>
                    <br />
                    Specification Type
                </FormLabel>
            );
            radio = (
                <RadioGroup
                    aria-label="Spectype"
                    name="spec"
                    className={classes.group}
                    value={this.state.edit_type}
                    onChange={this.handleChange}
                >
                    <FormControlLabel
                        value="Textfield"
                        control={<Radio />}
                        label="Textfield"
                    />
                    <FormControlLabel
                        value="Number"
                        control={<Radio />}
                        label="Number"
                    />
                    <FormControlLabel
                        value="Date"
                        control={<Radio />}
                        label="Date"
                    />
                    <FormControlLabel
                        value="Dropdown"
                        control={<Radio />}
                        label="Dropdown"
                    />
                    <FormControlLabel
                        value="Checkbox"
                        control={<Radio />}
                        label="Checkbox"
                    />
                </RadioGroup>
            );
            for (var i = 0; i < this.state.edit_option.length; i++) {
                option1.push(
                    <FormLabel key={i} className={classes.group}>
                        Option {i + 1}: {this.state.edit_option[i]}
                    </FormLabel>
                );
            }
            if (
                this.state.edit_type === "Dropdown" ||
                this.state.edit_type === "Checkbox"
            ) {
                inputlabel = (
                    <FormLabel className={classes.bootstrapFormLabel}>
                        Specification Options{" "}
                    </FormLabel>
                );
                inputbox = (
                    <InputBase
                        id="subtasknameiuiu"
                        placeholder="Enter a Options....."
                        value={this.state.option}
                        onChange={this.setoption}
                        classes={{
                            root: classes.bootstrapRoot
                        }}
                    />
                );
            }
            if (
                this.state.edit_name === this.props.subtask_name &&
                this.state.edit_type === this.props.subtask_type &&
                this.state.option === ""
            ) {
                button = (
                    <TableCell>
                        {" "}
                        <Button onClick={this.closebox}>
                            <CloseIcon />
                        </Button>
                    </TableCell>
                );
            } else {
                button = (
                    <TableCell>
                        {" "}
                        <Button onClick={this.editsubtask}>
                            <DoneIcon />
                        </Button>
                    </TableCell>
                );
            }
            subtask = (
                <TableCell>
                    <FormControl className={classes.margin}>
                        {label1}
                        {input1}
                        {label2}
                        {radio}
                        {option1}
                        {inputlabel}
                        {inputbox}
                    </FormControl>
                </TableCell>
            );
        } else {
            subtask = (
                <Grid item sm={4} xs={2} className={classes.fontStyle}>
                    {this.props.subtask_name}
                </Grid>
            );
            subtasktype = (
                <Hidden only={["xs"]}>
                    <Grid item sm={3} className={classes.fontStyle}>
                        {this.props.subtask_type}
                    </Grid>
                </Hidden>
            );
            let add;
            if (this.props.add === 1) {
                add = (
                    <Button
                        onClick={() =>
                            this.props.openallsubtask(this.props.subtask_number)
                        }
                    >
                        <AddIcon />
                    </Button>
                );
            }
            button = (
                <Grid item sm={4} xs={10}>
                    <Button onClick={this.showspec}>
                        <Listicon />
                    </Button>
                    {add}
                    <Button onClick={this.modalopen}>
                        <Deleteicon />
                    </Button>
                    <Button onClick={this.seteditflag}>
                        <Editicon />
                    </Button>
                </Grid>
            );
        }
        if (this.state.spec === -1) {
            page = (
                <Grid container>
                    <Modal
                        name={this.props.subtask_name}
                        handleYes={this.deletesubtask}
                        handleNo={this.modalclose}
                        open={this.state.open}
                    />
                    {subtask}
                    {subtasktype}
                    {button}
                </Grid>
            );
        } else {
            page = (
                <Showspec
                    subtaskname={this.props.subtask_name}
                    subtasktype={this.props.subtask_type}
                    option={this.props.subtask_option}
                />
            );
        }
        return (
            <Grid container direction="row" align="center">
                {page}
            </Grid>
        );
    }
}

Subtask.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Subtask);

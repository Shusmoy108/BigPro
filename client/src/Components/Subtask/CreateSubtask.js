import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import InputBase from '@material-ui/core/TextField';

import styles from './subtaskstyle';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button"
import DoneIcon from "@material-ui/icons/Done"
import CloseIcon from "@material-ui/icons/Close"
let options = [];
class CreateSubtask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subtask_name: "",
            subtask_type: "Textfield",
            subtask_option: [],
            option: ""
        };
    }

    setcreateflag = () => {
        if (this.state.subtask_name && this.state.option === "") {
            this.props.createsubtask(this.state.subtask_name, this.state.subtask_type, this.state.subtask_option);
            this.props.show();
        }
        else if (this.state.option !== "") {
            options.push(this.state.option);
            this.setState({ option: "" });
            this.setState({ subtask_option: options });
        } else {
        }
    };
    closebox = () => {
        this.props.show();
    };
    handleChange = (event) => {
        this.setState({ subtask_option: [] });
        options = [];
        this.setState({ subtask_type: event.target.value });
    };
    setsubtaskname = (e) => {
        this.setState({ subtask_name: e.target.value });
    };
    setoption = (e) => {
        this.setState({ option: e.target.value });
    };
    render() {

        const { classes } = this.props;
        let button;
        let option1 = [];
        let inputbox, inputlabel;
        for (var i = 0; i < this.state.subtask_option.length; i++) {
            option1.push(<Typography variant="subheading" gutterBottom style={{ padding: 1 }} key={i}>Option {i + 1}:  {this.state.subtask_option[i]}</Typography>);
        }
        if ((this.state.subtask_type === "Dropdown" || this.state.subtask_type === "Checkbox")) {
            inputlabel = <Typography variant="title" gutterBottom>Specification Options </Typography>;
            inputbox = <InputBase
                id="subtasknameiuiu"
                placeholder="Enter a Options....."
                value={this.state.option}
                onChange={this.setoption}
                classes={{
                    root: classes.bootstrapRoot,

                }}
            />;
        }
        if (this.state.subtask_name === "")
            button = <Button
                onClick={this.closebox}
            ><CloseIcon /></Button>;
        else
            button = <Button
                onClick={this.setcreateflag}
            ><DoneIcon /></Button>;
        return (
            <Grid container>
                <Grid item sm={3} xs={10} style={{ marginLeft: 20, marginTop: 20 }}>
                    <Typography variant="title" gutterBottom>
                        Specification-Name
                </Typography>
                    <InputBase
                        id="productname"
                        placeholder="Enter a Specification name....."
                        value={this.state.subtask_name}
                        onChange={this.setsubtaskname}
                        classes={{
                            root: classes.bootstrapRoot,

                        }}
                    />
                </Grid>
                <Grid item sm={4} xs={10} style={{ marginLeft: 10, marginTop: 20 }}>
                    <Typography variant="title" gutterBottom>Specification Type</Typography>
                    <RadioGroup
                        aria-label="Spectype"
                        name="spec"
                        className={classes.group}
                        value={this.state.subtask_type}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel
                            value="Textfield"
                            control={<Radio />}
                            label="Textfield"
                        />
                        <FormControlLabel value="Number" control={<Radio />} label="Number" />
                        <FormControlLabel value="Date" control={<Radio />} label="Date" />
                        <FormControlLabel value="Dropdown" control={<Radio />} label="Dropdown" />
                        <FormControlLabel value="Checkbox" control={<Radio />} label="Checkbox" />
                    </RadioGroup>
                </Grid>
                <Grid item sm={3} xs={10} style={{ marginLeft: 10, marginTop: 20 }}>
                    {inputlabel}
                    {option1}
                    {inputbox}
                </Grid>
                <Grid item sm={1} xs={10} >
                    {button}
                </Grid>


            </Grid>
        );
    }
}

CreateSubtask.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateSubtask);

import React, { Component } from 'react';
import TableCell from "@material-ui/core/TableCell/TableCell";
import Icon from "@material-ui/core/Icon/Icon";
import classNames from 'classnames';
import {withStyles} from "@material-ui/core";
import styles from "./subtaskstyle";
import PropTypes from 'prop-types';
import InputBase from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
let options=[];
class Subtask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_name: this.props.subtask_name,
            edit_type: this.props.subtask_type,
            edit_option:this.props.subtask_option,
            option:"",
            edit_flag:0
        };
    }
    setoption = (e) => {
        console.log("option chnaging",e.target.value);
        this.setState({ option: e.target.value });

    };
    setsubtaskname = (e) => {
        this.setState({ edit_name: e.target.value });
    };
    seteditflag= () => {
        this.setState({ edit_name: this.props.subtask_name });
        this.setState({ edit_flag:1 });
    };
    deletesubtask = () => {
        this.props.deletesubtask(this.props.subtask_name);
    };
    closebox=()=>{
        this.setState({edit_flag: 0});
    };
    editsubtask = () => {

        if((this.state.edit_name!==this.props.subtask_name||this.state.edit_type!==this.props.subtask_type) && this.state.option === "") {

            this.props.editsubtask(this.props.id, this.state.edit_name, this.state.edit_type, this.state.edit_option);
            this.setState({edit_flag: 0});
        }
        else if(this.state.option!=="")
        {
            options.push(this.state.option);
            this.setState({ option: "" });
            this.setState({edit_option: options });
        }

    };
    handleChange = (event) => {
        this.setState({edit_option: [] });
        options=[];
        this.setState({edit_type: event.target.value });

        //console.log(this.state.subtask_type)
    };
    render() {
        const { classes } = this.props;
        let subtask,subtasktype;
        let button;
        let option1=[];
        let inputbox,inputlabel;
        let label1,label2,input1,radio;
        if(this.state.edit_flag===1){
            label1=<FormLabel className={classes.bootstrapFormLabel}>Specification Name<br/></FormLabel>
            input1=   <InputBase
            id="subtaskname"
            placeholder="Enter a Specification name....."
            value={this.state.edit_name}
            onChange={this.setsubtaskname}
            classes={{
                root: classes.bootstrapRoot,
            }}
            />;


            label2= <FormLabel className={classes.bootstrapFormLabel}><br/>Specification Type</FormLabel>
             radio =<RadioGroup
            aria-label="Spectype"
            name="spec"
            className={classes.group}
            value={this.state.edit_type}
            onChange={this.handleChange}
        >
                <FormControlLabel value="Textfield" control={<Radio />} label="Textfield"/>
                <FormControlLabel value="Number" control={<Radio />} label="Number" />
                <FormControlLabel value="Date" control={<Radio />} label="Date" />
                <FormControlLabel value="Dropdown" control={<Radio />} label="Dropdown" />
                <FormControlLabel value="Checkbox" control={<Radio />} label="Checkbox" />
            </RadioGroup>;
            for(var i=0;i<this.state.edit_option.length;i++)
            {
                option1.push (<FormLabel key={i} className={classes.group}>Option {i+1}:  {this.state.edit_option[i]}</FormLabel>);
            }
            if((this.state.edit_type==="Dropdown" || this.state.edit_type==="Checkbox")) {
                inputlabel = <FormLabel className={classes.bootstrapFormLabel}>Specification Options </FormLabel>;
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
            if((this.state.edit_name===this.props.subtask_name)&&(this.state.edit_type===this.props.subtask_type) && (this.state.option==="")){
                button=<TableCell> <Icon
                    className={classNames(classes.icon, 'fa fa-times')}
                    color="disabled"
                    fontSize="default"
                    onClick={this.closebox}
                /></TableCell>;
            }
            else {

                button = <TableCell> <Icon
                    className={classNames(classes.icon, 'fa fa-check-circle')}
                    color="disabled"
                    fontSize="default"
                    onClick={this.editsubtask}
                /></TableCell>;
            }
            subtask= <TableCell><FormControl className={classes.margin}>
                {label1}
                {input1}
                {label2}
                {radio}
                {option1}
                {inputlabel}
                {inputbox}
            </FormControl></TableCell>
        }
        else{
            subtask=
              <Grid item sm={4} xs={4}>
                  <Typography style={{paddingTop:20}}>
                    {this.props.subtask_name}
                  </Typography>
              </Grid>;
                subtasktype=<Grid item sm={4} xs={4}>
                    <Typography style={{paddingTop:20}}>
                    {this.props.subtask_type}
                    </Typography>
                </Grid>;
            button=    <Grid item sm={4} xs={4}> <Icon
                className={classNames(classes.icon, 'fa fa-trash')}
                color="disabled"
                fontSize="default"
                onClick={this.deletesubtask}
            /> <Icon
                className={classNames(classes.icon, 'fa fa-pencil')}
                color="disabled"
                fontSize="default"
                onClick={this.seteditflag}
            /></Grid>;
        }


        return (
            <Grid container style={{paddingLeft:20}} >

                {subtask}
                {subtasktype}
                {button}

            </Grid>
        );
    }
}

Subtask.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Subtask);
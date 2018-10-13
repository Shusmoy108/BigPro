import React, { Component } from 'react';
import Icon from "@material-ui/core/Icon/Icon";
import classNames from 'classnames';
import {withStyles} from "@material-ui/core";
import styles from "./taskstyle";
import PropTypes from 'prop-types';
import InputBase from "@material-ui/core/Input/Input";
import Grid from "@material-ui/core/Grid/Grid";
import Listicon from "@material-ui/icons/List"
import Editicon from "@material-ui/icons/Edit"
import Deleteicon from "@material-ui/icons/Delete"
import Button from "@material-ui/core/Button"
import DoneIcon from "@material-ui/icons/Done"
import CloseIcon from "@material-ui/icons/Close"
import AddIcon from "@material-ui/icons/Add"

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_name: "",
            edit_flag:0,
            task_name:"",
            createflag:0
        };
    }
    opencreatebox = () => {
        this.props.opennextcreatebox(this.props.task_number);
    };
    settaskname = (e) => {
        this.setState({ edit_name: e.target.value });
    };
    seteditflag= () => {
        this.setState({ edit_name: this.props.task_name });
        this.setState({ edit_flag:1 });
    };
    deletetask = () => {
        this.props.deletetask(this.props.task_name);
    };
    edittask = () => {
        if(this.state.edit_name!==this.props.task_name)
            this.props.edittask(this.props.task_name,this.state.edit_name);
        this.setState({ edit_flag:0 });
    };
    showsubtask =()=>{
      this.props.showsubtask(this.props.task_number);
    };
    render() {
        const { classes } = this.props;
        let task;
        let button;

        if(this.state.edit_flag===1){
            task= <Grid sm={8} xs={6} >   <InputBase
                id="productname"
                placeholder="Enter a Taskname....."
                value={this.state.edit_name}
                onChange={this.settaskname}
                classes={{
                    root: classes.bootstrapRoot,
                    input: classes.bootstrapInput,

                }}
            /></Grid>;
            if(this.state.edit_name===this.props.task_name)
                button= <Grid sm={4} xs={6}> <Button
                    onClick={this.edittask}
                ><CloseIcon/></Button></Grid>;
            else
                button= <Grid sm={4} xs={6}> <Button
                    onClick={this.edittask}
                ><DoneIcon/></Button></Grid>;
        }
        else{
            task=
                <Grid item sm={8} xs={3} style={{
                    fontFamily: 'Dekko',
                    fontSize: 20,
                }}>
                    {this.props.task_name}
                </Grid>;
            button=     <Grid item sm={4} xs={9}><Button
                onClick={this.showsubtask}
            ><Listicon/></Button> <Button
                onClick={this.opencreatebox}
            ><AddIcon/></Button><Button
                onClick={this.deletetask}
            ><Deleteicon/></Button> <Button
                onClick={this.seteditflag}
            ><Editicon/></Button></Grid>;
        }


        return (
            <Grid container style={{paddingLeft:20,paddingBottom:10}} >
                {task}
                {button}
            </Grid>
        );
    }
}

Task.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Task);
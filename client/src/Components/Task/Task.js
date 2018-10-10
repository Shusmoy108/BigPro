import React, { Component } from 'react';
import Icon from "@material-ui/core/Icon/Icon";
import classNames from 'classnames';
import {withStyles} from "@material-ui/core";
import styles from "./taskstyle";
import PropTypes from 'prop-types';
import InputBase from "@material-ui/core/Input/Input";
import Grid from "@material-ui/core/Grid/Grid";

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
    closecreatebox = () => {
        //let e=0;
        this.setState(state => ({ createflag: 0 }));
    };
    settaskname = (e) => {
        this.setState({ edit_name: e.target.value });
    };
    seteditflag= () => {
        this.setState({ edit_name: this.props.task_name });
        this.setState({ edit_flag:1 });
    };
    setnextaskname= (e)=>{
        this.setState({ task_name: e.target.value });
        this.setState({ createflag:0 });
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
                button= <Grid sm={4} xs={6}> <Icon
                    className={classNames('fa fa-times')}
                    color="disabled"
                    fontSize="default"
                    onClick={this.edittask}
                    style={{paddingLeft:20, paddingTop:5}}
                /></Grid>;
            else
                button= <Grid sm={4} xs={6}> <Icon
                    className={classNames( 'fa fa-check-circle')}
                    color="disabled"
                    fontSize="default"
                    onClick={this.edittask}
                    style={{paddingLeft:20, paddingTop:5}}
                /></Grid>;
        }
        else{
            task=
                <Grid item sm={8} xs={6} style={{
                    fontFamily: 'Dekko',
                    fontSize: 30,
                }}>
                    {this.props.task_name}
                </Grid>;
            button=     <Grid item sm={4} xs={6}><Icon
                className={classNames('fa fa-list-ul')}
                color="disabled"
                fontSize="default"
                onClick={this.showsubtask}
                style={{paddingRight:25,paddingTop:12}}
            /> <Icon
                className={classNames('fa fa-trash')}
                color="disabled"
                fontSize="default"
                onClick={this.deletetask}
                style={{paddingRight:25,paddingTop:12}}
            /> <Icon
                className={classNames('fa fa-pencil')}
                color="disabled"
                fontSize="default"
                onClick={this.seteditflag}
                style={{paddingRight:25,paddingTop:12}}
            /></Grid>;
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CreateSubtask from '../Subtask/CreateSubtask';
import styles from '../Subtask/subtaskstyle';
import classNames from 'classnames';
import Subtask from '../Subtask/Subtask';
import BackIcon from "@material-ui/icons/FastRewind"

import Icon from "@material-ui/core/Icon/Icon";
import Grid from "@material-ui/core/Grid/Grid";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/Add";


class SubtaskBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createflag: 0,
            subtasklist:this.props.subtasklist,
            taskname:this.props.taskname,
            showpage:"subtask",
            usertype:"",
            username:"",
            showsubtask:-1,
            subtasknumber:-1
        };
    }
    setpage = (e) => {
        this.setState(state => ({ showpage: e }));
        if(this.state.showpage!=="subtask")
            this.props.history.push('/');

    };
    opencreatebox = () => {
        let e=1;
        this.setState(state => ({ createflag: e }));
        this.setState(state => ({ subtasknumber: -1 }));
    };
    closecreatebox = () => {
        let e=0;
        this.setState(state => ({ createflag: e }));
        this.setState(state => ({ subtasknumber: -1 }));
    };
    opennextcreatebox = (x) => {
        this.setState(state => ({ createflag: 0 }));
        this.setState(state => ({ subtasknumber: x }));
        console.log(x);
    };
    createsubtask = (e,n,f) => {
      this.props.createsubtask(this.state.taskname,e,n,f,this.state.subtasknumber);
        console.log(this.state.subtasknumber);
        this.setState(state => ({ subtasklist: this.props.subtasklist }));
    };
    deletesubtask = (e) => {
        this.props.deletesubtask(this.state.taskname,e);
    };
    editsubtask = (e,n,f,g,) => {
        this.props.editsubtask(this.state.taskname,e,n,f,g);
    };
    showsubtask=()=>{
      this.props.showsubtask(-1);
    };

    render() {
        const { classes } = this.props;
        let subtask;
        if(this.state.showsubtask===-1) {
            let create;
            if(this.state.createflag===1) {
                create = <CreateSubtask createsubtask={this.createsubtask} show={this.closecreatebox}/>;
            }
            let subtasklist=[];

            for(var i=0;i<this.props.subtasklist.length;i++){
                subtasklist.push(<Subtask key={i} id={this.props.subtasklist[i]._id} opennextcreatebox={this.opennextcreatebox} subtask_number={i} subtask_name={this.props.subtasklist[i].subtask_name} subtask_type={this.props.subtasklist[i].subtask_type} subtask_option={this.props.subtasklist[i].subtask_option} deletesubtask={this.deletesubtask} editsubtask={this.editsubtask}/>)
                if(i===this.state.subtasknumber){
                    subtasklist.push(<CreateSubtask createsubtask={this.createsubtask} show={this.closecreatebox} key={this.props.subtasklist.length}/>);
                }
            }
            subtask=
                <Grid container spacing={0}>
                    {create}
                    <Hidden only={["xs"]}>
                        <Grid item sm={8} xs={6} style={{
                            fontFamily: 'Dekko',
                            fontSize: 30,
                            paddingLeft: 20

                        }}>  <Button  variant="flat" onClick={this.showsubtask} color={"primary"}>
                            <BackIcon />
                        </Button>
                            {this.props.product_name}>>{this.props.task_name}
                        </Grid>
                    </Hidden>

                    <Hidden only={["sm","md","lg","xl"]}>
                        <Grid item sm={8} xs={10} style={{
                            fontFamily: 'Dekko',
                            fontSize: 20,
                            paddingLeft: 20

                        }}>  <Button  variant="flat" onClick={this.showsubtask} color={"primary"}>
                            <BackIcon />
                        </Button>
                            {this.props.product_name}>>{this.props.task_name}
                        </Grid>
                    </Hidden>
                    <Hidden only={["xs"]}>
                        <Grid item sm={4} xs={6}> <Button
                            onClick={this.opencreatebox}
                        ><AddIcon/></Button> </Grid>
                    </Hidden>
                    {subtasklist}
                </Grid>
        }
        console.log(subtask);
        return (
            <div >
                {subtask}
                <Hidden only={["sm", "md", "lg", "xl"]}>
                    <Button
                        variant="fab"
                        color="primary"
                        aria-label="Add"
                        onClick={this.opencreatebox}
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
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubtaskBody);

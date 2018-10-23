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
import Showspec from "../Subtask/Showspec";


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
            subtasknumber:-1,
            spec:-1
        };
    }
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
      this.props.createsubtask(this.props.taskname,e,n,f,this.state.subtasknumber);
      this.setState(state => ({ subtasknumber: -1 }));
        console.log(this.state.subtasknumber);
        this.setState(state => ({ subtasklist: this.props.subtasklist }));
    };
    deletesubtask = (e) => {
        this.props.deletesubtask(this.props.taskname,e);
    };
    editsubtask = (e,n,f,g,) => {
        this.props.editsubtask(this.props.taskname,e,n,f,g);
    };

    showsubtask=()=>{
      this.props.showsubtask(-1);
    };
    showspec=(x)=>{
        console.log(x);
        this.setState({spec:x});
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
                subtasklist.push(<Subtask key={i} add={1} showspec={this.showspec} id={this.props.subtasklist[i]._id} opennextcreatebox={this.opennextcreatebox} subtask_number={i} subtask_name={this.props.subtasklist[i].subtask_name} subtask_type={this.props.subtasklist[i].subtask_type} subtask_option={this.props.subtasklist[i].subtask_option} deletesubtask={this.deletesubtask} editsubtask={this.editsubtask}/>)
                if(i===this.state.subtasknumber){
                    subtasklist.push(<CreateSubtask createsubtask={this.createsubtask} show={this.closecreatebox} key={this.props.subtasklist.length}/>);
                }
            }
            subtask=
                <Grid container  direction="row" align="center">
                    {create}
                
                        <Grid item sm={4} xs={10} style={{
                            fontFamily: 'Dekko',
                            fontSize: 15,
                            //marginLeft:"5%"

                        }}>  <Button  variant="flat" onClick={this.showsubtask} color={"primary"}>
                            <BackIcon />
                        </Button>
                            Specifications of {this.props.taskname}
                        </Grid>
                    <Hidden only={["xs"]}>
                        <Grid item sm={2} xs={6}> <Button
                            onClick={this.opencreatebox}
                            //style={{marginLeft:"20%"}}
                        ><AddIcon/></Button> </Grid>
                    </Hidden>
                    {subtasklist}
                </Grid>
        }
        if(this.state.spec!==-1){
            subtask=<Showspec back={this.showspec} subtaskname={this.props.subtasklist[this.state.spec].subtask_name} subtasktype={this.props.subtasklist[this.state.spec].subtask_type} option={this.props.subtasklist[this.state.spec].subtask_option}/>
        }
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

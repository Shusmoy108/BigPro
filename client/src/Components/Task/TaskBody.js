import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CreateTask from './CreateTask';
import styles from './taskstyle';
import classNames from 'classnames';
import Task from './Task';
import Axios from 'Utils/Axios';
import Header from "../Header/Header";
import Grid from "@material-ui/core/Grid/Grid";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/Add";
import TaskSubtaskbody from './TaskSubtaskBody'

class TaskBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createflag: 0,
            tasklist:[],
            showpage:"task",
            usertype:"",
            username:"",
            subtask:-1,
            craetenextflag:0,
            tasknumber:-1,
        };
    }

opencreatebox = () => {
        this.setState({ createflag: 1 });
        console.log(this.state.createflag);
    };
    closecreatebox = () => {
        this.setState({ createflag: 0 });
        this.setState(state => ({ tasknumber: -1 }));
    };
    opennextcreatebox = (x) => {
        this.setState(state => ({ createflag: 0 }));
        this.setState(state => ({ tasknumber: x }));
        console.log(x);
    };
    closenextcreatebox = () => {
        this.setState(state => ({ craetenextflag: 0 }));
        this.setState(state => ({ tasknumber: -1 }));
    };
    
    createtask = (e) => {
        let that=this;
        console.log(e,"beforeaxios");
        Axios.createtask(e,this.state.tasknumber, function(err, data){
            if(err) that.setState({msgLogin : err});
            else {
                that.setState({ tasklist: data.tasks });
            }
        })
    };
    closenext(){

    }
    deletetask = (e) => {
        let that=this;
        //console.log(e+"beforeaxios");
        Axios.deletetask(e, function(err, data){
            if(err) that.setState({msgLogin : err});
            else {
                that.setState({ tasklist: data.tasks });
            }
        })
    };
    edittask = (e,n) => {
        let that=this;
        //console.log(e+"beforeaxios");
        Axios.edittask(e,n, function(err, data){
            if(err) that.setState({msgLogin : err});
            else {
                that.setState({ tasklist: data.tasks });
            }
        })
    };
    showsubtask = (e) =>{
        this.setState({subtask:e});
    };
    createsubtask = (e,n,f,g,i) =>{
        //this.props.createproductsubtask(e,n,f,g,i,j)
        let that=this;
        console.log(e,n,g,f,i);
        //console.log(e+"beforeaxios");
        Axios.createtasksubtask(e,n,f,g,i, function(err, data){
            if(err) that.setState({msgLogin : err});
            else {
                that.setState({ tasklist: data.tasks });
            }
        })
        console.log(i);
    };
    deletesubtask = (e,n) =>{
        let that=this;
        Axios.deletetasksubtask(e,n,function(err, data){
            if(err) that.setState({msgLogin : err});
            else {
                that.setState({ tasklist: data.tasks });
            }
        })
        //this.props.deleteproductsubtask(this.props.id,e,n);
    };
    editsubtask = (e,n,f,g,i) =>{
        let that=this;
        Axios.edittasksubtask(e,n,f,g,i,function(err, data){
            if(err) that.setState({msgLogin : err});
            else {
                that.setState({ tasklist: data.tasks });
            }
        })
        //this.props.editproductsubtask(this.props.id,e,n,f,g,i);
    };
    componentDidMount() {
        let that=this;
        Axios.showtask(function(err, data){
            if (err) {
                console.log(err,"err");
                that.props.history.push('/');
            }
            else {
                console.log(data);
                that.setState({tasklist: data.tasks,usertype:data.user.usertype, username:data.user.username});
                console.log(that.state.tasklist,"lossss");
            }
        });
    }

    render() {
        const { classes } = this.props;
        let task;
        if(this.state.subtask===-1) {
            let create;
            if (this.state.createflag === 1) {
                create = <CreateTask closenext={this.closenext} createtask={this.createtask} show={this.closecreatebox}/>;
            }
            let tasklist = [];
            for (var i = 0; i < this.state.tasklist.length; i++) {
                tasklist.push(<Task key={i} id={this.state.tasklist[i]._id} task_number={i} add={0}
                    opennextcreatebox={this.opennextcreatebox}
                                    showsubtask={this.showsubtask} task_name={this.state.tasklist[i].task_name}
                                    deletetask={this.deletetask} edittask={this.edittask}/>)
                                    if(i===this.state.tasknumber){
                                        tasklist.push(<CreateTask createnexttask={this.createnexttask} key={this.state.tasklist.length} closenext={this.closenextcreatebox} createtask={this.createtask} show={this.closecreatebox}/>)
                                    }
            }
            task=
                <Grid container spacing={0} direction="row" align="center">
                    {create}
                    <Grid item sm={4} xs={6} style={{
                        fontFamily: 'Dekko',
                        fontSize: 30,
                        //paddingLeft: 20

                    }}>
                        Step-List
                    </Grid>
                    <Hidden only={["xs"]}>
                        <Grid item sm={4} xs={6}> <Button onClick={this.opencreatebox}>
                        <AddIcon/>
                        </Button>
                     </Grid>
                    </Hidden>
                    {tasklist}
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
                </Grid>
        }
        else{
            task=<TaskSubtaskbody showsubtask={this.showsubtask} createsubtask={this.createsubtask} deletesubtask={this.deletesubtask} editsubtask={this.editsubtask} taskname={this.state.tasklist[this.state.subtask].task_name} subtasklist={this.state.tasklist[this.state.subtask].subtask}/>
        }
        return (
            <div >
                <Header history={this.props.history} username={this.state.username} usertype={this.state.usertype}/>
                {task}
               
            </div>
        );
    }
}

TaskBody.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskBody);

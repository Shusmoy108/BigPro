import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CreateTask from './CreateTask';
import styles from './taskstyle';
import classNames from 'classnames';
import Task from './Task';
import Axios from 'Utils/Axios';


import Icon from "@material-ui/core/Icon/Icon";
import Header from "../Header/Header";
import Grid from "@material-ui/core/Grid/Grid";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/Add";


class TaskBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createflag: 0,
            tasklist:[],
            showpage:"task",
            usertype:"",
            username:"",
            subtask:-1
        };
    }
    setpage = (e) => {
        this.setState(state => ({ showpage: e }));
        if(this.state.showpage!=="task")
            this.props.history.push('/');

    };
    opencreatebox = () => {
        let e=1;
        this.setState(state => ({ createflag: e }));
    };
    closecreatebox = () => {
        let e=0;
        this.setState(state => ({ createflag: e }));
    };
    createtask = (e) => {
        let that=this;
        console.log(e,"beforeaxios");
        Axios.createtask(e, function(err, data){
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
                tasklist.push(<Task key={i} id={this.state.tasklist[i]._id} task_number={i}
                                    showsubtask={this.showsubtask} task_name={this.state.tasklist[i].task_name}
                                    deletetask={this.deletetask} edittask={this.edittask}/>)
            }
            task=
                <Grid container spacing={0}>
                    {create}
                    <Grid item sm={8} xs={6} style={{
                        fontFamily: 'Dekko',
                        fontSize: 30,
                        paddingLeft: 20

                    }}>
                        Step-List
                    </Grid>
                    <Hidden only={["xs"]}>
                        <Grid item sm={4} xs={6}> <Icon
                            className={classNames('fa fa-plus-circle')}
                            color="disabled"
                            fontSize="default"
                            onClick={this.opencreatebox}
                            style={{paddingTop:10,paddingLeft:60}}
                        /> </Grid>
                    </Hidden>
                    {tasklist}
                </Grid>
        }
        return (
            <div >
                <Header history={this.props.history} username={this.state.username} usertype={this.state.usertype}/>
                {task}
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

TaskBody.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskBody);

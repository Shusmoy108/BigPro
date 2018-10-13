import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CreateSubtask from './CreateSubtask';
import styles from './subtaskstyle';
import classNames from 'classnames';
import Subtask from './Subtask';
import Axios from 'Utils/Axios';

import AddIcon from "@material-ui/icons/Add"

import Icon from "@material-ui/core/Icon/Icon";
import Header from "../Header/Header";

import Grid from "@material-ui/core/Grid/Grid";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Button from "@material-ui/core/Button/Button";



class SubtaskBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createflag: 0,
            subtasklist:[],
            showpage:"subtask",
            usertype:"",
            username:"",
            showsubtask:-1
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
    };
    closecreatebox = () => {
        let e=0;
        this.setState(state => ({ createflag: e }));
    };
    createsubtask = (e,n,f) => {
        let that=this;
        console.log(e,"beforeaxios");
        Axios.createsubtask(e,n,f,function(err, data){
            if(err) that.setState({msgLogin : err});
            else {
                that.setState({ subtasklist: data.subtasks });
            }
        })
    };
    deletesubtask = (e) => {
        let that=this;
        //console.log(e+"beforeaxios");
        Axios.deletesubtask(e, function(err, data){
            if(err) that.setState({msgLogin : err});
            else {
                that.setState({ subtasklist: data.subtasks });
            }
        })
    };
    editsubtask = (e,n,f,g,) => {
        let that=this;
        //console.log(e+"beforeaxios");
        console.log(n,f,g);
        Axios.editsubtask(e,n,f,g, function(err, data){
            if(err) that.setState({msgLogin : err});
            else {
                that.setState({ subtasklist: data.subtasks });
            }
        })
    };

    componentDidMount() {
        let that=this;
        Axios.showsubtask(function(err, data){
            if (err) {
                console.log(err,"err");
                that.props.history.push('/');
            }
            else {
                console.log(data);
                that.setState({subtasklist: data.subtasks,usertype:data.user.usertype, username:data.user.username});
                console.log(that.state.subtasklist,"lossss");
            }
        });
    }

    render() {
        const { classes } = this.props;
        let subtask;
        if(this.state.showsubtask===-1) {
            let create;
            if(this.state.createflag===1) {
                create = <CreateSubtask createsubtask={this.createsubtask} show={this.closecreatebox}/>;
            }
            let subtasklist=[];
            for(var i=0;i<this.state.subtasklist.length;i++){
                subtasklist.push(<Subtask key={i} id={this.state.subtasklist[i]._id} subtask_name={this.state.subtasklist[i].subtask_name} subtask_type={this.state.subtasklist[i].subtask_type} subtask_option={this.state.subtasklist[i].subtask_option} deletesubtask={this.deletesubtask} editsubtask={this.editsubtask}/>)
            }
            subtask=
                <Grid container spacing={0}>
                    {create}
                    <Hidden only={["xs"]}>
                    <Grid item sm={8} xs={6} style={{
                        fontFamily: 'Dekko',
                        fontSize: 30,
                        paddingLeft: 20

                    }}>
                        Specification-List
                    </Grid>
                    </Hidden>

                    <Hidden only={["sm","md","lg","xl"]}>
                        <Grid item sm={8} xs={10} style={{
                            fontFamily: 'Dekko',
                            fontSize: 30,
                            paddingLeft: 20

                        }}>
                            Specification-List
                        </Grid>
                    </Hidden>
                    <Hidden only={["xs"]}>
                        <Grid item sm={4} xs={6}> <Icon
                            className={classNames('fa fa-plus-circle')}
                            color="disabled"
                            fontSize="default"
                            onClick={this.opencreatebox}
                            style={{paddingTop:10,paddingLeft:60}}
                        /> </Grid>
                    </Hidden>
                    {subtasklist}
                </Grid>
        }

        return (
            <div >
                <Header history={this.props.history} username={this.state.username} usertype={this.state.usertype}/>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CreateTask from '../Task/CreateTask';
import styles from '../Task/taskstyle';
import classNames from 'classnames';
import Task from '../Task/Task';
import Icon from "@material-ui/core/Icon/Icon";
import ProductSubtaskbody from './ProductSubtaskbody'
import Grid from "@material-ui/core/Grid/Grid";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/Add";
import BackIcon from "@material-ui/icons/FastRewind"
class TaskBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createflag: 0,
            tasklist:this.props.tasklist,
            subtask:-1,
            craetenextflag:0,
            tasknumber:-1,
            nexttask:-1,

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
    };
    closenextcreatebox = () => {
        this.setState(state => ({ craetenextflag: 0 }));
        this.setState(state => ({ tasknumber: -1 }));
    };
    createtask = (e) => {
        console.log(e,"beforeaxios");
        this.props.createproducttask(this.props.id,e);

    };
    deletetask = (e) => {
        this.props.deleteproducttask(this.props.id,e)
    };
    edittask = (e,n) => {
        this.props.editproducttask(this.props.id,e,n);
    };
    showtask=()=>{
        this.props.showtask(-1);
    };
    createsubtask = (e,n,f,g) =>{
        this.props.createproductsubtask(this.props.id,e,n,f,g);
    };
    deletesubtask = (e,n) =>{
        this.props.deleteproductsubtask(this.props.id,e,n);
    };
    editsubtask = (e,n,f,g,i) =>{
        this.props.editproductsubtask(this.props.id,e,n,f,g,i);
    };
    showsubtask = (e) =>{
        this.setState({subtask:e})
    };
    createnexttask=(e)=>{
        this.setState({nexttask:e});
    };
    render() {
        const { classes } = this.props;
        let task;
        if(this.state.subtask===-1) {
            let create;
            if (this.state.createflag === 1) {
                create = <CreateTask createnexttask={this.createnexttask} closenext={this.closenextcreatebox} createtask={this.createtask} show={this.closecreatebox}/>;
            }
            console.log(create,this.state.createflag);
            let tasklist = [];
            console.log(this.props.tasklist);
            for (var i = 0; i < this.props.tasklist.length; i++) {
                tasklist.push(<Task key={i} id={this.props.tasklist[i]._id} task_number={i}
                                    createnexttask={this.opennextcreatebox}
                                    showsubtask={this.showsubtask} task_name={this.props.tasklist[i].task_name}
                                    deletetask={this.deletetask} edittask={this.edittask}/>)
                if(i===this.state.tasknumber){
                    tasklist.push(<CreateTask createnexttask={this.createnexttask} key={this.props.tasklist.length} closenext={this.closenextcreatebox} createtask={this.createtask} show={this.closecreatebox}/>)
                }
            }
            task=
                <div>
                <Grid container spacing={0}>
                    {create}
                    <Grid item sm={8} xs={6} style={{
                        fontFamily: 'Dekko',
                        fontSize: 20,
                        paddingLeft: 20

                    }}>
                        <Button  variant="flat" onClick={this.showtask} color={"primary"}>
                        <BackIcon />
                        </Button>
                        Steps of {this.props.product_name}
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
        }
       else{
            console.log(this.props.tasklist,"task");
            task=<ProductSubtaskbody product_name={this.props.product_name} showsubtask={this.showsubtask} createsubtask={this.createsubtask} deletesubtask={this.deletesubtask} editsubtask={this.editsubtask} taskname={this.props.tasklist[this.state.subtask]._id} task_name={this.props.tasklist[this.state.subtask].task_name} subtasklist={this.props.tasklist[this.state.subtask].subtask}/>
        }
        return (
            <div >
                {task}
            </div>
        );
    }
}

TaskBody.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskBody);

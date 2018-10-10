import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CreateTask from '../Task/CreateTask';
import styles from '../Task/taskstyle';
import classNames from 'classnames';
import Task from '../Task/Task';

import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Icon from "@material-ui/core/Icon/Icon";
import TableBody from "@material-ui/core/TableBody/TableBody";
import ProductSubtaskbody from './ProductSubtaskbody'

class TaskBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createflag: 0,
            tasklist:this.props.tasklist,
            subtask:-1,
            craetenextflag:0,
            tasknumber:-1

        };
    }
    opencreatebox = () => {
        let e=1;
        this.setState(state => ({ createflag: e }));
    };
    closecreatebox = () => {
        let e=0;
        this.setState(state => ({ createflag: e }));
    };
    opennextcreatebox = (x) => {
        let e=1;
        this.setState(state => ({ craetenextflag: e }));
        this.setState(state => ({ tasknumber: x }));
    };
    closenextcreatebox = () => {
        let e=0;
        this.setState(state => ({ craetenextflag: e }));
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

    render() {
        const { classes } = this.props;
        let create;
        let task;
        if(this.state.subtask===-1){
            if(this.state.createflag===1) {
                create = <CreateTask createtask={this.createtask} show={this.closecreatebox} closenext={this.closenextcreatebox}/>;
            }
            let tasklist=[];
            for(var i=0;i<this.props.tasklist.length;i++){
                tasklist.push(<Task key={i}  opencreatebox={this.opennextcreatebox} task_name={this.props.tasklist[i].task_name} task_number={i} showsubtask={this.showsubtask} deletetask={this.deletetask} edittask={this.edittask}/>)
                if(i===5){}
            }
            task=
            <Paper className={classes.root}>
                {create}
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row" ><Icon
                                className={classNames(classes.icon, 'fa fa-backward')}
                                color="disabled"
                                fontSize="default"
                                onClick={this.showtask}
                            /> </TableCell><TableCell>Steps of {this.props.product_name}  </TableCell>
                            <TableCell> <Icon
                                className={classNames(classes.icon, 'fa fa-plus-circle')}
                                color="disabled"
                                fontSize="default"
                                onClick={this.opencreatebox}
                            /> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasklist}
                    </TableBody>
                </Table>
            </Paper>
        }
       else{
            console.log(this.state.productlist,"task");
            task=<ProductSubtaskbody showsubtask={this.showsubtask} createsubtask={this.createsubtask} deletesubtask={this.deletesubtask} editsubtask={this.editsubtask} taskname={this.props.tasklist[this.state.subtask]._id} subtasklist={this.props.tasklist[this.state.subtask].subtask}/>
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

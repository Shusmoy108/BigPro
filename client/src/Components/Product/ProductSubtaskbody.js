import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CreateSubtask from '../Subtask/CreateSubtask';
import styles from '../Subtask/subtaskstyle';
import classNames from 'classnames';
import Subtask from '../Subtask/Subtask';


import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Icon from "@material-ui/core/Icon/Icon";
import TableBody from "@material-ui/core/TableBody/TableBody";


class SubtaskBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createflag: 0,
            subtasklist:this.props.subtasklist,
            taskname:this.props.taskname,
            showpage:"subtask",
            usertype:"",
            username:""
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
      this.props.createsubtask(this.state.taskname,e,n,f);
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
        let create;
        if(this.state.createflag===1) {
            create = <CreateSubtask createsubtask={this.createsubtask} show={this.closecreatebox}/>;
        }
        let subtasklist=[];
        for(var i=0;i<this.props.subtasklist.length;i++){
            subtasklist.push(<Subtask key={i} id={this.props.subtasklist[i]._id} subtask_name={this.props.subtasklist[i].subtask_name} subtask_type={this.props.subtasklist[i].subtask_type} subtask_option={this.props.subtasklist[i].subtask_option} deletesubtask={this.deletesubtask} editsubtask={this.editsubtask}/>)
        }
        console.log(this.state.subtasklist);
        console.log("subtask");
        return (
            <div >
                <Paper className={classes.root}>
                    {create}
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" scope="row" ><Icon
                                    className={classNames(classes.icon, 'fa fa-backward')}
                                    color="disabled"
                                    fontSize="default"
                                    onClick={this.showsubtask}
                                />  Subtask List</TableCell>
                                <TableCell>Subtask Type</TableCell>
                                <TableCell> <Icon
                                    className={classNames(classes.icon, 'fa fa-plus-circle')}
                                    color="disabled"
                                    fontSize="default"
                                    onClick={this.opencreatebox}
                                /> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subtasklist}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

SubtaskBody.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubtaskBody);

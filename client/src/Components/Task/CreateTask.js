import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import InputBase from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import styles from './taskstyle';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import Grid from "@material-ui/core/Grid/Grid";

class CreateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task_name: ""
        };
    }
    setcreateflag = () => {
        console.log("here"+this.state.task_name);
        if(this.state.task_name)
            this.props.createtask(this.state.task_name);
        this.props.show();
    };
    closebox = () =>{
        this.props.show();
    };
    settaskname = (e) => {
        this.setState({ task_name: e.target.value });
    };
    render() {
        const {classes} = this.props;
        let button;
        if (this.state.task_name === "")
            button = <Icon
                className={classNames( 'fa fa-times')}
                color="disabled"
                fontSize="default"
                onClick={this.closebox}
                style={{paddingLeft:15, paddingTop: 5}}
            />;
        else
            button = <Icon
                className={classNames('fa fa-check-circle')}
                color="disabled"
                fontSize="default"
                onClick={this.setcreateflag}
                style={{paddingLeft:15, paddingTop: 5}}


            />;
        return (
            <Grid item sm={10} xs={10} style={{paddingLeft:20, paddingTop:10}}>
                <InputLabel shrink htmlFor="productname" className={classes.bootstrapFormLabel} style={{padding:20}}>
                    Step-Name
                </InputLabel>
                <InputBase
                    id="productname"
                    placeholder="Enter a Step name....."
                    value={this.state.task_name}
                    onChange={this.settaskname}
                    classes={{
                        root: classes.bootstrapRoot,
                        input: classes.bootstrapInput,
                    }}
                />
                {button}

            </Grid>
        );
    }
}

CreateTask.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateTask);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import InputBase from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import styles from './taskstyle';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button"
import DoneIcon from "@material-ui/icons/Done"
import CloseIcon from "@material-ui/icons/Close"
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
            button = <Button
                onClick={this.closebox}
            ><CloseIcon/></Button>;
        else
            button = <Button
                onClick={this.setcreateflag}
                style={{paddingLeft:15, paddingTop: 5}}
            ><DoneIcon/></Button>;
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

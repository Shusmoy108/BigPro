import React, { Component } from 'react';
import {withStyles} from "@material-ui/core";
import styles from "./subtaskstyle";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button";
import BackIcon from "@material-ui/icons/FastRewind"
import Typography from "@material-ui/core/Typography";
class Showspec extends Component {
    back=()=>{
      this.props.back(-1);
    };
    render(){
        return(
            <div style={{paddingLeft:20}}>
                <Button onClick={this.back}>
                    <BackIcon/>
                </Button><br/>
                <Typography variant="title" gutterBottom>
                    Specification-Name: {this.props.subtaskname}
                </Typography><br/>
                <Typography variant="title" gutterBottom>
                    Specification-Type: {this.props.subtasktype}
                </Typography><br/>
                <Typography variant="title" gutterBottom>
                    Specification-Option: {this.props.options}
                </Typography>
            </div>
        );
    }
}
Showspec.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Showspec);
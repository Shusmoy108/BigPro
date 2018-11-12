import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./subtaskstyle";
import PropTypes from "prop-types";
import Tooltip from '@material-ui/core/Tooltip'
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button";
import BackIcon from "@material-ui/icons/FastRewind";
import Typography from "@material-ui/core/Typography";
class Showspec extends Component {
    back = () => {
        this.props.back(-1);
    };
    render() {
        return (
            <Grid container direction="row" align="center">
                <Grid item sm={12} xs={12}>
                    <Tooltip title='Back'>
                        <Button onClick={this.back}>
                            <BackIcon />
                        </Button>
                    </Tooltip>
                </Grid>

                <Grid item sm={12} xs={12}>
                    <Typography
                        variant="title"
                        gutterBottom
                        style={{
                            fontFamily: "Helvetica Neue",
                    fontSize: 30
                }}
            >
                        Specification-Name: {this.props.subtaskname}
                    </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
                <Typography
                    variant="title"
                    gutterBottom
                    style={{
                        fontFamily: "Helvetica Neue",
                        fontSize: 30
                    }}
                >
                    Specification-Type: {this.props.subtasktype}
                </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
                <Typography
                    variant="title"
                    gutterBottom
                    style={{
                        fontFamily: "Helvetica Neue",
                        fontSize: 30
                    }}
                >
                    Specification-Option:{" "}
                    {this.props.option.map((o, i) => {
                        return (
                            <Typography
                                variant="title"
                                gutterBottom
                                key={i}
                                style={{
                                    fontFamily: "Helvetica Neue",
                                    fontSize: 30
                                }}
                            >
                                {o}
                            </Typography>
                        );
                    })}
                </Typography>
            </Grid>
            </Grid >
        );
    }
}
Showspec.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Showspec);

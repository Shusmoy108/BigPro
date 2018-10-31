import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
const styles = theme => ({
    itemClass: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    }
});
class Project extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div
                style={{
                    marginTop: "1%"
                }}
            >
                <div className={classes.itemClass}>
                    <Typography variant="title" gutterBottom>
                        Project Id : {this.props.project.project_id}
                    </Typography>
                </div>
                <div className={classes.itemClass}>
                    <Typography variant="title" gutterBottom>
                        Product Name : {this.props.project.product_name}
                    </Typography>
                </div>
                <div className={classes.itemClass}>
                    <Typography variant="title" gutterBottom>
                        Client Name : {this.props.project.client_name}
                    </Typography>
                </div>
                <div className={classes.itemClass}>
                    <Typography variant="title" gutterBottom>
                        Quantity : {this.props.project.quantity}
                    </Typography>
                </div>
                <div className={classes.itemClass}>
                    <Typography variant="title" gutterBottom>
                        Deadline :{" "}
                        {new Date(this.props.project.deadline).toDateString()}
                    </Typography>
                </div>
                <Divider />
                {this.props.project &&
                    this.props.project.task.map((task, i) => {
                        return (
                            <div>
                                <Typography
                                    variant="title"
                                    gutterBottom
                                    className={classes.itemClass}
                                >
                                    Step Name : {task.task_name}
                                </Typography>
                                {task.subtask.map((subtask, j) => {
                                    return (
                                        <div>
                                            <Typography
                                                variant="title"
                                                gutterBottom
                                                className={classes.itemClass}
                                            >
                                                Specification Name :{" "}
                                                {subtask.subtask_name}
                                            </Typography>
                                            <Typography
                                                variant="title"
                                                gutterBottom
                                                className={classes.itemClass}
                                            >
                                                Subtask Value :{" "}
                                                {subtask.subtask_value}
                                            </Typography>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
            </div>
        );
    }
}

Project.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Project);

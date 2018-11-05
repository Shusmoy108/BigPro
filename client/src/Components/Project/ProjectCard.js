import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import Production from "@material-ui/icons/OpenInBrowser";
import DoneAll from "@material-ui/icons/DoneAll";
import Redo from "@material-ui/icons/Redo";
import Listicon from "@material-ui/icons/List";
import Deleteicon from "@material-ui/icons/Delete";
import LinearProgress from "@material-ui/core/LinearProgress";
const styles = theme => ({
    card: {
        maxWidth: 400
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    actions: {
        display: "flex"
    },
    expand: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        }),
        marginLeft: "auto",
        [theme.breakpoints.up("sm")]: {
            marginRight: -8
        }
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    avatar: {
        backgroundColor: red[500]
    },
    fontStyle: {
        fontFamily: "Helvetica Neue",
        fontSize: "20px"
    }
});

class ProjectCard extends React.Component {
    state = {
        expanded: false
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes } = this.props;
        let value =
            (this.props.project.completed_task /
                this.props.project.total_task) *
            100;
        let icon;
        if (this.props.project.project_status === "pending") {
            icon = <Production />;
        }
        if (
            this.props.project.project_status === "ongoing" ||
            this.props.project.project_status === "redo"
        ) {
            icon = <DoneAll />;
        }
        if (this.props.project.project_status === "history") {
            icon = <Redo />;
        }
        let title =
            this.props.project.project_status.charAt(0).toUpperCase() +
            this.props.project.project_status.substr(1) +
            " Project";
        let subheader = parseFloat(value).toFixed(2) + " %";
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            {this.props.project.completed_task}/
                            {this.props.project.total_task}
                        </Avatar>
                    }
                    title={title}
                    subheader={subheader}
                />

                <CardContent
                    style={{
                        fontFamily: "Dekko"

                        //marginLeft:"30%"
                    }}
                >
                    <LinearProgress
                        variant="buffer"
                        value={value}
                        valueBuffer={100}
                    />
                    <div className={classes.fontStyle}>
                        Project ID : {this.props.project.project_id}
                    </div>
                    <div className={classes.fontStyle}>
                        Product Name : {this.props.project.product_name}
                    </div>
                    <div className={classes.fontStyle}>
                        Client Name : {this.props.project.client_name}
                    </div>
                    <div className={classes.fontStyle}>
                        DeadLine :{" "}
                        {new Date(this.props.project.deadline).toLocaleString()}
                    </div>
                    <div className={classes.fontStyle}>
                        Quantity : {this.props.project.quantity}
                    </div>
                    <div className={classes.fontStyle}>
                        Current Step : {this.props.project.current_position}
                    </div>
                    <div className={classes.fontStyle}>
                        Next Task : {this.props.project.next_position}
                    </div>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton
                        onClick={() => {
                            this.props.showProject(
                                this.props.project.project_id
                            );
                        }}
                    >
                        <Listicon />
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            this.props.updateStatus(
                                this.props.project.project_id
                            );
                        }}
                    >
                        {icon}
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            this.props.delete(this.props.project.project_id);
                        }}
                    >
                        <Deleteicon />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

ProjectCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectCard);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Grid, Checkbox, InputLabel, Button } from "@material-ui/core";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PrintIcon from "@material-ui/icons/Print";

const styles = theme => ({
    itemClass: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    },
    mainStyle: {
        margin: "0% 30%",
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing.unit * 2
        }
    }
});
class Project extends Component {
    printDocument = () => {
        const input = document.getElementById("divToPrint");
        html2canvas(input).then(canvas => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "JPEG", 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div
                id="divToPrint"
                style={{
                    marginTop: "1%"
                }}
            >
                <div>
                    <div className={classes.mainStyle}>
                        <Typography variant="title" gutterBottom>
                            Project ID : {this.props.project.project_id}
                        </Typography>

                        <Typography variant="title" gutterBottom>
                            Product Name : {this.props.project.product_name}
                        </Typography>

                        <Typography variant="title" gutterBottom>
                            Client Name : {this.props.project.client_name}
                        </Typography>

                        <Typography variant="title" gutterBottom>
                            Quantity : {this.props.project.quantity}
                        </Typography>

                        <Typography variant="title" gutterBottom>
                            Deadline :{" "}
                            {new Date(
                                this.props.project.deadline
                            ).toDateString()}
                        </Typography>
                        <div style={{ borderBottom: "2px solid" }} />
                    </div>
                    <div style={{ margin: "2% 2%" }}>
                        <Grid container>
                            {this.props.project &&
                                this.props.project.task.map((task, i) => {
                                    return (
                                        <Grid item xs={6} sm={3}>
                                            <Typography
                                                variant="subheading"
                                                gutterBottom
                                            >
                                                Step Name : {task.task_name}
                                            </Typography>
                                            {task.subtask.map((subtask, j) => {
                                                return (
                                                    <div>
                                                        <Typography
                                                            variant="subheading"
                                                            gutterBottom
                                                        >
                                                            {
                                                                subtask.subtask_name
                                                            }{" "}
                                                            :{" "}
                                                            {
                                                                subtask.subtask_value
                                                            }
                                                        </Typography>
                                                    </div>
                                                );
                                            })}
                                            {task.task_status === "undone" && (
                                                <InputLabel>
                                                    Done{" "}
                                                    <Checkbox color="primary" />
                                                </InputLabel>
                                            )}
                                        </Grid>
                                    );
                                })}
                        </Grid>
                    </div>
                </div>
                <Button
                    onClick={() => {
                        window.print();
                    }}
                    // onClick={this.printDocument}
                >
                    <PrintIcon />
                </Button>
            </div>
        );
    }
}

Project.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Project);

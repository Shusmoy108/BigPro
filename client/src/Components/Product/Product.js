import React, { Component } from "react";

import { withStyles } from "@material-ui/core";
import styles from "./productstyle";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/Input/Input";
import Listicon from "@material-ui/icons/List";
import Editicon from "@material-ui/icons/Edit";
import Deleteicon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "../Modal/Modal";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_name: "",
            edit_flag: 0,
            open: false
        };
    }
    modalopen = () => {
        this.setState({ open: true });
    };
    modalclose = () => {
        this.setState({ open: false });
    };
    setproductname = e => {
        this.setState({ edit_name: e.target.value });
    };
    seteditflag = () => {
        this.setState({ edit_name: this.props.product_name });
        this.setState({ edit_flag: 1 });
    };
    deleteproduct = () => {
        this.props.deleteproduct(this.props.product_name);
        this.setState({ open: false });
    };
    editproduct = () => {
        if (this.state.edit_name !== this.props.product_name)
            this.props.editproduct(
                this.props.product_name,
                this.state.edit_name
            );
        this.setState({ edit_flag: 0 });
    };
    showtask = () => {
        this.props.showtask(this.props.product_number);
    };
    render() {
        const { classes } = this.props;
        let product;
        let button;

        if (this.state.edit_flag === 1) {
            product = (
                <Grid item sm={8} xs={6} style={{ textAlign: "center" }}>
                    {" "}
                    <InputBase
                        id="productname"
                        placeholder="Enter a productname....."
                        value={this.state.edit_name}
                        onChange={this.setproductname}
                        classes={{
                            root: classes.bootstrapRoot,
                            input: classes.bootstrapInput
                        }}
                    />
                </Grid>
            );
            if (this.state.edit_name === this.props.product_name)
                button = (
                    <Grid item sm={4} xs={6}>
                        {" "}
                        <Button
                            onClick={this.editproduct}
                            style={{ paddingLeft: 20, paddingTop: 5 }}
                        >
                            <CloseIcon />
                        </Button>
                    </Grid>
                );
            else
                button = (
                    <Grid sm={4} xs={6}>
                        {" "}
                        <Button onClick={this.editproduct}>
                            <DoneIcon />
                        </Button>
                    </Grid>
                );
        } else {
            product = (
                <Grid
                    item
                    sm={4}
                    xs={4}
                    style={{
                        fontFamily: "Dekko",
                        fontSize: 30
                        //marginLeft:"30%"
                    }}
                >
                    {this.props.product_name}
                </Grid>
            );
            button = (
                <Grid item sm={4} xs={8}>
                    <Button onClick={this.showtask}>
                        <Listicon />
                    </Button>{" "}
                    <Button onClick={this.modalopen}>
                        <Deleteicon />
                    </Button>{" "}
                    <Button onClick={this.seteditflag}>
                        <Editicon />
                    </Button>
                </Grid>
            );
        }

        return (
            <Grid container>
                <Modal
                    name={this.props.product_name}
                    handleYes={this.deleteproduct}
                    handleNo={this.modalclose}
                    open={this.state.open}
                />
                {product}
                {button}
            </Grid>
        );
    }
}

Product.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Product);

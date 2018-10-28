import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CreateProduct from "./CreateProduct";
import styles from "./productstyle";
import Product from "./Product";
import Axios from "Utils/Axios";
import AddIcon from "@material-ui/icons/Add";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Header from "../Header/Header";
import ProducTaskbody from "./ProductTaskbody";

class ProductBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createflag: 0,
      productlist: [],
      showpage: "product",
      usertype: "",
      username: "",
      task: -1,
      subtask: -1
    };
  }

  opencreatebox = () => {
    let e = 1;
    this.setState(state => ({ createflag: e }));
  };
  closecreatebox = () => {
    let e = 0;
    this.setState(state => ({ createflag: e }));
  };
  createproduct = e => {
    let that = this;
    Axios.createproduct(e, function(err, data) {
      if (err) that.setState({ msgLogin: err });
      else {
        that.setState({ productlist: data.products });
      }
    });
  };
  deleteproduct = e => {
    let that = this;
    Axios.deleteproduct(e, function(err, data) {
      if (err) that.setState({ msgLogin: err });
      else {
        that.setState({ productlist: data.products });
      }
    });
  };
  editproduct = (e, n) => {
    let that = this;
    Axios.editproduct(e, n, function(err, data) {
      if (err) that.setState({ msgLogin: err });
      else {
        that.setState({ productlist: data.products });
      }
    });
  };
  createproducttask = (e, n, f) => {
    let that = this;
    Axios.createproducttask(e, n, f, function(err, data) {
      if (err) that.setState({ msgLogin: err });
      else {
        that.setState({ productlist: data.products });
      }
    });
  };
  createproductoldtask = (e, n, f) => {
    let that = this;
    Axios.createproductoldtask(e, n, f, function(err, data) {
      if (err) that.setState({ msgLogin: err });
      else {
        that.setState({ productlist: data.products });
      }
    });
  };
  editproducttask = (e, n, f) => {
    let that = this;
    Axios.editproducttask(e, n, f, function(err, data) {
      if (err) that.setState({ msgLogin: err });
      else {
        that.setState({ productlist: data.products });
      }
    });
  };
  deleteproducttask = (e, n) => {
    let that = this;
    Axios.deleteproducttask(e, n, function(err, data) {
      if (err) that.setState({ msgLogin: err });
      else {
        that.setState({ productlist: data.products });
      }
    });
  };
  createproductoldsubtask = (e, n, f, g, h) => {
    let that = this;
    Axios.createproductoldsubtask(e, n, f, g, h, function(err, data) {
      if (err) that.setState({ msgLogin: err });
      else {
        that.setState({ productlist: data.products });
      }
    });
  };
  createproductsubtask = (e, n, f, g, h, i, j) => {
    let that = this;
    Axios.createproductsubtask(e, n, f, g, h, i, j, function(err, data) {
      if (err) that.setState({ msgLogin: err });
      else {
        that.setState({ productlist: data.products });
      }
    });
  };
  deleteproductsubtask = (e, n, f) => {
    let that = this;
    Axios.deleteproductsubtask(e, n, f, function(err, data) {
      if (err) that.setState({ msgLogin: err });
      else {
        that.setState({ productlist: data.products });
      }
    });
  };
  editproductsubtask = (e, n, f, g, h, i) => {
    let that = this;
    Axios.editproductsubtask(e, n, f, g, h, i, function(err, data) {
      if (err) that.setState({ msgLogin: err });
      else {
        that.setState({ productlist: data.products });
      }
    });
  };

  componentDidMount() {
    let that = this;
    Axios.showproduct(function(err, data) {
      if (err) {
        that.props.history.push("/");
      } else {
        that.setState({
          productlist: data.products,
          usertype: data.user.usertype,
          username: data.user.username
        });
      }
    });
  }

  showtask = e => {
    this.setState({ task: e });
    this.setState({ subtask: -1 });
  };
  showsubtask = e => {
    this.setState({ subtask: e });
    this.setState({ task: -1 });
  };

  render() {
    const { classes } = this.props;
    let product;
    if (this.state.task === -1 && this.state.subtask === -1) {
      let create;
      if (this.state.createflag === 1) {
        create = (
          <CreateProduct
            createproduct={this.createproduct}
            show={this.closecreatebox}
          />
        );
      }
      let productlist = [];
      for (var i = 0; i < this.state.productlist.length; i++) {
        productlist.push(
          <Product
            key={i}
            id={this.state.productlist[i]._id}
            product_number={i}
            product_name={this.state.productlist[i].product_name}
            showtask={this.showtask}
            showsubtask={this.showsubtask}
            deleteproduct={this.deleteproduct}
            editproduct={this.editproduct}
          />
        );
      }
      product = (
        <div>
          <Grid container direction="row" align="center">
            {create}
            <Grid
              item
              sm={4}
              xs={6}
              style={{
                fontFamily: "Dekko",
                fontSize: 30
                // marginLeft:"30%"
              }}
            >
              Product-List
            </Grid>

            <Hidden only={["xs"]}>
              <Grid
                item
                sm={2}
                xs={6}
                //style={{marginLeft:"5.5%"}}
              >
                {" "}
                <Button onClick={this.opencreatebox}>
                  <AddIcon />
                </Button>{" "}
              </Grid>
            </Hidden>
            {productlist}
          </Grid>
          <Hidden only={["sm", "md", "lg", "xl"]}>
            <Button
              variant="fab"
              color="primary"
              aria-label="Add"
              onClick={this.opencreatebox}
              className={classes.button}
            >
              <AddIcon />
            </Button>
          </Hidden>
        </div>
      );
    } else if (this.state.task !== -1) {
      product = (
        <ProducTaskbody
          createproductoldtask={this.createproductoldtask}
          createproductsubtask={this.createproductsubtask}
          deleteproductsubtask={this.deleteproductsubtask}
          editproductsubtask={this.editproductsubtask}
          showtask={this.showtask}
          tasklist={this.state.productlist[this.state.task].task}
          id={this.state.productlist[this.state.task]._id}
          deleteproducttask={this.deleteproducttask}
          createproducttask={this.createproducttask}
          editproducttask={this.editproducttask}
          product_name={this.state.productlist[this.state.task].product_name}
          createproductoldsubtask={this.createproductoldsubtask}
        />
      );
    }
    return (
      <div>
        <Header
          history={this.props.history}
          username={this.state.username}
          usertype={this.state.usertype}
        />
        {product}
      </div>
    );
  }
}

ProductBody.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductBody);

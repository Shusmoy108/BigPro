import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CreateProduct from './CreateProduct';
import styles from './productstyle';
import classNames from 'classnames';
import Product from './Product';
import Axios from 'Utils/Axios';
import AddIcon from "@material-ui/icons/Add";
import Hidden from "@material-ui/core/Hidden"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Icon from "@material-ui/core/Icon/Icon";

import Header from "../Header/Header";
import ProducTaskbody from './ProductTaskbody';

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

    setpage = (e) => {
        this.setState(state => ({showpage: e}));
        if (this.state.showpage !== "product")
            this.props.history.push('/');

    };
    opencreatebox = () => {
        let e = 1;
        this.setState(state => ({createflag: e}));
    };
    closecreatebox = () => {
        let e = 0;
        this.setState(state => ({createflag: e}));
    };
    createproduct = (e) => {
        let that = this;
        console.log(e + "beforeaxios");
        Axios.createproduct(e, function (err, data) {
            if (err) that.setState({msgLogin: err});
            else {
                that.setState({productlist: data.products});
            }
        })
    };
    deleteproduct = (e) => {
        let that = this;
        //console.log(e+"beforeaxios");
        Axios.deleteproduct(e, function (err, data) {
            if (err) that.setState({msgLogin: err});
            else {
                that.setState({productlist: data.products});
            }
        })
    };
    editproduct = (e, n) => {
        let that = this;
        //console.log(e+"beforeaxios");
        Axios.editproduct(e, n, function (err, data) {
            if (err) that.setState({msgLogin: err});
            else {
                that.setState({productlist: data.products});
            }
        })
    };
    createproducttask = (e, n) => {
        let that = this;
        console.log(e + "beforeaxios");
        Axios.createproducttask(e, n, function (err, data) {
            if (err) that.setState({msgLogin: err});
            else {
                that.setState({productlist: data.products});
            }
        })
    };
    editproducttask = (e, n, f) => {
        let that = this;
        console.log(e + "beforeaxios");
        Axios.editproducttask(e, n, f, function (err, data) {
            if (err) that.setState({msgLogin: err});
            else {
                that.setState({productlist: data.products});
            }
        })
    };
    deleteproducttask = (e, n) => {
        let that = this;
        //console.log(e+"beforeaxios");
        Axios.deleteproducttask(e, n, function (err, data) {
            if (err) that.setState({msgLogin: err});
            else {
                that.setState({productlist: data.products});
            }
        })
    };
    createproductsubtask = (e, n, f, g, h) => {
        let that = this;
        console.log(e, n, f, g, h, "beforeaxios");
        Axios.createproductsubtask(e, n, f, g, h, function (err, data) {
            if (err) that.setState({msgLogin: err});
            else {
                that.setState({productlist: data.products});
                console.log(data.products);
                console.log("product");
            }
        })
    };
    deleteproductsubtask = (e, n, f) => {
        let that = this;
        console.log(e, n, f, "beforeaxios");
        Axios.deleteproductsubtask(e, n, f, function (err, data) {
            if (err) that.setState({msgLogin: err});
            else {
                that.setState({productlist: data.products});
                console.log(data.products);
                console.log("product");
            }
        })
    };
    editproductsubtask = (e, n, f, g, h, i) => {
        let that = this;
        console.log(e + "beforeaxios");
        Axios.editproductsubtask(e, n, f, g, h, i, function (err, data) {
            if (err) that.setState({msgLogin: err});
            else {
                that.setState({productlist: data.products});
            }
        })
    };


    componentDidMount() {
        let that = this;
        Axios.showproduct(function (err, data) {
            if (err) {
                console.log(err, "err");
                that.props.history.push('/');
            }
            else {
                console.log(data);
                that.setState({productlist: data.products, usertype: data.user.usertype, username: data.user.username});
                console.log(that.state.productlist, "lossss");
            }
        })
    }

    showtask = (e) => {
        this.setState({task: e});
        this.setState({subtask: -1});
    };
    showsubtask = (e) => {
        this.setState({subtask: e});
        this.setState({task: -1});
    };

    render() {
        const {classes} = this.props;
        let product;
        console.log(this.state.task);
        if (this.state.task === -1 && this.state.subtask === -1) {
            console.log(this.state.productlist);
            let create;
            if (this.state.createflag === 1) {
                create = <CreateProduct createproduct={this.createproduct} show={this.closecreatebox}/>;
            }
            let productlist = [];
            for (var i = 0; i < this.state.productlist.length; i++) {
                productlist.push(<Product key={i} id={this.state.productlist[i]._id} product_number={i}
                                          product_name={this.state.productlist[i].product_name} showtask={this.showtask}
                                          showsubtask={this.showsubtask} deleteproduct={this.deleteproduct}
                                          editproduct={this.editproduct}/>)
            }
            product =

                <Grid container spacing={0}>
                    {create}
                    <Grid item sm={8} xs={6} style={{
                        fontFamily: 'Dekko',
                        fontSize: 30,
                        paddingLeft: 20

                    }}>
                        Product-List
                    </Grid>
                    <Hidden only={["xs"]}>
                    <Grid item sm={4} xs={6}> <Icon
                        className={classNames('fa fa-plus-circle')}
                        color="disabled"
                        fontSize="default"
                        onClick={this.opencreatebox}
                        style={{paddingTop:10,paddingLeft:60}}
                    /> </Grid>
                    </Hidden>

                    {productlist}

                </Grid>


        }
        else if (this.state.task !== -1) {
            console.log(this.state.productlist, "task");
            product = <ProducTaskbody createproductsubtask={this.createproductsubtask}
                                      deleteproductsubtask={this.deleteproductsubtask}
                                      editproductsubtask={this.editproductsubtask} showtask={this.showtask}
                                      tasklist={this.state.productlist[this.state.task].task}
                                      id={this.state.productlist[this.state.task]._id}
                                      deleteproducttask={this.deleteproducttask}
                                      createproducttask={this.createproducttask} editproducttask={this.editproducttask}
                                      product_name={this.state.productlist[this.state.task].product_name}/>
        }
        return (
            <div>
                <Header history={this.props.history} username={this.state.username} usertype={this.state.usertype}/>

                    {product}
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
    }
}

ProductBody.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductBody);

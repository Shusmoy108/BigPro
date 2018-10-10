
import React, { Component } from 'react';
import Icon from "@material-ui/core/Icon/Icon";
import classNames from 'classnames';
import {withStyles} from "@material-ui/core";
import styles from "./productstyle";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid"
import InputBase from "@material-ui/core/Input/Input";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_name: "",
            edit_flag:0
        };
    }
    setproductname = (e) => {
        console.log("here" +
            e.target.value);
        this.setState({ edit_name: e.target.value });
    };
    seteditflag= () => {
        this.setState({ edit_name: this.props.product_name });
        this.setState({ edit_flag:1 });
    };
    deleteproduct = () => {
        this.props.deleteproduct(this.props.product_name);
    };
    editproduct = () => {
        if(this.state.edit_name!==this.props.product_name)
            this.props.editproduct(this.props.product_name,this.state.edit_name);
        this.setState({ edit_flag:0 });
    };
    showtask = () =>{
        this.props.showtask(this.props.product_number);
    };
    render() {
        const { classes } = this.props;
        let product;
        let button;

        if(this.state.edit_flag===1){
            product= <Grid sm={8} xs={6} >   <InputBase
                id="productname"
                placeholder="Enter a productname....."
                value={this.state.edit_name}
                onChange={this.setproductname}
                classes={{
                    root: classes.bootstrapRoot,
                    input: classes.bootstrapInput,

                }}
            /></Grid>;
            if(this.state.edit_name===this.props.product_name)
                button= <Grid sm={4} xs={6}> <Icon
                    className={classNames('fa fa-times')}
                    color="disabled"
                    fontSize="default"
                    onClick={this.editproduct}
                    style={{paddingLeft:20, paddingTop:5}}
                /></Grid>;
            else
                button= <Grid sm={4} xs={6}> <Icon
                    className={classNames( 'fa fa-check-circle')}
                    color="disabled"
                    fontSize="default"
                    onClick={this.editproduct}
                    style={{paddingLeft:20, paddingTop:5}}
                /></Grid>;
        }
        else{
            product=
                <Grid item sm={8} xs={6} style={{
                    fontFamily: 'Dekko',
                    fontSize: 30,
                }}>
                    {this.props.product_name}
                </Grid>;
            button=     <Grid item sm={4} xs={6}><Icon
                className={classNames('fa fa-list-ul')}
                color="disabled"
                fontSize="default"
                onClick={this.showtask}
                style={{paddingRight:25,paddingTop:12}}
            /> <Icon
                className={classNames('fa fa-trash')}
                color="disabled"
                fontSize="default"
                onClick={this.deleteproduct}
                style={{paddingRight:25,paddingTop:12}}
            /> <Icon
                className={classNames('fa fa-pencil')}
                color="disabled"
                fontSize="default"
                onClick={this.seteditflag}
                style={{paddingRight:25,paddingTop:12}}
            /></Grid>;
        }


        return (
            <Grid container style={{paddingLeft:20,paddingBottom:10}} >
            {product}
                {button}
            </Grid>
        );
    }
}

Product.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Product);
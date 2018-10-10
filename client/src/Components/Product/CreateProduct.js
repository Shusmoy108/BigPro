import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import styles from './productstyle';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';

class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name: ""
        };
    }

    setcreateflag = () => {
        console.log("here" + this.state.product_name);
        if (this.state.product_name)
            this.props.createproduct(this.state.product_name);
        this.props.show();
    };

    setproductname = (e) => {
        console.log("here" +
            e.target.value);
        this.setState({product_name: e.target.value});
    };

    render() {

        const {classes} = this.props;
        let button;
        if (this.state.product_name === "")
            button = <Icon
                className={classNames( 'fa fa-times')}
                color="disabled"
                fontSize="default"
                onClick={this.setcreateflag}
                style={{paddingLeft:15, paddingTop: 5}}
            />;
        else
            button = <Icon
                className={classNames('fa fa-check-circle')}
                color="disabled"
                fontSize="default"
                onClick={this.setcreateflag}
                style={{paddingLeft:15, paddingTop: 5}}


            />;
        return (
            <Grid item sm={10} xs={10} style={{paddingLeft:20}}>
                    <InputLabel shrink htmlFor="productname" className={classes.bootstrapFormLabel} style={{padding:20}}>
                        Product-Name
                    </InputLabel>
                    <InputBase
                        id="productname"
                        placeholder="Enter a productname....."
                        value={this.state.product_name}
                        onChange={this.setproductname}
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

CreateProduct.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateProduct);

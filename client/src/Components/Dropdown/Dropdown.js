import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input/Input'
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button"
import DoneIcon from "@material-ui/icons/Done"
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
class SimpleSelect extends React.Component {
    state = {
        age: '',
        name: 'hai',
        labelWidth: 0,
      };
      handleChange = event => {
        this.props.handleChange(event.target.value);
        this.setState({ [event.target.name]: event.target.value });
      };
      handleNew=()=>{
          this.props.newcreate();
          console.log('new')
      }
    render(){
        let values=[];
        console.log(this.props.values);
        for(let i=0;i<this.props.values.length;i++)
        {
            values.push(<MenuItem key={i} value={this.props.values[i]}>{this.props.values[i]}</MenuItem>)
        }
        return(
      
            <Grid item sm={10} xs={10} style={{paddingLeft:20,paddingTop:20}}>
            <InputLabel shrink htmlFor="productname"  style={{padding:20}}>
                        {this.props.inputfield}
                </InputLabel>
            <Select
            value={this.props.value}
            onChange={this.handleChange}
            input={<Input name="age" id="age-helper" />}
          >
          {values}
          </Select>
          <Button
                onClick={this.props.createtask}
            ><DoneIcon/></Button>
            <Button
                onClick={this.handleNew}
            ><AddIcon/></Button>
         <Button
                onClick={this.props.close}
            ><CloseIcon/></Button>
          </Grid>
        );
    }
}

export default withStyles()(SimpleSelect);
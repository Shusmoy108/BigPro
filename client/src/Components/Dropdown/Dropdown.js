import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input/Input'
import Tooltip from '@material-ui/core/Tooltip';
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
    handleNew = () => {
        this.props.newcreate();
    }
    render() {
        let values = [];
        
        for (let i = 0; i < this.props.values.length; i++) {
            values.push(<MenuItem key={i} value={this.props.values[i]}>{this.props.values[i]}</MenuItem>)
        }
        return (

            <div style={{ display: 'flex', width: "100%", alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ flex: 1, textAlign: 'center' }}>

                    <InputLabel shrink htmlFor="productname" style={{ fontSize: 15, marginRight: 10 }}>
                        {this.props.inputfield}
                    </InputLabel>
                    <Select
                        value={this.props.value}
                        onChange={this.handleChange}
                        input={<Input name="age" id="age-helper" />}
                    >
                        {values}
                    </Select>
                </div>
                <div style={{ flex: 3 }}>
                    <Tooltip title='Create'>
                        <Button
                            onClick={this.props.createtask}
                        ><DoneIcon /></Button>
                    </Tooltip>
                    <Tooltip title='Add New'>
                        <Button
                            onClick={this.handleNew}
                        ><AddIcon /></Button>
                    </Tooltip>
                    <Tooltip title='Close'>

                        <Button
                            onClick={this.props.close}
                        ><CloseIcon /></Button>
                    </Tooltip>
                </div>
            </div>
        );
    }
}

export default withStyles()(SimpleSelect);
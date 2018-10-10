import React, { Component } from 'react';
import Header from './Header/Header'
import Body from './Body/Body'
import Axios from 'Utils/Axios';
class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showpage: "project",
            data:[]
        };
    }

    setpage = (e) => {
        console.log("here" +
            e);
        let that=this;
        Axios.showproduct(function(err, data){
            console.log(data.products+"body");
            that.setState({ data: data.products });

        });
        this.setState(state => ({ showpage: e }));
    };
  render() {
    return (
      <div>

          <Header {...this.props} setpage={this.setpage}/>
        <Body {...this.props} showpage={this.state.showpage} data={this.state.data} createproduct={this.createproduct} deleteproduct={this.deleteproduct} editproduct={this.editproduct}/>
      </div>
    );
  }
}

export default (LandingPage);

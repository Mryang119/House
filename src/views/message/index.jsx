import React, { Component } from 'react';
import Son from './component/index'
class Message extends Component {
  state = {
    jsonp:null
  }
  async componentDidMount() {
    let res = await this.axios.get('/home/swiper')
    console.log(res);
    this.setState({
      jsonp:JSON.stringify(res.data.body)
    })
  }
  render() {
    return (
      <div>
        资讯
        <Son jsonp={this.state.jsonp}></Son>
      </div>
    );
  }
}

export default Message;
import React, { Component } from 'react';

class Son extends Component {
  constructor(props){
    super(props)
    this.state = {
      jsonp:null
    }
  }
  componentDidMount(){
   setTimeout(()=>{
    console.log(this.props);
    
   },1000)
    
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      jsonp:nextProps.jsonp
    })
  }
  render() {
    return (
      <div>
        我是子组件{this.state.jsonp}
      </div>
    );
  }
}

export default Son;

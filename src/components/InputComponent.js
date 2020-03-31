import React, { Component } from "react";

class InputComponent extends Component {
    render() {
        return (<input 
            placeholder={this.props.placeholder}
            type={this.props.type}></input>);
    }
}

export default InputComponent
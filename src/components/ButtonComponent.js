import React, {Component} from 'react'
import { checkPropTypes } from 'prop-types'

class ButtonComponent extends Component  {
    render() {
       return (<button type={this.props.type}>{this.props.text}</button>)
    }
}

export default ButtonComponent
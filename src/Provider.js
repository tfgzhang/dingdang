/**
 * Created by yuany on 2017/6/12.
 */


import React, {Component} from "react";

export default class Provider extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {}

    static childContextTypes = {}

    getChildContext() {
        return {}
    }

    componentWillMount() {
    }

    render() {
        return (
            {...this.props.children}
        )
    }

}
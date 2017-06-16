/**
 * Created by yuany on 2017/6/12.
 */


import React, {Component} from "react";
import {fromJS} from "immutable";

export default class Provider extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sceneStore: fromJS(),           //场景store
            globalStore:fromJS()        //全局stroe
        }
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
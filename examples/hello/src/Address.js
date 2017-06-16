/**
 * Created by yuany on 2017/6/13.
 */


import React from "react";
import {Component, Constant} from "../../../src/index";

@Component
export default class Address extends React.Component {


    static injectProps = {
        name: ''
    }

    render() {

        const {injectProps: {name}, executor} = this.props;

        const onChangeState = executor(Constant.EXECUTOR_TYPE.PURE)('onChangeState');

        return (
            <div>
                <h1>address {name} </h1>
                <button onClick={ () => onChangeState({name: '这是被地址组件修改的'}) }>地址组件的修改按钮</button>
            </div>
        )
    }

}
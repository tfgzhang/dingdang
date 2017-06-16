import React from "react";
import {Constant, Page} from "../../../src/index";
import Address from "./Address";

let store = {
    namespace: 'user',
    state: {
        name: '张三'
    },
    pure: {
        onChangeState: (state, {name}) => {
            return {...state, name}
        }
    },
    effect: {
        queryUser: async ({resolve, reject}, num) => {
            const {code, datas} = await fetch(`http://wx.xiaoqiangong.com/goods/${num}.htm`).then(response => response.json());
            if (code === '10000') {
                let name = datas[Math.ceil(Math.random() * 10)]['c_name'];
                resolve(name)
            } else {
                reject(false)
            }
        }

    }
}

@Page(store)
export default class User extends React.Component {

    static injectProps = {
        name: ''
    }

    render() {

        const {injectProps: {name}, executor} = this.props;


        return (
            <div>
                <h1>this is {name}</h1>
                <Address />
                <br />
                <br />
                <br />
                <button onClick={ async () => {
                    const data = await executor(Constant.EXECUTOR_TYPE.EFFECT)('queryUser')(1000001);
                    executor(Constant.EXECUTOR_TYPE.PURE)('onChangeState')({name: data})
                }}>改变名字
                </button>
            </div>
        )
    }

}
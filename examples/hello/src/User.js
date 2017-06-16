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
        queryUser: async ({resolve, reject , executePure}, num) => {
            const {code, datas} = await fetch(`http://wx.xiaoqiangong.com/goods/${num}.htm`).then(response => response.json());
            if (code === '10000') {
                let name = datas[Math.ceil(Math.random() * 10)]['c_name'];
                executePure(Constant.EXECUTOR_TYPE.PURE)('onChangeState')({name})
                resolve(true)
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

        const queryUser = executor(Constant.EXECUTOR_TYPE.EFFECT)('queryUser');

        const onChangeState = executor(Constant.EXECUTOR_TYPE.PURE)('onChangeState');

        return (
            <div>
                <h1>this is {name}</h1>
                <Address />
                <br />
                <br />
                <br />
                <button onClick={ async () => {
                    const data = await queryUser(1000001);
                    console.log(data)
                }}>改变名字
                </button>
            </div>
        )
    }

}
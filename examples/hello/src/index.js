/**
 * Created by yuany on 2017/6/13.
 */


import {HashRouter, Link, Route} from "react-router-dom";
import React from "react";
import {render} from "react-dom";
import Role from "./Role";
import User from "./User";
import {is , fromJS} from "immutable";

import {Provider} from "../../../src/index";


class App extends React.Component {

    render() {
        return (
            <Provider>
                <HashRouter>
                    <div>
                        <Link to="/">首页</Link>
                        <br />
                        <br />
                        <Link to="/role">角色</Link>
                        <br />
                        <br />
                        <Link to="/user">用户</Link>
                        <Route path="/role" component={Role}></Route>
                        <Route path="/user" component={User}></Route>
                    </div>
                </HashRouter>
            </Provider>
        )
    }

}


console.log(is(fromJS({name: '张三'}), fromJS({name: '张三'})))

render(
    <App />,
    document.querySelector("#app")
)
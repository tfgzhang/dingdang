/**
 * Created by yuany on 2017/6/13.
 */


import React, {Component, PropTypes} from "react";
import {isStore} from "./Tools";
import {fromJS, List} from "immutable";
import executor from "./Executor";
import Constant from "./Constant";

export default function (store) {

    return function (PageComponent) {

        return class extends Component {

            constructor(props) {
                super(props)
                this.state = {
                    useStore: fromJS(),
                    notifyList: List()
                }
            }

            static contextTypes = {}

            static childContextTypes = {
                useStore: PropTypes.object,
                notifyList: PropTypes.array,
                executor: PropTypes.func
            }

            getChildContext() {
                const {useStore, notifyList} = this.state;
                return {
                    useStore: useStore,
                    notifyList: notifyList,
                    executor: this._executor
                }
            }

            componentWillMount() {

                let immutableStore = fromJS(store);

                if (!isStore(immutableStore)) return;


                let initState = {
                    useStore: immutableStore,
                    notifyList: []
                }

                this.setState(initState)
            }

            render() {

                const injectProps = fromJS(PageComponent.injectProps).mapEntries(([k, v]) =>
                    [k, this.state.useStore.getIn(['state', k])]).toJS();

                let props = {...this.props, injectProps, executor: this._executor}

                return (
                    <PageComponent {...props} />
                )

            }


            _executor = (executorEnum) => (name) => (data) =>
                executorEnum === Constant.EXECUTOR_TYPE.PURE ?
                    this.setState({
                        ...this.state,
                        useStore: this.state.useStore.set('state', executor(executorEnum)(name)(this.state.useStore, data))
                    }, () => this.state.notifyList.map(func => func())) :
                    executor(executorEnum)(name)(this.state.useStore, data, this._executor)

        }
    }
}

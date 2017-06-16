/**
 * Created by yuany on 2017/6/13.
 */


import React, {PropTypes} from "react";
import {fromJS, is} from "immutable";

export default function (PageComponent) {

    return class extends React.Component {

        constructor(props) {
            super(props)
            this.state = {
                injectProps: fromJS({})
            }
        }

        static contextTypes = {
            useStore: PropTypes.object,
            notifyList: PropTypes.array,
            executor: PropTypes.func
        }

        componentWillMount() {
            let {useStore, notifyList} = this.context;
            this.setState({
                ...this.state,
                injectProps: fromJS(PageComponent.injectProps).mapEntries(([k, v]) =>
                    [k, useStore.getIn(['state', k])]
                )
            })
            this.context.notifyList = notifyList.push(this._onForceUpdate)
        }

        _onForceUpdate = () => {

            let {useStore} = this.context;

            const {injectProps} = this.state;

            const newInjectProps = injectProps.mapEntries(([k, v]) => [k, useStore.getIn(['state', k])]);

            if (is(injectProps, newInjectProps)) return;

            this.setState({
                ...this.state,
                injectProps: injectProps.merge(newInjectProps)
            })

        }

        render() {

            const props = {
                ...this.props,
                injectProps: this.state.injectProps.toJS(),
                executor: this.context.executor
            }

            return (
                <PageComponent {...props} />
            )
        }

    }
}


/**
 * Created by yuany on 2017/6/16.
 */

import Constant from "./Constant";


const executor = (executorEnum) =>
    executorEnum === Constant.EXECUTOR_TYPE.PURE ? _executePure :
        executorEnum == Constant.EXECUTOR_TYPE.EFFECT ? _executeEffect :
            () => () => console.error('😂😂😂 , executor type is not 存在！ ');

const _executePure = (pureName) =>
    (immutableStore, data) =>
        immutableStore.get('state').merge(
            immutableStore.getIn(['pure', pureName])(immutableStore.get('state').toJS(), data)
        )


const _executeEffect = (effectName) =>
    (immutableStore, data) =>
        (executePure) =>
            new Promise((resolve, reject) =>
                immutableStore.getIn(['effect', effectName])({resolve, reject, executePure}, data))


export default executor;




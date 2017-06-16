/**
 * Created by yuany on 2017/6/11.
 */



export const isStore = (store) => {

    if (!store.has('namespace')) {
        console.error(`🤡🤡🤡,I have to have a unique namespace, oh, otherwise I can't be born！`);
        return false;
    }

    if (!store.has('state')) {
        console.error(`🤡🤡🤡,I have to have a state, oh, otherwise I can't be born！`)
        return false;
    }

    if (!store.has('pure')) {
        console.error(`🤡🤡🤡,I have to have a pure, oh, otherwise I can't be born！`)
        return false;
    }

    if (!store.has('effect')) {
        console.error(`🤡🤡🤡,I have to have a effect, oh, otherwise I can't be born！`)
        return false;
    }

    return true;
}
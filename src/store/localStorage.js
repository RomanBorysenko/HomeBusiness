import Immutable from 'immutable';

export const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return Immutable.fromJS(JSON.parse(serializedState));
    } catch (err) {
        return undefined;
    }
};

export const saveState = () => {
    // configuring structure of data for persist in state
    const persistState = {
        test: 'test'
    };

    try {
        const serializedState = JSON.stringify(persistState);
        sessionStorage.setItem('state', serializedState);
    } catch (err) {
        return undefined;
    }
};

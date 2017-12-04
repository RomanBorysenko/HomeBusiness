import Immutable, { Map, List, is } from 'immutable';
import reducer from '../../../src/reducers/signInReducer';
import {authStates} from '../../../mocks/reduser.states';

describe('Auth reducer', () => {

    const initialState = {
        loading: false,
        clientId: null,
        clientSecret: null,
        accessToken: null,
        expiresIn: null,
        refreshToken: null,
        user: {
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            gender: '',
            maritalStatus: '',
            bio: null,
            active: true,
            dateRegistered: null,
            dateActivated: null,
            dateJoin: null,
            children: []
        },
        errorMessage: '',
        error: false,
        authorities: [],
        accountNonExpired: false,
        accountNonLocked: false,
        credentialsNonExpired: false,
        isAuth: null,
        username: '',
        ftv: false
    };

    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(Immutable.fromJS(initialState))
    });

    authStates.forEach((el => {
        it('should handle ' + el.type, () => {
            expect(reducer(Immutable.fromJS(initialState), {
                type: el.type,
                payload: el.payload
            })).toEqual(Immutable.fromJS(Object.assign({}, initialState, el.payload)));
        });
    }));
});
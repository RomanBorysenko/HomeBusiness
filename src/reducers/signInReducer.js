import Immutable, {Map} from 'immutable';
import {createReducer} from 'redux-create-reducer';

export const initialState = Immutable.fromJS({
    loading: false,
    clientId: null,
    clientSecret: null,
    accessToken: null,
    expiresIn: null,
    refreshToken: null,
    user: {
        id: '',
        fio: '',
        email: '',
        gender: '',
        maritalStatus: '',
        bio: null,
        active: true,
        dateRegistered: null,
        dateActivated: null,
        dateJoin: null,
        dateBirth: null,
        favouriteColour: null,
        favouriteSport: null,
        schoolDream: null,
        hobby: null,
        photo: null,
        children: [],
        phones: []
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
});

const FETCH_SIGNIN = (state) => {
    return state
        .set('loading', true)
        .set('error', false)
    ;
};

const FETCH_SIGNIN_SUCCESS = (state, action) => {

    return state
        .set('loading', false)
        .set('clientId', '')
        .set('clientSecret', '')
        .set('errorMessage', '')
        .set('accessToken', action.value.token)
        .set('authorities', action.value.authorities)
        .set('accountNonExpired', action.value.accountNonExpired)
        .set('accountNonLocked', action.value.accountNonLocked)
        .set('credentialsNonExpired', action.value.credentialsNonExpired)
        .set('username', action.value.username)
        .set('ftv', action.value.ftv)
        .set('isAuth', action.value ? action.value.active : false)
        .set('user', Map(
            {
                id: action.value.id,
                fio: action.value.fio,
                email: action.value.email,
                gender: action.value.gender,
                maritalStatus: action.value.maritalStatus,
                bio: action.value.bio,
                active: action.value.active,
                dateRegistered: action.value.dateRegistered,
                dateActivated: action.value.dateActivated,
                dateJoin: action.value.dateJoin,
                dateBirth: action.value.dateBirth,
                favouriteColour: action.value.favouriteColour,
                favouriteSport: action.value.favouriteSport,
                schoolDream: action.value.schoolDream,
                hobby: action.value.hobby,
                photo: action.value.photo,
                phones: action.value.phones,
                children: action.value.children
            }));
};

const FETCH_SIGNIN_FAILURE = (state, action) => {
    return state
        .set('loading', false)
        .set('errorMessage', action.error || 'error message')
        .set('error', true)
    ;
};

const LOG_OUT = (state, action) => {
    return state
        .set('loading', false)
        .set('errorMessage', '')
        .set('error', false)
        .set('clientId', null)
        .set('clientSecret', null)
        .set('accessToken', null)
        .set('expiresIn', null)
        .set('refreshToken', null)
        .set('authorities', [])
        .set('accountNonExpired', false)
        .set('accountNonLocked', false)
        .set('credentialsNonExpired', false)
        .set('isAuth', null)
        .set('username', '')
    ;
};

const signInReducer = createReducer(initialState, {
    FETCH_SIGNIN,
    FETCH_SIGNIN_FAILURE,
    FETCH_SIGNIN_SUCCESS,
    LOG_OUT
});

export default signInReducer;


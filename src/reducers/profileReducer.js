import Immutable, {Map, List} from 'immutable';
import {createReducer} from 'redux-create-reducer';

export const initialState = Immutable.fromJS({
    loading: false,
    profile: {
        id: '',
        fio: '',
        email: '',
        photo: '',
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
        position: {},
        children: [],
        phones: [],
        username: ''
    },
    positions: [],
    errorMessage: '',
    error: false
});

const FETCH_PROFILE = (state) => {
    return state
        .set('loading', true)
        .set('error', false)
    ;
};

const FETCH_PROFILE_SUCCESS = (state, action) => {

    return state
        .set('loading', false)
        .set('errorMessage', '')
        .set('profile', Map(
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
                children: action.value.children,
                position: action.value.position,
                ftv: action.value.ftv
            }));
};


const FETCH_POSITIONS_SUCCESS = (state, action) => {
    return state
        .set('positions', List(action.value));
};

const FETCH_PROFILE_FAILURE = (state, action) => {
    return state
        .set('loading', false)
        .set('errorMessage', action.error || 'error message')
        .set('error', true)
    ;
};

const profileReducer = createReducer(initialState, {
    FETCH_PROFILE,
    FETCH_PROFILE_FAILURE,
    FETCH_PROFILE_SUCCESS,
    FETCH_POSITIONS_SUCCESS
});

export default profileReducer;


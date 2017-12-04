import {takeEvery} from 'redux-saga/effects';
import * as Constants from '../actions/actionTypes';
import {
    signIn,
    recovery
} from './authSaga';
import {
    fetchProfile,
    addChild,
    updateChild,
    deleteChild,
    addPhone,
    updatePhone,
    deletePhone,
    updateProfileData,
    uploadFile
} from './profileSaga';

function* mainSaga() {
    yield takeEvery(Constants.FETCH_SIGNIN, signIn);
    yield takeEvery(Constants.FETCH_RECOVERY, recovery);
    yield takeEvery(Constants.FETCH_PROFILE, fetchProfile);

    yield takeEvery(Constants.ADD_CHILD, addChild);
    yield takeEvery(Constants.UPDATE_CHILD, updateChild);
    yield takeEvery(Constants.DELETE_CHILD, deleteChild);

    yield takeEvery(Constants.ADD_PHONE, addPhone);
    yield takeEvery(Constants.UPDATE_PHONE, updatePhone);
    yield takeEvery(Constants.DELETE_PHONE, deletePhone);

    yield takeEvery(Constants.UPDATE_PROFILE_DATA, updateProfileData);
    yield takeEvery(Constants.UPLOAD_FILE, uploadFile);
}

export default mainSaga;

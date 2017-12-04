import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import {Field, reduxForm} from 'redux-form/immutable';
import {TextField, DatePicker} from 'redux-form-material-ui';
import SelectField from 'material-ui/SelectField';
import userProfileContainer from '../../containers/UserProfileContainer';
import LeftSideBar from '../sideBar/LeftSideBar';
import NavBar from '../navBar/NavBar';
import validate from './validator/userProfileValidate';
import {createStringOfChildren, getMaritalStatus} from '../utils/dataFormating';
require('babel-polyfill');

import './user.scss';


class UserProfile extends Component {
    static defaultProps = {
        navLinks: []
    };

    static contextTypes = {
        router: PropTypes.object
    };

    componentDidUpdate() {
        const {history} = this.context.router;
        const id = this.props.profile.id;

        this.props.profile.ftv ? history.push(`/users/${id}/cabinet`) : null;
    }

    render() {
        const {
            onChangeNavLink,
            navLinks,
            handleSubmit,
            uploadFile,
            photo,
            positions,
            displayPhones,
            onChangeParams,
            valid,
            phones,
            children,
            position,
            onChangeText,
            onChangeSelectMenu
        } = this.props;

        return (
            <form
                onSubmit={(e)=>handleSubmit(e, this.props.valid)}
                className="wrap-usercab"
            >
                <NavBar onChange={onChangeNavLink}>
                    {navLinks}
                </NavBar>


                <div className="content-usercab">
                    <div className="content-bg">
                        <svg className="multimedia">
                            <use xlinkHref="/assets/images/sprite.svg#multimedia"></use>
                        </svg>
                        <svg className="transport">
                            <use xlinkHref="/assets/images/sprite.svg#transport"></use>
                        </svg>
                        <svg className="medal">
                            <use xlinkHref="/assets/images/sprite.svg#medal"></use>
                        </svg>
                        <svg className="graphic-design">
                            <use xlinkHref="/assets/images/sprite.svg#graphic-design"></use>
                        </svg>
                        <svg className="technology">
                            <use xlinkHref="/assets/images/sprite.svg#technology"></use>
                        </svg>
                        <svg className="compass">
                            <use xlinkHref="/assets/images/sprite.svg#compass"></use>
                        </svg>
                        <svg className="mouse">
                            <use xlinkHref="/assets/images/sprite.svg#mouse"></use>
                        </svg>
                        <svg className="drawing">
                            <use xlinkHref="/assets/images/sprite.svg#drawing"></use>
                        </svg>
                    </div>
                    <div className="card-main">
                        <div className="card-left">
                            <Paper zDepth={1} className="card-top">
                                <div className="foto">
                                    <div className="foto-micro">
                                        <Paper zDepth={1} circle={true} className="circle">
                                            {photo ? <img src={photo} alt="" className="foto-circle"/> :
                                                <svg className="logo">
                                                    <use xlinkHref="/assets/images/sprite.svg#logo"></use>
                                                </svg>}
                                        </Paper>
                                    </div>
                                    <div className ="foto-text">
                                        <div className="file-upload">
                                            <label>
                                                <input accept="image/*,image/jpeg" onChange={(e)=>{uploadFile(e.target.files[0])}} type="file" name="file" />
                                                <span className="span">Добавить фото</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="info">
                                    <div className="info-form">
                                        <div className="name-main-reg">
                                            <label className="label-name-reg">ФИО <span
                                                className="red-star">*</span>:</label>
                                            <Field
                                                component={TextField}
                                                ref={(input) => {this.fio = input}}
                                                name='fio'
                                                type='text'
                                                hintText="Введите ФИО"
                                                size="30"
                                                hintStyle={{
                                                    paddingLeft: '10px'
                                                }}
                                                className="form-name-reg"
                                            />
                                        </div>
                                        <div className="status-main-reg">
                                            <label className="label-status-reg">Должность <span
                                                className="red-star">*</span>:</label>
                                            <SelectField
                                                onChange={(e, key, payload)=>{onChangeText(payload, 'position')}}
                                                value={position}
                                                hintText="Введите должность"
                                                className="form-status-reg"
                                                hintStyle={{
                                                    paddingLeft: '10px'
                                                }}
                                            >
                                                {positions.map((item) => (
                                                    <MenuItem value={item.id} primaryText={item.name}/>
                                                ))}
                                            </SelectField>
                                        </div>
                                        <div className="phone-main-reg">
                                            <label className="label-phone-reg">Номер телефона<span
                                                className="red-star">*</span>:</label>
                                            <TextField
                                                multiline={true}
                                                className="form-phone-reg"
                                                value={displayPhones(phones)}
                                                size="20"
                                                onClick={()=>onChangeParams('showDialogOfParamsPhones')}
                                            />
                                        </div>
                                        <div className="email-main-reg">
                                            <label className="label-email-reg">E-mail рабочий:</label>
                                            <Field
                                                component={TextField}
                                                name='email'
                                                hintText="Введите e-mail"
                                                size="30"
                                                className="form-email-reg"
                                                hintStyle={{
                                                    paddingLeft: '10px'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                            <Paper zDepth={1} className="card-center">
                                <form className="info">
                                    <div className="info-h2"><p>Личная информация</p></div>
                                    <div className="info-form">
                                        <div className="born-main-reg">
                                            <label className="label-born-reg">Дата рождения:</label>
                                            <Field
                                                name='birthDate'
                                                component={DatePicker}
                                                hintText="Выберите дату рождения"
                                                className="form-born-reg"
                                                hintStyle={{
                                                    paddingLeft: '10px'
                                                }}
                                                textFieldStyle={{width: '100%'}}
                                            />
                                        </div>
                                        <div className="family-main-reg">
                                            <label className="label-family-reg">Семейное положение:</label>
                                            <SelectField
                                                value={getMaritalStatus(this.props.maritalStatus || this.props.profile.maritalStatus, this.props.profile.gender)}
                                                onChange={(e, key, payload)=>onChangeSelectMenu(e, key, payload, 'maritalStatus')}
                                                hintText="Выберите семейное положение"
                                                className="form-family-reg"
                                                hintStyle={{
                                                    paddingLeft: '10px'
                                                }}
                                            >
                                                <MenuItem value={1} primaryText="Женат"/>
                                                <MenuItem value={2} primaryText="Не женат"/>
                                                <MenuItem value={3} primaryText="Замужем"/>
                                                <MenuItem value={4} primaryText="Не замужем"/>
                                            </SelectField>
                                        </div>
                                        <div className="child-main-reg">
                                            <label className="label-child-reg">Дети:</label>
                                            <TextField
                                                value={createStringOfChildren(children)}
                                                multiline={true}
                                                hintText="Укажите имена и даты рождения детей"
                                                size="30"
                                                className="form-child-reg"
                                                onClick={()=>onChangeParams('showDialogOfParamsChildren')}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </Paper>
                        </div>
                        <div className="card-right">
                            <Paper zDepth={1} className="card-top">
                                <div className="info">
                                    <div className="info-h2"><p><span>О себе</span></p></div>
                                    <div className="info-form">
                                        <div className="hobby-main-reg">
                                            <label className="label-hobby-reg">Хобби:</label>
                                            <Field
                                                ref={(input) => {this.hobby = input}}
                                                component={TextField}
                                                name='hobby'
                                                hintText="Введите хобби"
                                                size="30"
                                                className="form-hobby-reg"
                                                hintStyle={{
                                                    paddingLeft: '10px'
                                                }}
                                            />
                                        </div>
                                        <div className="color-main-reg">
                                            <label className="label-color-reg">Любимый цвет:</label>
                                            <Field
                                                ref={(input) => {this.favouriteColour = input}}
                                                component={TextField}
                                                name='favouriteColour'
                                                hintText="Введите любимый цвет"
                                                size="30"
                                                className="form-color-reg"
                                                hintStyle={{
                                                    paddingLeft: '10px'
                                                }}
                                            />
                                        </div>
                                        <div className="sport-main-reg">
                                            <label className="label-sport-reg">Любимый вид спорта:</label>
                                            <Field
                                                component={TextField}
                                                name='favouriteSport'
                                                hintText="Введите любимый вид спорта"
                                                size="30"
                                                className="form-sport-reg"
                                                hintStyle={{
                                                    paddingLeft: '10px'
                                                }}
                                            />
                                        </div>
                                        <div className="dream-main-reg">
                                            <label className="label-dream-reg">Мечтал(а) стать в школе:</label>
                                            <Field
                                                component={TextField}
                                                name='schoolDream'
                                                hintText="Введите школьную мечту"
                                                size="30"
                                                className="form-dream-reg"
                                                hintStyle={{
                                                    paddingLeft: '10px'
                                                }}
                                            />
                                        </div>
                                        <div className="textarea-main-reg">
                                            <label className="label-textarea-reg">Немного о себе:</label>
                                            <Field
                                                component={TextField}
                                                name='bio'
                                                className="form-textarea-reg"
                                                hintText="Введите любую дополнительную информацию о себе"
                                                defaultValue=""
                                                multiLine={true}
                                                rows={1}
                                                rowsMax={10}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        </div>
                        <div className="bottom-user-profile">
                            <RaisedButton
                                type='submit'
                                disabled={!valid}
                                fullWidth={true}
                                primary={true}
                                label="Продолжить"
                                labelStyle={{fontSize: 14, verticalAlign: 'center'}}
                                buttonStyle={{backgroundColor: '#6859dc', width: 172}}
                                labelPosition="after"
                                className="button"
                            />
                        </div>
                    </div>
                </div>
                <LeftSideBar/>
            </form>
        );
    }
}

UserProfile.propTypes = {
    onChangeNavLink: PropTypes.func,
    navLinks: PropTypes.array,
    handleSubmit: PropTypes.func,
    uploadFile: PropTypes.func,
    positions: PropTypes.array,
    phones: PropTypes.array,
    children: PropTypes.array,
    displayPhones: PropTypes.func,
    onChangeParams: PropTypes.func,
    valid: PropTypes.bool
};

UserProfile = reduxForm({
    form: 'profile',
    enableReinitialize: true,
    validate
})(UserProfile);

export default userProfileContainer(UserProfile);

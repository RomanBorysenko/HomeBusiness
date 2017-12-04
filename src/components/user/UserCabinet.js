import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NavBar from '../navBar/NavBar';
import userProfileContainer from '../../containers/UserProfileContainer';
import LeftSideBar from '../sideBar/LeftSideBar';
import UserDialog from './UserDialog';
require('babel-polyfill');
import './user.scss';
import {createStringOfChildren, getMaritalStatus} from '../utils/dataFormating';

const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);


class UserCabinet extends Component {

    static defaultProps = {
        navLinks: []
    };

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.localError !== this.props.localError) {
            this.addAlert(nextProps.localError);
        }
    }

    addAlert = (message) => {
        this.container.success(
            '',
            message, {
                timeOut: 3000,
                extendedTimeOut: 1000
            });
    };

    render() {
        const {
            navLinks,
            onChangeText,
            onChangeSelectMenu,
            profile,
            photo,
            displayPhones,
            fio,
            email,
            bio,
            dateBirth,
            favouriteColour,
            favouriteSport,
            schoolDream,
            hobby,
            handleChangeDateBirth,
            changePassword,
            onChangeParams,
            children,
            phones,
            uploadFile,
            updateProfile,
            positions,
            position
        } = this.props;

        return (
            <div className="wrap-usercab">
                <ToastContainer
                    ref={(input) => {this.container = input;}}
                    toastMessageFactory={ToastMessageFactory}
                    className="toast-top-right"
                />
                <UserDialog {...this.props}/>
                <NavBar>
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
                                    <div className ="foto-micro">
                                        <Paper zDepth={1} circle={true} className="circle">
                                            <img src={photo} alt="" className="foto-circle"/>
                                        </Paper>
                                    </div>
                                    <div className ="foto-text">
                                        <div className="file-upload">
                                            <label>
                                                <input accept="image/*,image/jpeg" onChange={(e)=>{uploadFile(e.target.files[0])}} type="file" name="file" />
                                                <span className="span">Изменить фото</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="info">
                                    <TextField
                                        value={fio || profile.fio}
                                        onChange={(e, name)=>onChangeText(e, 'fio')}
                                        hintText="ФИО"
                                        className="info-name"
                                        fullWidth={{ width:'200px'}}
                                        inputStyle={{color:'#126dc4', fontSize:'25px'}}
                                        onBlur={()=>updateProfile()}
                                    />
                                    <div className="info-status">
                                        <SelectField
                                            onChange={(e, key, payload)=>{onChangeText(payload, 'position')}}
                                            floatingLabelText="Должность"
                                            className="form-family"
                                            value={position}
                                            fullWidth={{ width:'200px'}}
                                        >
                                            {positions.map((item)=>(
                                                <MenuItem value={item.id} primaryText={item.name}/>
                                            ))}
                                        </SelectField>
                                    </div>
                                    <form className="info-form">
                                        <div className="phone-main">
                                            <label className="label-phone">Номер телефона:</label>
                                            <TextField
                                                multiline={true}
                                                className="form-phone"
                                                value={displayPhones(phones || profile.phones)}
                                                size="20"
                                                onClick={()=>onChangeParams('showDialogOfParamsPhones')}
                                            />
                                        </div>
                                        <div className="email-main">
                                            <label className="label-email">E-mail рабочий:</label>
                                            <TextField
                                                className="form-email"
                                                size="35"
                                                value={email || profile.email}
                                                onChange={(e, name)=>onChangeText(e, 'email')}
                                                onBlur={()=>updateProfile()}
                                            />
                                        </div>
                                        <div className="password-main">
                                            <label className="label-password"><p><span>Пароль:</span></p></label>
                                            <a><p className="form-password"><span onClick={changePassword}>Изменить пароль</span></p></a>
                                        </div>
                                    </form>
                                </div>
                            </Paper>
                            <Paper zDepth={1} className="card-center">
                                <div className="info">
                                    <div className="info-h2"><p>Личная информация</p></div>
                                    <form className="info-form">
                                        <div className="born-main">
                                            <label className="label-born"><p><span>Дата рождения:</span></p></label>
                                            <DatePicker
                                                onChange={handleChangeDateBirth}
                                                value={dateBirth ? new Date(dateBirth) : profile.dateBirth ? new Date(profile.dateBirth) : ''}
                                                textFieldStyle={{ width:'312px'}}
                                                className="form-born"
                                            />
                                        </div>
                                        <div className="family-main">
                                            <label className="label-family">Семейное положение:</label>
                                            <SelectField
                                                className="form-family"
                                                value={getMaritalStatus(this.props.maritalStatus || this.props.profile.maritalStatus, this.props.profile.gender)}
                                                onChange={(e, key, payload)=>onChangeSelectMenu(e, key, payload, 'maritalStatus')}
                                            >
                                                <MenuItem value='maried_male' primaryText="Женат"/>
                                                <MenuItem value='single_male' primaryText="Не женат"/>
                                                <MenuItem value='maried_female' primaryText="Замужем"/>
                                                <MenuItem value='single_female' primaryText="Не замужем"/>
                                            </SelectField>
                                        </div>
                                        <div className="child-main">
                                            <label className="label-child">Дети:</label>
                                            <TextField
                                                multiLine={true}
                                                className="form-child"
                                                value={createStringOfChildren(children)}
                                                size="35"
                                                onClick={()=>onChangeParams('showDialogOfParamsChildren')}
                                            />
                                        </div>

                                    </form>
                                </div>
                            </Paper>
                            <Paper zDepth={1} className="card-bottom">
                                <div className="info">
                                    <div className="left">
                                        <div className="left-h2"><p>Рабочее время</p></div>
                                        <div className="counter-main">
                                            <div className="vertical-div"></div>
                                            <div className="counter">
                                                <div className="text">
                                                    <p><span>План часов на месяц:</span></p>
                                                </div>
                                                <div className="number">
                                                    <p><span>168:00</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="left-a"><a href="#"><p><span>Детальная информация о рабочем времени</span></p></a></div>
                                    </div>
                                    <div className="right">
                                        <div className="circle-main">
                                            <CircularProgress
                                                mode="determinate"
                                                value={50}
                                                size={190}
                                                thickness={10}
                                                className="circle"
                                            />
                                        </div>
                                        <div className="circle-bg"></div>
                                        <div className="circle-front"></div>
                                        <div className="circle-text">
                                            <div className="top"><p><span>50%</span></p></div>
                                            <div className="center"><p><span>Отработано часов:</span></p></div>
                                            <div className="bottom"><p><span>84:00</span></p></div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        </div>
                        <div className="card-right">
                            <Paper zDepth={1} className="card-top">
                                <div className="info">
                                    <div className="info-h2"><p><span>О себе</span></p></div>
                                    <form className="info-form">
                                        <div className="hobby-main">
                                            <label className="label-hobby">Хобби:</label>
                                            <TextField
                                                className="form-hobby"
                                                value={hobby || profile.hobby}
                                                size="12"
                                                onChange={(e, name)=>onChangeText(e, 'hobby')}
                                                onBlur={()=>updateProfile()}
                                            />
                                        </div>
                                        <div className="color-main">
                                            <label className="label-color">Любимый цвет:</label>
                                            <TextField
                                                className="form-color"
                                                value={favouriteColour || profile.favouriteColour}
                                                size="20"
                                                onChange={(e, name)=>onChangeText(e, 'favouriteColour')}
                                                onBlur={()=>updateProfile()}
                                            />
                                        </div>
                                        <div className="sport-main">
                                            <label className="label-sport">Любимый вид спорта:</label>
                                            <TextField
                                                className="form-sport"
                                                value={favouriteSport || profile.favouriteSport}
                                                size="35"
                                                onChange={(e, name)=>onChangeText(e, 'favouriteSport')}
                                                onBlur={()=>updateProfile()}
                                            />
                                        </div>
                                        <div className="dream-main">
                                            <label className="label-dream">Мечтал(а) стать в школе:</label>
                                            <TextField
                                                className="form-dream"
                                                value={schoolDream || profile.schoolDream}
                                                size="35"
                                                onChange={(e, name)=>onChangeText(e, 'schoolDream')}
                                                onBlur={()=>updateProfile()}
                                            />
                                        </div>
                                        <div className="textarea-main">
                                            <label className="label-textarea">Немного о себе:</label>
                                            <TextField
                                                className="form-textarea"
                                                value={bio || profile.bio}
                                                multiLine={true}
                                                rows={1}
                                                rowsMax={10}
                                                onChange={(e, name)=>onChangeText(e, 'bio')}
                                                onBlur={()=>updateProfile()}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </Paper>
                        </div>
                    </div>
                </div>
                <LeftSideBar/>
            </div>
        );
    }
}

UserCabinet.propTypes = {
    navLinks: PropTypes.array,
    children: PropTypes.array,
    profile: PropTypes.object,
    onChangeText: PropTypes.func,
    displayPhones: PropTypes.func,
    onChangeParams: PropTypes.func,
    onChangeSelectMenu: PropTypes.func,
    phones: PropTypes.array,
    fio: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    dateBirth: PropTypes.string,
    favouriteColour: PropTypes.string,
    favouriteSport: PropTypes.string,
    schoolDream: PropTypes.string,
    hobby: PropTypes.string,
    handleChangeDateBirth: PropTypes.func,
    changePassword: PropTypes.func,
    uploadFile: PropTypes.func,
    updateProfile: PropTypes.func,
    positions: PropTypes.array
};

export default userProfileContainer(UserCabinet);

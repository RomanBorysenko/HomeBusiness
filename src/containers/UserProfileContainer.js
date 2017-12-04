import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Moment from 'moment';
import DialogOfParamsPhones from '../components/user/DialogOfParamsPhones';
import DialogOfParamsChildren from '../components/user/DialogOfParamsChildren';
// import validator from 'validator';
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
} from '../actions/userProfile';
import {setProfileData, setFirstProfileData} from '../components/utils/dataFormating';

export default function userProfileContainer(ChildComponent) {
    const NavLinks = [
        {id: 0, value: 'Анкета', link: `users/3/cabinet`},
        {id: 1, value: 'Интервью'},
        {id: 2, value: 'Плюшки'}
    ];
    class UserProfile extends Component {

        static contextTypes = {
            router: PropTypes.object
        };

        constructor(props) {
            super(props);

            this.state = {
                loader: false,
                id: '',
                fio: '',
                email: '',
                gender: '',
                maritalStatus: '',
                bio: '',
                active: '',
                dateBirth: '',
                favouriteColour: '',
                favouriteSport: '',
                schoolDream: '',
                hobby: '',
                photo: '',
                position: '',
                children: [],
                phones: [],
                showDialog: false,
                oldPassword: '',
                newPassword: '',
                repeatPassword: '',
                showDialogOfParamsChildren: false,
                showDialogOfParamsPhones: false,
                localError: '',
            };
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.profile.children !== this.state.children) {
                this.setState({children: nextProps.profile.children});
            }
            if (nextProps.profile.phones !== this.state.phones) {
                this.setState({phones: nextProps.profile.phones});
            }
            if (nextProps.profile.id) {
                this.setState({
                    id: nextProps.profile.id,
                    fio: nextProps.profile.fio,
                    email: nextProps.profile.email,
                    photo: nextProps.profile.photo,
                    gender: nextProps.profile.gender,
                    maritalStatus: nextProps.profile.maritalStatus,
                    bio: nextProps.profile.bio,
                    active: nextProps.profile.active,
                    dateBirth: nextProps.profile.dateBirth,
                    favouriteColour: nextProps.profile.favouriteColour,
                    favouriteSport: nextProps.profile.favouriteSport,
                    schoolDream: nextProps.profile.schoolDream,
                    hobby: nextProps.profile.hobby,
                    phones: nextProps.profile.phones,
                    children: nextProps.profile.children,
                    position: nextProps.profile.position.id
                })
            }
        }

        componentDidMount() {
            const {history} = this.context.router;

            this.props.fetchProfile(history);
        }

        handleSubmit = () => {
            this.props.updateProfileData(setProfileData({...this.state}));
            //history.push(`/users/${this.state.id}/cabinet`);
        };

        updateProfile = (state) => {
            const value = state ? setProfileData({...state}) : setProfileData({...this.state});
            this.props.updateProfileData(value);
        };

        uploadFile = (file) => {
            this.props.uploadFile(file);
        };

        displayPhones = (phones) => {
            let result = '';
            if (phones) {
                phones.map((value) => {
                    if (!value.isDeleted) {
                        result = result + (result.length > 0 ? '  ' : '') + value.phone;
                    }
                });
            }
            return result;
        };

        setMaritalStatus = (value) => {
            if (value) {
                if (value === 'single_male' || value === 'single_female') {
                    return 'SINGLE';
                }
                return 'MARRIED';

            }
            return null;
        };

        onChangeSelectMenu = (e, id, key, field) => {
            let val = this.setMaritalStatus(key);

            this.setState({
                [field]: val
            }, ()=>this.updateProfile(this.state));
            return val;
        };

        onChangeText = (e, field) => {
            let val = e.target ? e.target.value : e;
            this.setState({
                [field]: val
            });

            return val;
        };

        handleChangeDateBirth = (event, date) => {
            const time = Moment(date);

            this.setState({
                dateBirth: time._i
            }, ()=>this.updateProfile(this.state));
        };

        handleAddChildren = () => {
            const {children} = this.state;
            const newValue = children;

            newValue.push({
                isNew: true,
                id: parseInt(Math.random() * 4333),
                name: '',
                birthDate: null,
                gender: 'MALE'
            });
            this.setState({children: newValue});
        };

        handleChangeChildren = (e, value, item, field) => {
            const {children} = this.state;
            const newValue = children.map((data)=>{
                if (data.id === item.id) {
                    let row = data;
                    row[field] = e ? e.target.textContent ? e.target.textContent : value : value;
                    row.isEdited = true;
                    return row;
                }
                return data;

            });

            this.setState({children: newValue});
        };

        handleDeleteChildren = (item) => {
            const {children} = this.state;
            const newValue = children.map((data)=>{
                if (data.id === item.id) {
                    let row = data;
                    row.isDeleted = true;
                    return row;
                }
                return data;
            });
            this.setState({children: newValue});
        };

        handleChangePhones = (e, value, item, field) => {
            const {phones} = this.state;
            let newValue = [];

            if (field === 'primary') {
                let primaryPhones = phones.filter((data)=>{
                    if (data.primary) {
                       return true
                    } else {
                       false;
                    }
                });
                if (primaryPhones.length && value) {
                    return null
                } else if (primaryPhones.length && !value || primaryPhones.length === 0) {
                    newValue = phones.map((data) => {
                        if (data.id === item.id) {
                            let row = data;
                            row[field] = value;
                            row.isEdited = true;
                            return row;
                        }
                        return data;
                    });
                }
            } else {
                newValue = phones.map((data) => {
                    if (data.id === item.id) {
                        let row = data;
                        row[field] = field === 'primary' ? value : e ? e.target.value : value;
                        row.isEdited = true;
                        return row;
                    }
                    return data;
                });
            }

            this.setState({phones: newValue});
        };

        handleAddPhones = () => {
            const {phones} = this.state;
            const newValue = phones;

            newValue.push({
                isNew: true,
                id: parseInt(Math.random() * 4333),
                phone: '',
                primary: false
            });
            this.setState({phones: newValue});
        };

        handleDeletePhones = (item) => {
            const {phones} = this.state;
            const newValue = phones.filter((data)=>{
                if (data.id === item.id) {
                    let row = data;
                    row.isDeleted = true;
                    return row;
                }
                return data;
            });
            this.setState({phones: newValue});
        };

        changePassword = () => {
            this.setState({showDialog: !this.state.showDialog});
        };

        onChangeParams = (key) => {
            if (key === 'showDialogOfParamsChildren') {
                this.setState({showDialogOfParamsChildren: !this.state.showDialogOfParamsChildren});
            }
            if (key === 'showDialogOfParamsPhones') {
                this.setState({showDialogOfParamsPhones: !this.state.showDialogOfParamsPhones});
            }
        };

        handleSaveChild = (e, value) => {
            const children = value ? value : this.state.children;
            const dataNew = [];
            const dataEdited = [];
            const dataDeleted =[];

            children.forEach((item)=>{
                if (item.isNew && !item.isDeleted) {
                    if (new Date(item.birthDate) < new Date()) {
                        dataNew.push({
                            name: item.name,
                            birthDate: Moment(item.birthDate).format('YYYY-MM-DD'),
                            gender: item.gender
                        });
                    } else {
                        return {error: 'Дата рождения превышает текущую'};
                    }
                }
                if (item.isEdited && !item.isDeleted && !item.isNew) {
                    if (new Date(item.birthDate) < new Date()) {
                        dataEdited.push({
                            id: item.id,
                            name: item.name,
                            birthDate: Moment(item.birthDate).format('YYYY-MM-DD'),
                            gender: item.gender
                        });
                    } else {
                        return {error: 'Дата рождения превышает текущую'};
                    }
                }
                if (item.isDeleted && !item.isNew) {
                    dataDeleted.push({
                        id: item.id
                    });
                }
            });

            if (dataNew.length) {
                this.props.addChild(dataNew);
                this.onChangeParams('showDialogOfParamsChildren');
            }

            if (dataEdited.length) {
                dataEdited.forEach((item)=>{
                    this.props.updateChild(item);
                });
                this.onChangeParams('showDialogOfParamsChildren');
            }

            if (dataDeleted.length) {
                dataDeleted.forEach((item)=>{
                    this.props.deleteChild(item.id);
                });
                this.onChangeParams('showDialogOfParamsChildren');
            }

        };

        handleSavePhones = (e, value) => {
            const phones = value ? value : this.state.phones;
            const dataNew = [];
            const dataEdited = [];
            const dataDeleted =[];

            phones.forEach((item)=>{
                if (item.isNew && !item.isDeleted) {
                    if (item.phone.replace(/[\(|\)|\_|\+|-]/g, '').length === 12) {
                        dataNew.push({
                            phone: item.phone,
                            primary: item.primary,
                        });
                    } else {
                        return {error: 'Номер не соответствует маске'};
                    }
                }
                if (item.isEdited && !item.isDeleted && !item.isNew) {
                    if (item.phone.replace(/[\(|\)|\_|\+|-]/g, '').length === 12) {
                        dataEdited.push({
                            id: item.id,
                            phone: item.phone,
                            primary: item.primary
                        });
                    } else {
                        this.setState({localError: 'Пожалуйста, укажите корректный номер'});
                    }
                }
                if (item.isDeleted && !item.isNew) {
                    dataDeleted.push({
                        id: item.id
                    });
                }
            });

            if (dataNew.length) {
                this.props.addPhone(dataNew);
                this.onChangeParams('showDialogOfParamsPhones');
            }

            if (dataEdited.length) {
                dataEdited.forEach((item)=>{
                    this.props.updatePhone(item);
                    this.onChangeParams('showDialogOfParamsPhones');
                });
            }

            if (dataDeleted.length) {
                dataDeleted.forEach((item)=>{
                    this.props.deletePhone(item.id);
                    this.onChangeParams('showDialogOfParamsPhones');
                });
            }

        };

        render() {
            const {children, phones} = this.state;
            return (
                <div>
                    <DialogOfParamsPhones
                        showDialogOfParamsPhones={this.state.showDialogOfParamsPhones}
                        onChangeParams={this.onChangeParams}
                        handleAddPhones={this.handleAddPhones}
                        handleChangePhones={this.handleChangePhones}
                        handleDeletePhones={this.handleDeletePhones}
                        handleSavePhones={this.handleSavePhones}
                        data={phones}
                    />
                    <DialogOfParamsChildren
                        showDialogOfParamsChildren={this.state.showDialogOfParamsChildren}
                        handleAddChildren={this.handleAddChildren}
                        handleChangeChildren={this.handleChangeChildren}
                        handleDeleteChildren={this.handleDeleteChildren}
                        handleSaveChild={this.handleSaveChild}
                        onChangeParams={this.onChangeParams}
                        data={children}
                    />
                    <ChildComponent
                        navLinks={NavLinks}
                        {...this.props}
                        {...this.state}
                        onChangeNavLink={this.onChangeNavLink}
                        onChangeText={this.onChangeText}
                        displayPhones={this.displayPhones}
                        handleChangeDateBirth={this.handleChangeDateBirth}
                        changePassword={this.changePassword}
                        onChangeParams={this.onChangeParams}
                        handleChangeChildren={this.handleChangeChildren}
                        handleAddChildren={this.handleAddChildren}
                        handleDeleteChildren={this.handleDeleteChildren}
                        handleChangePhones={this.handleChangePhones}
                        handleAddPhones={this.handleAddPhones}
                        handleDeletePhones={this.handleDeletePhones}
                        onChangeSelectMenu={this.onChangeSelectMenu}
                        handleSaveChild={this.handleSaveChild}
                        handleSavePhones={this.handleSavePhones}
                        updateProfile={this.updateProfile}
                        uploadFile={this.uploadFile}
                        handleSubmit={this.handleSubmit}
                    />
                </div>
            );
        }
    }

    UserProfile.propTypes = {
        actions: PropTypes.object,
        route: PropTypes.object,
        profile: PropTypes.object,
        positions: PropTypes.object,
        path: PropTypes.string
    };

    const mapStateProps = (state) => {
        let dataForm = {};
        const formProfile = state.get('form');
        if (formProfile && formProfile.size > 0) {
            dataForm = formProfile.toJS().profile.values;
        }
        return {
            profile: Object.assign({}, state.getIn(['profileReducer', 'profile']).toJS(), dataForm),
            positions: state.getIn(['profileReducer', 'positions']).toJS()
        };
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            fetchProfile: bindActionCreators(fetchProfile, dispatch),
            addChild: bindActionCreators(addChild, dispatch),
            updateChild: bindActionCreators(updateChild, dispatch),
            deleteChild: bindActionCreators(deleteChild, dispatch),
            addPhone: bindActionCreators(addPhone, dispatch),
            updatePhone: bindActionCreators(updatePhone, dispatch),
            deletePhone: bindActionCreators(deletePhone, dispatch),
            updateProfileData: bindActionCreators(updateProfileData, dispatch),
            uploadFile: bindActionCreators(uploadFile, dispatch)
        };
    };

    return connect(mapStateProps, mapDispatchToProps)(UserProfile);
}

import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import Checkbox from 'material-ui/Checkbox';
import InputMask from 'react-input-mask';

import './user.scss';

class DialogOfParamsPhones extends Component {

    static defaultProps = {
        data: [],
        phones: []
    };

    render() {
        const {
            showDialogOfParamsPhones,
            onChangeParams,
            data,
            handleChangePhones,
            handleAddPhones,
            handleDeletePhones,
            handleSavePhones
        } = this.props;

        const actions = [
            <div style={{textAlign: 'center'}}
                 className="btn-child">
                <RaisedButton
                    label="ОТМЕНА"
                    keyboardFocused={false}
                    onClick={()=>onChangeParams('showDialogOfParamsPhones')}
                    style={{marginRight: 15}}
                />
                <RaisedButton
                    label="СОХРАНИТЬ ИЗМЕНЕНИЯ"
                    primary={true}
                    keyboardFocused={false}
                    onClick={handleSavePhones}
                />
            </div>
        ];

        return (
            <Dialog
                title="КОНТАКТНЫЕ НОМЕРА"
                titleStyle={{fontSize:'25px', fontFamily:'Gotham Pro,sans-serif'}}
                actions={actions}
                modal={false}
                open={showDialogOfParamsPhones}
                onRequestClose={()=>onChangeParams('showDialogOfParamsPhones')}
                style={{textAlign: 'center'}}
            >
                <div>
                    {data.map((item, i)=>(
                        item.isDeleted ? null :
                        <div key={i}>
                            <div className='column-2'>
                                <InputMask
                                    mask='+38(999)-999-99-99'
                                    inputStyle={{textAlign: 'center'}}
                                    size="35"
                                    value={item.phone}
                                    style={{width: '100%', height: '100%'}}
                                    onChange={(e, key)=>handleChangePhones(e, key, item, 'phone')}
                                    className='mask'
                                    placeholder={'Номер телефона'}
                                />
                            </div>
                            <div className='column-2'>
                                <Checkbox
                                    checked={item.primary}
                                    onCheck={(e, key)=>handleChangePhones(e, key, item, 'primary')}
                                    label="Основной номер"
                                    className='radio'
                                />
                            </div>
                            <div className='column-action-2'>
                                <FloatingActionButton
                                    mini={true}
                                    secondary={true}
                                >
                                    <ContentClear
                                        onClick={()=>handleDeletePhones(item)}/>
                                </FloatingActionButton>
                            </div>
                        </div>
                    )
                    )}
                    <FloatingActionButton>
                        <ContentAdd onClick={handleAddPhones}/>
                    </FloatingActionButton>
                </div>
            </Dialog>
        );
    }
}

DialogOfParamsPhones.propTypes = {
    onChangeParams: PropTypes.bool,
    data: PropTypes.array,
    showDialogOfParamsPhones: PropTypes.bool,
    handleChangePhones: PropTypes.func,
    handleAddPhones: PropTypes.func,
    handleDeletePhones: PropTypes.func,
    handleSavePhones: PropTypes.func,
    addAlert: PropTypes.func
};

export default DialogOfParamsPhones;



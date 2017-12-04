import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

import './user.scss';

class DialogOfParamsChildren extends Component {

    static defaultProps = {
        data: [],
        children: []
    };

    render() {
        const {
            showDialogOfParamsChildren,
            onChangeParams,
            data,
            handleChangeChildren,
            handleAddChildren,
            handleDeleteChildren,
            handleSaveChild
        } = this.props;

        const actions = [
            <div style={{textAlign: 'center'}}
                 className="btn-child">
                <RaisedButton
                    label="ОТМЕНА"
                    keyboardFocused={false}
                    onClick={()=>onChangeParams('showDialogOfParamsChildren')}
                    style={{marginRight: 15}}
                />
                <RaisedButton
                    label="СОХРАНИТЬ ИЗМЕНЕНИЯ"
                    primary={true}
                    keyboardFocused={false}
                    onClick={handleSaveChild}
                />
            </div>
        ];

        return (
            <Dialog
                title="ДЕТИ"
                titleStyle={{fontSize:'25px', fontFamily:'Gotham Pro,sans-serif'}}
                actions={actions}
                modal={false}
                open={showDialogOfParamsChildren}
                onRequestClose={()=>onChangeParams('showDialogOfParamsChildren')}
                style={{textAlign: 'center'}}
            >
                <div className="dialog-main">
                    <div>
                        {data.map((item, i)=>(
                            item.isDeleted ? null :
                            <div key={i}>
                                <div className='column'>
                                    <TextField
                                        inputStyle={{textAlign: 'center'}}
                                        placeholder={'Имя'}
                                        size="35"
                                        value={item.name}
                                        style={{width: '100%', height: '100%'}}
                                        onChange={(e, key)=>{handleChangeChildren(e, key, item, 'name');}}
                                    />
                                </div>
                                <div className='column'>
                                    <SelectField
                                        value={item.gender}
                                        style={{width: '100%', height: '100%'}}
                                        onChange={(e, key)=>{handleChangeChildren(e, key, item, 'gender');}}
                                    >
                                        <MenuItem value='MALE' primaryText='MALE' key='MALE' />
                                        <MenuItem value='FEMALE' primaryText='FEMALE' />
                                    </SelectField>
                                </div>
                                <div className='column'>
                                    <DatePicker
                                        onChange={(e, date)=>{handleChangeChildren('', date, item, 'birthDate');}}
                                        value={item.birthDate ? new Date(item.birthDate) : ''}
                                        className='date-pick'
                                        hintText="Выберите дату рождения"
                                        textFieldStyle={{ width:'210px'}}
                                    />
                                </div>
                                <div className='column-action'>
                                    <FloatingActionButton
                                        mini={true}
                                        secondary={true}
                                    >
                                        <ContentClear
                                            onClick={()=>handleDeleteChildren(item)}/>
                                    </FloatingActionButton>
                                </div>
                            </div>
                        )
                        )}
                        <FloatingActionButton>
                            <ContentAdd onClick={handleAddChildren}/>
                        </FloatingActionButton>
                    </div>
                </div>
            </Dialog>
        );
    }
}

DialogOfParamsChildren.propTypes = {
    onChangeParams: PropTypes.bool,
    data: PropTypes.array,
    showDialogOfParamsChildren: PropTypes.bool,
    handleChangeChildren: PropTypes.func,
    handleAddChildren: PropTypes.func,
    handleDeleteChildren: PropTypes.func,
    handleSaveChild: PropTypes.func
};

export default DialogOfParamsChildren;

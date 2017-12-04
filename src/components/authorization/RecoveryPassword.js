import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import './recovery.scss';

class RecoveryPassword extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    static defaultProps = {
    };

    render() {

        return (
            <div>
                <div className="main-page">
                    <div className="main-page-line">
                        <div className="page-line"></div>
                        <div className="page-line"></div>
                        <div className="page-line"></div>
                    </div>
                    <div className="main-page-icons">
                        <svg className="svg-1" fill="#eae9e9"> <use xlinkHref="assets/images/sprite.svg#medal"></use></svg>
                        <svg className="svg-2" fill="#eae9e9"> <use xlinkHref="assets/images/sprite.svg#anchor"></use></svg>
                        <svg className="svg-3" fill="#eae9e9"> <use xlinkHref="assets/images/sprite.svg#arrows"></use></svg>
                        <svg className="svg-4" fill="#eae9e9"> <use xlinkHref="assets/images/sprite.svg#cloud"></use></svg>
                        <svg className="svg-5" fill="#eae9e9"> <use xlinkHref="assets/images/sprite.svg#compass"></use></svg>
                        <svg className="svg-6" fill="#eae9e9"> <use xlinkHref="assets/images/sprite.svg#drawing"></use></svg>
                        <svg className="svg-7" fill="#eae9e9"> <use xlinkHref="assets/images/sprite.svg#graphic-design"></use></svg>
                        <svg className="svg-8" fill="#eae9e9"> <use xlinkHref="assets/images/sprite.svg#multimedia"></use></svg>
                        <svg className="svg-9" fill="#eae9e9"> <use xlinkHref="assets/images/sprite.svg#idea"></use></svg>
                        <svg className="svg-10" fill="#eae9e9"> <use xlinkHref="assets/images/sprite.svg#mouse"></use></svg>
                        <svg className="svg-11" fill="#eae9e9"> <use xlinkHref="assets/images/sprite.svg#pen"></use></svg>
                        <svg className="svg-12" fill="#eae9e9"> <use xlinkHref="assets/images/sprite.svg#technology"></use></svg>
                        <svg className="svg-13" fill="#eae9e9"> <use xlinkHref="assets/images/sprite.svg#technology2"></use></svg>
                        <svg className="svg-14" fill="#eae9e9"> <use xlinkHref="assets/images/sprite.svg#technology3"></use></svg>
                        <svg className="svg-15" fill="#eae9e9"> <use xlinkHref="assets/images/sprite.svg#technology4"></use></svg>
                        <svg className="svg-16" fill="#eae9e9"> <use xlinkHref="assets/images/sprite.svg#transport"></use></svg>
                    </div>
                    <div className="main_page_hexagon">
                        <svg className="hexagon-1"> <use xlinkHref="assets/images/sprite.svg#hexagon"></use></svg>
                        <svg className="hexagon-2"> <use xlinkHref="assets/images/sprite.svg#hexagon"></use></svg>
                        <svg className="hexagon-3"> <use xlinkHref="assets/images/sprite.svg#hexagon"></use></svg>
                        <svg className="hexagon-4"> <use xlinkHref="assets/images/sprite.svg#hexagon"></use></svg>
                        <svg className="hexagon-5"> <use xlinkHref="assets/images/sprite.svg#hexagon"></use></svg>
                        <svg className="hexagon-6"> <use xlinkHref="assets/images/sprite.svg#hexagon"></use></svg>
                        <svg className="hexagon-7"> <use xlinkHref="assets/images/sprite.svg#hexagon"></use></svg>
                        <svg className="hexagon-8"> <use xlinkHref="assets/images/sprite.svg#hexagon"></use></svg>
                    </div>
                    <div className="main-page-hexagon">
                        <svg className="logo-recovery" fill="#81bad8"> <use xlinkHref="assets/images/sprite.svg#logo"></use></svg>
                    </div>
                    <div className='login-box-inner'>
                        <div>
                            <input
                                type='text'
                                name='email'
                                className='email-recovery'
                                placeholder='Email'
                                value=''
                            />
                        </div>
                        <div className='button-recovery'>
                            <RaisedButton
                                fullWidth={true}
                                primary={true}
                                label="ОТПРАВИТЬ"
                                labelStyle={{fontSize: 20, verticalAlign: 'center'}}
                                buttonStyle={{backgroundColor: '#4c9ad1', height: 63}}
                                overlayStyle={{paddingTop: 12, paddingBottom: 15}}
                                labelPosition="after"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecoveryPassword;

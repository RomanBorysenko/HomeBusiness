import React, {Component} from 'react';
import PropTypes from 'prop-types';
import leftSideBarContainer from '../../containers/LeftSideBarContainer';
import './sideBar.scss';
import TextField from 'material-ui/TextField';

class LeftSideBar extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onClickIcon = (path) => {
        const {onClick} = this.props;
        const {history} = this.context.router;

        onClick(path);
        history.push(`/${path}`);
    };

    render() {
        return (
            <div className="sidebar-usercab">
                <div className="icon-top">
                    <ul className="icon-top-ul">
                        <a href="#">
                            <li className="icon-li-louder">
                                <img src="/assets/images/svg-with-shadow/louder.svg" alt="" className="louder"/>
                                <p><span>Информация</span></p>
                            </li>
                        </a>
                        <a href="#">
                            <li className="icon-li-case">
                                <img src="/assets/images/svg-with-shadow/case.svg" alt="" className="case"/>
                                <p><span>Проекты</span></p>
                            </li>
                        </a>
                        <a href="#">
                            <li className="icon-li-chat">
                                <img src="/assets/images/svg-with-shadow/chat.svg" alt="" className="chat"/>
                                <p><span>Чаты</span></p>
                            </li>
                        </a>
                        <a href="#">
                            <li className="icon-li-storrage">
                                <img src="/assets/images/svg-with-shadow/storrage.svg" alt="" className="storrage"/>
                                <p><span>Хранилище</span></p>
                            </li>
                        </a>
                        <a href="#">
                            <li className="icon-li-clock">
                                <img src="/assets/images/svg-with-shadow/clock.svg" alt="" className="clock"/>
                                <p><span>Трекер</span></p>
                            </li>
                        </a>
                        <a href="#">
                            <li className="icon-li-calendar">
                                <img src="/assets/images/svg-with-shadow/calendar.svg" alt="" className="calendar"/>
                                <p><span>Календарь</span></p>
                            </li>
                        </a>
                    </ul>
                </div>
                <div className="icon-bottom">
                    <ul className="icon-bottom-ul">
                        <a href="#">
                            <li className="icon-li-envelope">
                                <img src="/assets/images/svg-with-shadow/envelope.svg" alt="" className="envelope"/>
                                <p><span>Сообщения</span></p>
                            </li>
                        </a>
                        <a href="#">
                            <li className="icon-li-search">
                                <img src="/assets/images/svg-with-shadow/search.svg" alt="" className="search"/>
                                <span className="search-micro"> <TextField
                                    hintText="Поиск"
                                    floatingLabelText="Введите запрос"
                                    fullWidth={{ width:'300px'}}
                                /></span>
                            </li>
                        </a>
                        <a onClick={() => this.onClickIcon('login')} href="#">
                            <li className="icon-li-logout">
                                <img
                                    src="/assets/images/svg-with-shadow/logout.svg" alt="" className="logout"/>
                                <p><span>Выйти</span></p>
                            </li>
                        </a>
                    </ul>
                </div>
            </div>
        );
    }
}

LeftSideBar.PropTypes = {
    onClick: PropTypes.func
};

export default leftSideBarContainer(LeftSideBar);

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './navBar.scss';

class NavBar extends Component {
    static defaultProps = {
        children: []
    };

    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        const data = this.props.children;
        const {photo} = this.props.profile;

        return (
            <div className="header">
                <div className="header-foto">
                    <img src={photo ||"/assets/images/sprite.svg#hexagon"} alt="" className="header-circle"/>
                </div>
                <div className="header-nav">
                    <ul className="header-nav-ul">
                        {data.map((item)=>(
                            <li key = {item.id} className="header-nav-li">
                                <Link
                                    to={`/${item.link}`}
                                    className="header-nav-a"
                                >
                                    {item.value}
                                </Link>
                                <div className="border-nav"></div>
                            </li>)
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

NavBar.propTypes = {
    children: PropTypes.array
};

const mapStateProps = (state) => {
    return {
        profile: state.getIn(['profileReducer', 'profile']).toJS()
    };
};

export default connect(mapStateProps, null)(NavBar);

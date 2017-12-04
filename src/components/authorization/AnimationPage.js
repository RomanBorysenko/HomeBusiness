import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './animation.scss';

class AnimationPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    static defaultProps = {
        auth: {},
        emailInvalid: false,
        passwordInvalid: false
    };

    render() {

        return (
            <div className="animation-wrap">
                <div className="anim-line"></div>
                <div className="anim-polygon">
                    <svg className="polygon-main">
                        <use xlinkHref="/assets/images/sprite.svg#hexagon"></use>
                    </svg>
                    <div className="hexagon-color-main">
                        <img src="/assets/images/hexagon-color.png" alt="" className="hexagon-color"/>
                    </div>
                </div>
                <div className="anim-form-test">
                </div>
            </div>)
    }
}


export default AnimationPage;

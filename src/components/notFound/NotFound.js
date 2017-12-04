import React from 'react';
import {Route} from 'react-router-dom';
import NavBar from '../navBar/NavBar';

const NavLinks = [
    {id: 0, value: 'Анкета', link: `users/3/cabinet`},
    {id: 1, value: 'Интервью'},
    {id: 2, value: 'Плюшки'}
];

const NotFound = () => {
    return (
        <Route render={({staticContext}) => {
            if (staticContext) {
                staticContext.status = 404;
            }
            return (
                <div>
                    <NavBar>
                        {NavLinks}
                    </NavBar>
                    <h1>404 : Not Found</h1>
                </div>
            );
        }}/>
    );
};

export default NotFound;

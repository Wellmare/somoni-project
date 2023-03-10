import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { Paths } from '../../constants/Paths';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectIsAuth } from '../../redux/slices/authSlice';

interface IPrivateRouteProps {
    children: ReactNode;
    renderTerm: (isAuth: boolean) => boolean;
    pathWhenIncorrect: Paths;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({ children, renderTerm, pathWhenIncorrect }) => {
    const isAuth = useAppSelector(selectIsAuth);

    const isCorrect = renderTerm(isAuth);

    return <>{isCorrect ? children : <Navigate to={'/' + pathWhenIncorrect} />}</>;
};

export default PrivateRoute;

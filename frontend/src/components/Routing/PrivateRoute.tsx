import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/reduxHooks';
import { Paths } from '../../types/Paths';

interface IPrivateRouteProps {
    children: ReactNode;
    renderTerm: (isAuth: boolean) => boolean;
    pathWhenIncorrect: Paths;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({ children, renderTerm, pathWhenIncorrect }) => {
    const isAuth = useAppSelector((state) => state.auth.isAuth);

    const isCorrect = renderTerm(isAuth);

    return <>{isCorrect ? children : <Navigate to={'/' + pathWhenIncorrect} />}</>;
};

export default PrivateRoute;
import { Paths } from 'app/constants/Paths';
import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'shared/hooks';
import { selectIsAuth } from 'shared/store/slices/authSlice';

interface IPrivateRouteProps {
    children: ReactNode;
    renderTerm: (isAuth: boolean) => boolean;
    pathWhenIncorrect: Paths;
}

export const PrivateRoute: FC<IPrivateRouteProps> = ({ children, renderTerm, pathWhenIncorrect }) => {
    const isAuth = useAppSelector(selectIsAuth);

    const isCorrect = renderTerm(isAuth);

    return <>{isCorrect ? children : <Navigate to={'/' + pathWhenIncorrect} />}</>;
};

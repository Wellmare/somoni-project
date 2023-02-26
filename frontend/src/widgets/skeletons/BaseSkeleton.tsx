import { ThemeContext } from 'app/context';
import React, { FC, ReactNode, useContext } from 'react';
import ContentLoader from 'react-content-loader';

import { Theme } from 'shared/types/Theme';

interface IBaseSkeletonProps {
    children: ReactNode;
    [x: string]: any;
}

export const BaseSkeleton: FC<IBaseSkeletonProps> = ({ children, ...props }) => {
    const themeContext = useContext(ThemeContext);

    const theme: Theme = themeContext === null ? Theme.LIGHT : themeContext.theme;

    const backgroundColor = theme === Theme.LIGHT ? '#9f9f9f' : 'rgb(96,96,96)';
    const foregroundColor = theme === Theme.LIGHT ? '#bdbdbd' : '#919191';

    return (
        <ContentLoader speed={2} backgroundColor={backgroundColor} foregroundColor={foregroundColor} {...props}>
            {children}
        </ContentLoader>
    );
};

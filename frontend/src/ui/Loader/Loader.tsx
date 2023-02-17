import classNames from 'classnames';
import React, { FC } from 'react';

import s from './Loader.module.scss';

import { LoaderSize } from '../../types/UI/Loader.types';

interface ILoaderProps {
    size?: LoaderSize;
}

const Loader: FC<ILoaderProps> = ({ size = LoaderSize.md }) => {
    let sizeClass = '';
    switch (size) {
        case LoaderSize.sm:
            sizeClass = s.sm;
            break;
        case LoaderSize.md:
            sizeClass = s.md;
            break;
        case LoaderSize.lg:
            sizeClass = s.lg;
            break;
    }

    return (
        <div className={s.container}>
            <div className={classNames(s.loader, sizeClass)}>
                <svg viewBox='0 0 120 120' version='1.1' xmlns='http://www.w3.org/2000/svg'>
                    <circle className={classNames(s.load, s.one)} cx='60' cy='60' r='40' />
                    <circle className={classNames(s.load, s.two)} cx='60' cy='60' r='40' />
                    <circle className={classNames(s.load, s.three)} cx='60' cy='60' r='40' />
                    <g>
                        <circle className={classNames(s.point, s.one)} cx='45' cy='70' r='5' />
                        <circle className={classNames(s.point, s.two)} cx='60' cy='70' r='5' />
                        <circle className={classNames(s.point, s.three)} cx='75' cy='70' r='5' />
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default Loader;

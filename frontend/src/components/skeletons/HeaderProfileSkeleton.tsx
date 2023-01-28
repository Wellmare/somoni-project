import React, { FC } from 'react';

import BaseSkeleton from './BaseSkeleton';

const HeaderProfileSkeleton: FC = () => {
    return (
        <BaseSkeleton width={150} height={64} viewBox='0 0 150 64' className={'w-auto'}>
            <rect x='179' y='97' rx='6' ry='6' width='200' height='12' />
            <rect x='393' y='97' rx='6' ry='6' width='90' height='12' />
            <rect x='179' y='116' rx='6' ry='6' width='165' height='12' />
            <rect x='180' y='47' rx='6' ry='6' width='211' height='23' />
            <rect x='180' y='135' rx='6' ry='6' width='301' height='12' />
            <rect x='354' y='116' rx='6' ry='6' width='130' height='12' />
            <circle cx='118' cy='33' r='29' />
            <rect x='6' y='15' rx='8' ry='8' width='78' height='13' />
            <rect x='32' y='36' rx='8' ry='8' width='53' height='13' />
        </BaseSkeleton>
    );
};

export default HeaderProfileSkeleton;

import React, { FC } from 'react';

import { BaseSkeleton } from './BaseSkeleton';

export const ProfileInfoSkeleton: FC = () => {
    return (
        <BaseSkeleton width={500} height={180} viewBox='0 0 500 180' className={'w-full mb-5'}>
            <circle cx='87' cy='92' r='73' />
            <rect x='179' y='97' rx='6' ry='6' width='200' height='12' />
            <rect x='393' y='97' rx='6' ry='6' width='90' height='12' />
            <rect x='179' y='116' rx='6' ry='6' width='165' height='12' />
            <rect x='180' y='47' rx='6' ry='6' width='211' height='23' />
            <rect x='180' y='135' rx='6' ry='6' width='301' height='12' />
            <rect x='354' y='116' rx='6' ry='6' width='130' height='12' />
        </BaseSkeleton>
    );
};

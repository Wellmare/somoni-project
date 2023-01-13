import React, { FC } from 'react';
import ContentLoader from 'react-content-loader';

const PostSkeleton: FC = () => {
    return (
        <ContentLoader
            speed={2}
            width={600}
            height={350}
            viewBox='0 0 600 350'
            backgroundColor='#f3f3f3'
            foregroundColor='#ecebeb'
            className={'w-full'}
        >
            <circle cx='28' cy='43' r='25' />
            <rect x='2' y='81' rx='17' ry='17' width='587' height='145' />
            <rect x='2' y='244' rx='6' ry='6' width='301' height='12' />
            <rect x='314' y='244' rx='6' ry='6' width='90' height='12' />
            <rect x='419' y='244' rx='6' ry='6' width='165' height='12' />
            <rect x='88' y='267' rx='6' ry='6' width='301' height='12' />
            <rect x='2' y='267' rx='6' ry='6' width='76' height='12' />
            <rect x='400' y='268' rx='6' ry='6' width='165' height='12' />
            <rect x='2' y='290' rx='6' ry='6' width='301' height='12' />
            <rect x='318' y='290' rx='6' ry='6' width='76' height='12' />
            <rect x='409' y='290' rx='6' ry='6' width='165' height='12' />
            <rect x='88' y='313' rx='6' ry='6' width='301' height='12' />
            <rect x='2' y='313' rx='6' ry='6' width='76' height='12' />
            <rect x='400' y='314' rx='6' ry='6' width='165' height='12' />
            <rect x='3' y='334' rx='6' ry='6' width='301' height='12' />
            <rect x='319' y='335' rx='6' ry='6' width='165' height='12' />
            <rect x='66' y='25' rx='6' ry='6' width='200' height='12' />
            <rect x='68' y='49' rx='6' ry='6' width='101' height='12' />
        </ContentLoader>
    );
};

export default PostSkeleton;

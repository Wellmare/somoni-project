import React, { FC } from 'react';
import ContentLoader from 'react-content-loader';

const PostSkeleton: FC = () => {
    return (
        <ContentLoader
            speed={2}
            width={400}
            height={460}
            viewBox='0 0 400 460'
            backgroundColor='#f3f3f3'
            foregroundColor='#ecebeb'
        >
            <circle cx='28' cy='45' r='25' />
            <rect x='3' y='83' rx='17' ry='17' width='390' height='110' />
            <rect x='3' y='210' rx='6' ry='6' width='200' height='12' />
            <rect x='217' y='210' rx='6' ry='6' width='50' height='12' />
            <rect x='281' y='210' rx='6' ry='6' width='110' height='12' />
            <rect x='61' y='233' rx='6' ry='6' width='200' height='12' />
            <rect x='3' y='233' rx='6' ry='6' width='50' height='12' />
            <rect x='276' y='234' rx='6' ry='6' width='110' height='12' />
            <rect x='3' y='255' rx='6' ry='6' width='200' height='12' />
            <rect x='217' y='255' rx='6' ry='6' width='50' height='12' />
            <rect x='281' y='255' rx='6' ry='6' width='110' height='12' />
            <rect x='61' y='278' rx='6' ry='6' width='200' height='12' />
            <rect x='3' y='278' rx='6' ry='6' width='50' height='12' />
            <rect x='276' y='279' rx='6' ry='6' width='110' height='12' />
            <rect x='4' y='299' rx='6' ry='6' width='200' height='12' />
            <rect x='231' y='299' rx='6' ry='6' width='110' height='12' />
            <rect x='65' y='27' rx='6' ry='6' width='150' height='12' />
            <rect x='67' y='51' rx='6' ry='6' width='100' height='12' />
        </ContentLoader>
    );
};

export default PostSkeleton;

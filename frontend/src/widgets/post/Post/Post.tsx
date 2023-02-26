import { PostContext } from 'app/context';
import React, { FC, useState } from 'react';

import { IEdit } from 'shared/types/IEdit';
import { IPost } from 'shared/types/IPost';

import { Card } from 'shared/ui/Card';

import s from './Post.module.scss';

import { PostTags, PostTitle, PostHeader, PostImage, PostContent, PostButtons } from '../index';

interface ITestPostProps {
    post: IPost;
    limitContentView?: boolean;
}

export const Post: FC<ITestPostProps> = ({ post, limitContentView = false }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const edit: IEdit = {
        setIsEdit,
        isEdit,
    };

    return (
        <PostContext.Provider value={{ post, edit }}>
            <Card className={s.post}>
                <PostHeader />
                <PostTitle />
                <PostContent limitContentView={limitContentView} />
                <PostImage />
                <div className={'mb-3 mt-2'}>
                    <PostTags />
                </div>
                <PostButtons />
            </Card>
        </PostContext.Provider>
    );
};

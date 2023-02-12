import { PostContext } from 'context/PostContext';
import React, { FC, useState } from 'react';

import s from './Post.module.scss';

import { IEdit } from '../../../../types/IEdit';
import { IPost } from '../../../../types/redux/posts/IPost';
import PostButtons from '../PostButtons/PostButtons';
import PostContent from '../PostContent/PostContent';
import PostHeader from '../PostHeader/PostHeader';
import PostImage from '../PostImage/PostImage';
import PostTags from '../PostTags/PostTags';
import PostTitle from '../PostTitle/PostTitle';

interface ITestPostProps {
    post: IPost;
}

const Post: FC<ITestPostProps> = ({ post }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const edit: IEdit = {
        setIsEdit,
        isEdit,
    };

    return (
        <PostContext.Provider value={{ post, edit }}>
            <div className={s.post}>
                <PostHeader />
                <PostTitle />
                <PostContent />
                <PostImage />
                <div className={'mb-3 mt-2'}>
                    <PostTags />
                </div>
                <PostButtons />
            </div>
        </PostContext.Provider>
    );
};

export default Post;

import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import s from './Profile.module.scss';

import { PathsToNavigate } from '../../../constants/Paths';
import { IProfile } from '../../../types/redux/profile/IProfile';
import { ButtonColors, ButtonSizes } from '../../../types/UI/Button.types';
import Button from '../../common/Button/Button';
import Info from '../../common/Info/Info';
import Post from '../../posts/Post/Post';

interface IProfileProps {
    profile: IProfile;
    withEdit?: boolean;
}

const Profile: FC<IProfileProps> = ({ profile, withEdit = false }) => {
    const { bio, username, photo, results: posts } = profile;
    const navigate = useNavigate();

    return (
        <div>
            <div className={s.avatar}>{photo !== null && <img src={photo} alt='profile photo' />}</div>
            {username}
            {bio}
            {withEdit && (
                <Button
                    color={ButtonColors.green}
                    size={ButtonSizes.md}
                    width={'100%'}
                    onClick={() => navigate(PathsToNavigate.EDIT_PROFILE)}
                >
                    Edit profile
                </Button>
            )}
            {posts !== null && posts.length > 0 ? (
                posts.map((post) => <Post post={post} key={post.id} />)
            ) : (
                <Info>Постов пока нет</Info>
            )}
        </div>
    );
};

export default Profile;

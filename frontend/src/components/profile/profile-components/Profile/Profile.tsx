import React, { FC } from 'react';

import { ProfileContext } from '../../../../context/ProfileContext';
import { IPaginatedProfileResponse } from '../../../../types/redux/profile/IPaginatedProfileResponse';
import { enhanceIProfileServerResponse } from '../../../../utils/enhanceIProfileServerResponse';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfilePosts from '../ProfilePosts/ProfilePosts';

interface IProfileProps {
    profile: IPaginatedProfileResponse;
}

const Profile: FC<IProfileProps> = ({ profile }) => {
    const { profile: enhancedProfile, posts } = enhanceIProfileServerResponse(profile);

    return (
        <ProfileContext.Provider value={{ profile: enhancedProfile, posts }}>
            <div>
                {/* <div className={s.avatar}>{photo !== null && <img src={photo} alt='profile photo' />}</div> */}
                {/* <Avatar size={AvatarSize.large}> */}
                {/*     <img src={photo} alt={username} /> */}
                {/* </Avatar> */}
                {/* {username} */}
                {/* {bio} */}
                {/* {withEdit && ( */}
                {/*     <Button */}
                {/*         color={ButtonColors.green} */}
                {/*         size={ButtonSizes.md} */}
                {/*         width={'100%'} */}
                {/*         onClick={() => navigate(PathsToNavigate.EDIT_PROFILE)} */}
                {/*     > */}
                {/*         Edit profile */}
                {/*     </Button> */}
                {/* )} */}
                {/* {posts !== null && posts.length > 0 ? ( */}
                {/*     posts.map((post) => <Post post={post} key={post.id} />) */}
                {/* ) : ( */}
                {/*     <Info>Постов пока нет</Info> */}
                {/* )} */}
                <ProfileHeader />
                <ProfilePosts />
            </div>
        </ProfileContext.Provider>
    );
};

export default Profile;

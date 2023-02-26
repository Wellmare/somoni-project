import { IUserServerResponse } from 'shared/api/user/types/IUserServerResponse';
import { IUser } from 'shared/types/IUser';

export const enhanceIUserServerResponse = (userServerResponse: IUserServerResponse): IUser => {
    const { username, photo, id } = userServerResponse;

    return {
        username,
        profileId: id.toString(),
        avatarLink: photo,
    };
};

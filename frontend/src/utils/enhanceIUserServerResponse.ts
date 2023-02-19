import { IUser } from '../types/redux/profile/IUser';
import { IUserServerResponse } from '../types/redux/profile/IUserServerResponse';

export const enhanceIUserServerResponse = (userServerResponse: IUserServerResponse): IUser => {
    const { username, photo, id } = userServerResponse;

    return {
        username,
        profileId: id.toString(),
        avatarLink: photo,
    };
};

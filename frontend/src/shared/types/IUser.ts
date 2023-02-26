import { IProfile } from 'shared/types/IProfile';

export type IUser = Pick<IProfile, 'profileId' | 'avatarLink' | 'username'>;

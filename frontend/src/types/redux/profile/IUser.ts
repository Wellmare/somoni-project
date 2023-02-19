import { IProfile } from './IProfile';

export type IUser = Pick<IProfile, 'profileId' | 'avatarLink' | 'username'>;

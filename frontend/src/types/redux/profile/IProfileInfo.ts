import { IProfile } from './IProfile';

// export interface IProfileInfo {
//     username: string;
//     photo: Link;
//     bio: string | null;
//     email: string | null;
//     isMyProfile: boolean;
//     // id: string;
// }

export type IProfileInfo = Omit<IProfile, 'next' & 'previous' & 'count' & 'results'>;

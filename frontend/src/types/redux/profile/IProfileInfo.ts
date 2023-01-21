import { IPaginatedProfileResponse } from './IPaginatedProfileResponse';

// export interface IProfileInfo {
//     username: string;
//     photo: Link;
//     bio: string | null;
//     email: string | null;
//     isMyProfile: boolean;
//     // id: string;
// }

export type IProfileInfo = Omit<IPaginatedProfileResponse, 'next' & 'previous' & 'count' & 'results'>;

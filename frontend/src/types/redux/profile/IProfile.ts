export interface IProfile {
    username: string;
    avatarLink: string;
    bio: string | null;
    email?: string;
    isMyProfile: boolean;
    profileId: string;
}

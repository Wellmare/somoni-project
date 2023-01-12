import {
    ChangePasswordPage,
    CreatePostPage,
    LoginPage,
    MainPage,
    PostPage,
    ProfilePage,
    RegisterPage,
    RestorePasswordPage,
    WelcomePage,
} from '../pages';
import EditProfilePage from '../pages/EditProfilePage/EditProfilePage';
import PostsByTagPage from '../pages/PostsByTagPage/PostsByTagPage';
import UserPage from '../pages/UserPage/UserPage';
import { IRouteData } from '../types/IRouteData';
import { Paths } from '../types/Paths';

export const routingData: IRouteData[] = [
    {
        path: Paths.LOGIN,
        Element: LoginPage,
        withAuth: false,
    },
    {
        path: Paths.WELCOME,
        Element: WelcomePage,
        withAuth: false,
    },
    {
        path: Paths.REGISTER,
        Element: RegisterPage,
        withAuth: false,
    },
    {
        path: Paths.PROFILE,
        Element: ProfilePage,
        withAuth: true,
    },
    {
        path: `${Paths.USER}/:id`,
        Element: UserPage,
    },
    {
        path: Paths.MAIN,
        Element: MainPage,
    },
    {
        path: `${Paths.TAG}/:tag`,
        Element: PostsByTagPage,
    },
    {
        path: `${Paths.POST}/:id`,
        Element: PostPage,
    },
    {
        path: `${Paths.EDIT_PROFILE}`,
        Element: EditProfilePage,
        withAuth: true,
    },
    {
        path: Paths.CREATE_POST,
        Element: CreatePostPage,
        withAuth: true,
    },
    {
        path: Paths.RESTORE_PASSWORD,
        Element: RestorePasswordPage,
        withAuth: false,
    },
    {
        path: Paths.CHANGE_PASSWORD,
        Element: ChangePasswordPage,
        withAuth: true,
    },
];

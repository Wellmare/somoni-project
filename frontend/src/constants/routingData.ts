import {
    ChangePasswordPage,
    LoginPage,
    MainPage,
    PostPage,
    ProfilePage,
    RegisterPage,
    RestorePasswordPage,
    WelcomePage,
} from '../pages';
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
        path: `${Paths.PROFILE}/:id`,
        Element: ProfilePage,
    },
    {
        path: Paths.MAIN,
        Element: MainPage,
    },
    {
        path: `${Paths.POST}/:id`,
        Element: PostPage,
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

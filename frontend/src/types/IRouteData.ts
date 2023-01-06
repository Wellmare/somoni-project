import { FC } from 'react';

export interface IRouteData {
    path: string;
    Element: FC;
    withAuth?: boolean;
}

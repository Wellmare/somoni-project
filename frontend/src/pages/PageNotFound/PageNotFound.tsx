import { PathsToNavigate } from 'app/constants/Paths';

import React, { FC } from 'react';

import { ButtonColors } from 'shared/ui/Button';
import { ButtonLink } from 'shared/ui/ButtonLink';

import s from './PageNotFound.module.scss';

export const PageNotFound: FC = () => {
    return (
        <div className={`text-center flex justify-center items-center ${s.container}`}>
            <div>
                <h1 className={s.h1}>404</h1>
                <p className={s.p}>Страница не найдена :(</p>
                <div className={'mt-5'}>
                    <ButtonLink color={ButtonColors.green} linkTo={PathsToNavigate.MAIN}>
                        На главную
                    </ButtonLink>
                </div>
            </div>
        </div>
    );
};

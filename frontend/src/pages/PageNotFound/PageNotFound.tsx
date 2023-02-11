import React, { FC } from 'react';

import s from './PageNotFound.module.scss';

import { PathsToNavigate } from '../../constants/Paths';
import { ButtonColors } from '../../types/UI/Button.types';
import ButtonLink from '../../ui/ButtonLink/ButtonLink';

const PageNotFound: FC = () => {
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

export default PageNotFound;

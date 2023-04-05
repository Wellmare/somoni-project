import { PathsToNavigate } from 'app/constants/Paths';
import WelcomeImg from 'assets/svg/welcome.png';
import classNames from 'classnames';

import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonColors } from 'shared/ui/Button';

import s from './WelcomePage.module.scss';

export const WelcomePage: FC = () => {
    return (
        <div className={classNames('w-screen cont')}>
            <div className={'text-right mr-5 mt-5'}>
                <Link to={PathsToNavigate.MAIN}>Пропустить</Link>
                {/* <ButtonLink color={ButtonColors.green} linkTo={PathsToNavigate.MAIN}> */}
                {/*    Пропустить */}
                {/* </ButtonLink> */}
            </div>
            <div className={classNames(s.flex)}>
                <img src={WelcomeImg} alt='welcome' className={'h-56 mx-auto object-contain'} />
                <div className={'text-center mt-5 mb-5'}>
                    <h1 className={classNames('font-bold', s.h1)}>Добро пожаловать!</h1>
                    <h3>Читай там, где удобно!</h3>
                </div>

                <div
                    className={classNames(
                        'flex justify-center flex-col items-center mx-auto',
                        'w-11/12',
                        'sm:w-6/12',
                        'md:w-9/12',
                        'lg:w-7/12',
                        'xl:w-6/12',
                        s.maxWidth,
                    )}
                >
                    <Link to={PathsToNavigate.LOGIN} className={'w-full h-full'}>
                        <Button color={ButtonColors.green} className={'w-full py-2 md:py-3 mb-3 md:mb-4'}>
                            Войти
                        </Button>
                    </Link>
                    <Link to={PathsToNavigate.REGISTER} className={'w-full h-full'}>
                        <Button color={ButtonColors.blue} className={'w-full py-2 md:py-3'}>
                            Зарегистрироваться
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

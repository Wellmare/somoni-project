import classNames from 'classnames';
import React, { FC } from 'react';

import s from './Welcome.module.css';

const Welcome: FC = () => {
    return (
        <section className={classNames(s.section)}>
            <p>Пропустить</p>
            <div className={classNames('flex-cont')}>
                <div className={classNames('content')}>
                    <h1>Привет!</h1>
                    <h3>Читай там, где удобно!</h3>
                    <button>Войти</button>
                    <button>Регистрация</button>
                </div>
            </div>
        </section>
    );
};

export default Welcome;

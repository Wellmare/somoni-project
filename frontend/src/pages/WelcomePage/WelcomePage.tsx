import classNames from 'classnames';
import React, { FC } from 'react';

const WelcomePage: FC = () => {
    return (
        <section className={classNames()}>
            <p>Пропустить</p>
            <div className={classNames('flex', 'justify-center')}>
                <div className={classNames('content')}>
                    <h1>Привет!</h1>
                    <h3>Читай там, где удобно!</h3>
                    {/* <button>Войти</button> */}
                    {/* <button>Регистрация</button> */}
                </div>
            </div>
        </section>
    );
};

export default WelcomePage;

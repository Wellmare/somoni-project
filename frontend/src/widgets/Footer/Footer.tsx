import classNames from 'classnames';
import React, { FC } from 'react';

import s from 'widgets/Footer/Footer.module.scss';

export const Footer: FC = () => {
    return (
        <footer className={classNames('p-5', 'w-full', 'mt-7', 'bg-gray-600', 'text-center', s.footer)}>
            <small className={'text-sm'}>Ҳамаи ҳуқуқҳо маҳфузанд. Истифодаи матлабҳо бо зикри манбаъ иҷозат аст!</small>
        </footer>
    );
};

import classNames from 'classnames';
import React, { FC } from 'react';

import s from './Footer.module.scss';

const Footer: FC = () => {
    return (
        <footer className={classNames('p-5', 'w-full', 'mt-7', 'bg-gray-600', 'text-center', s.footer)}>
            Ҳамаи ҳуқуқҳо маҳфузанд. Истифодаи матлабҳо бо зикри манбаъ иҷозат аст!
        </footer>
    );
};

export default Footer;

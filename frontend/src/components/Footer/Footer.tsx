import classNames from 'classnames';
import React, { FC } from 'react';

import s from './Footer.module.scss';

const Footer: FC = () => {
    return <footer className={classNames('p-5', 'w-full', 'mt-7', 'bg-gray-600', s.footer)}>footer</footer>;
};

export default Footer;

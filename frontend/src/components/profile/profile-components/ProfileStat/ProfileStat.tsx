import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import s from './ProfileStat.module.scss';

interface IProfileStatProps {
    statName: string;
    stat: string | number;
    link?: string;
    className?: string;
}

const ProfileStat: FC<IProfileStatProps> = ({ statName, stat, link, className }) => {
    return (
        <>
            {link !== undefined ? (
                <Link to={link}>
                    <div className={`flex flex-col justify-center items-center ${className ?? ''}`}>
                        <div className={s.stat}>{stat}</div>
                        <div className={s.statName}>{statName}</div>
                    </div>
                </Link>
            ) : (
                <div className={`flex flex-col justify-center items-center ${className ?? ''}`}>
                    <div className={s.stat}>{stat}</div>
                    <div className={s.statName}>{statName}</div>
                </div>
            )}
        </>
    );
};

export default ProfileStat;

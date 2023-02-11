import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import Error from '../../ui/Error/Error';

const ConfirmEmailPag: FC = () => {
    const { token1, token2 } = useParams<{ token1: string; token2: string }>();
    if (token1 === undefined || token2 === undefined) return <Error>Токены не найдены!</Error>;

    console.log(token1, token2);

    return <div></div>;
};

export default ConfirmEmailPag;

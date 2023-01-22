import React, { FC } from 'react';

import Error from '../../../ui/Error/Error';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

interface IErrors {
    [x: string]: string[];
}

export interface IErrorsFromDataProps {
    errorsData: unknown;
}

export const ErrorsFromData: FC<IErrorsFromDataProps> = ({ errorsData }) => {
    const errors = errorsData as IErrors;

    return (
        <>
            {Object.entries(errors).map(([key, value]) => (
                <Error key={key}>{capitalizeFirstLetter(value[0])}</Error>
            ))}
        </>
    );
};

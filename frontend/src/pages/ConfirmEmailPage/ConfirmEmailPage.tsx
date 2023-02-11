import React, { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ErrorsFromData } from '../../components/server/ErrorsFromData/ErrorsFromData';
import ServerResponse from '../../components/server/ServerResponse/ServerResponse';
import { PathsToNavigate } from '../../constants/Paths';
import { useConfirmEmailMutation } from '../../service/authApiSlice';
import { ButtonColors } from '../../types/UI/Button.types';
import Button from '../../ui/Button/Button';
import Error from '../../ui/Error/Error';
import Success from '../../ui/Success/Success';
import { doAsyncFunc } from '../../utils/doAsyncFunc';

const ConfirmEmailPage: FC = () => {
    const { token1, token2 } = useParams<{ token1: string; token2: string }>();
    if (token1 === undefined || token2 === undefined) return <Error>Токены не найдены!</Error>;

    console.log(token1, token2);
    const [confirmEmail, { isError, isLoading, isSuccess, error, data }] = useConfirmEmailMutation();

    useEffect(() => {
        doAsyncFunc(async () => {
            try {
                await confirmEmail({ token1, token2 }).unwrap();
            } catch (e) {
                console.log(e);
            }
        });
    }, []);

    return (
        <>
            <ServerResponse
                responseError={error}
                isError={isError}
                isLoading={isLoading}
                isSuccess={isSuccess}
                messages={[
                    {
                        statusCode: 401,
                        message: 'Ключи не валидны',
                    },
                ]}
            >
                <Success>Почта успешно подтверждена!</Success>
                <Link to={PathsToNavigate.MAIN}>
                    <Button color={ButtonColors.green}>На главную</Button>
                </Link>
            </ServerResponse>
        </>
    );
};

export default ConfirmEmailPage;

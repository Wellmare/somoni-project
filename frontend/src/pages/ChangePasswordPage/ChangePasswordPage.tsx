import React, { FC } from 'react';

import ServerResponse from '../../components/server/ServerResponse/ServerResponse';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectTokens } from '../../redux/slices/authSlice';
import { useChangePasswordMutation } from '../../service/authApiSlice';
import { doAsyncFunc } from '../../utils/doAsyncFunc';

const ChangePasswordPage: FC = () => {
    const [changePassword, { isSuccess, error, isError, isLoading }] = useChangePasswordMutation();
    const refresh = useAppSelector(selectTokens)?.refresh;
    const onChange = (): void => {
        if (refresh == null) return;

        doAsyncFunc(async () => {
            await changePassword({
                password: 'tear12?SOMONI',
                password2: 'tear12?SOMONI',
                oldPassword: 'tear12?SOM',
                refresh,
            });
        });
    };

    return (
        <div>
            <button onClick={onChange}>change</button>
            <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                password changed
            </ServerResponse>
        </div>
    );
};

export default ChangePasswordPage;

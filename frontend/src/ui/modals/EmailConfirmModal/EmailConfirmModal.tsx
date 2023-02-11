import classNames from 'classnames';
import React, { FC } from 'react';

import ReactModal from 'react-modal';

import { Link } from 'react-router-dom';

import ServerResponse from '../../../components/server/ServerResponse/ServerResponse';
import { PathsToNavigate } from '../../../constants/Paths';
import { useSendConfirmEmailMutation } from '../../../service/authApiSlice';
import { ButtonColors, ButtonSizes } from '../../../types/UI/Button.types';
import { doAsyncFunc } from '../../../utils/doAsyncFunc';
import Button from '../../Button/Button';
import Success from '../../Success/Success';
import s from '../Alert/Alert.module.scss';

interface IEmailConfirmModalProps {
    required?: boolean;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const EmailConfirmModal: FC<IEmailConfirmModalProps> = ({ required = true, isOpen, setIsOpen }) => {
    const [sendEmail, { isSuccess, error, isError, isLoading }] = useSendConfirmEmailMutation();

    const onSuccess = (): void => {
        // setIsOpen(false);
        console.log('send');
        doAsyncFunc(async () => {
            await sendEmail(null);
        });
    };

    return (
        <>
            <ReactModal
                isOpen={isOpen}
                overlayClassName={s.overlay}
                className={s.modal}
                bodyOpenClassName={s.body}
                appElement={document.body}
            >
                <div className={classNames('flex', 'justify-between', 'items-center', s.alertHeader)}>
                    <h3 className={s.title}>Подтвердите вашу почту</h3>
                    {!required && (
                        <button onClick={() => setIsOpen(false)} className={classNames('cursor-pointer')}>
                            &#10006;
                        </button>
                    )}
                </div>
                <div className={s.content}>
                    <p className={s.text}>
                        После нажатия на кнопку вам должно прийти письмо на вашу почту, нажмите на ссылку в письме и
                        подтвердите почту. <br /> Без подтверждения почты вы{' '}
                        <i>не сможете создавать посты и писать комментарии</i>
                    </p>
                    <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                        <Success>Письмо отправлено</Success>
                    </ServerResponse>
                    <div className={classNames('mt-3', 'flex', 'justify-end', 'items-center')}>
                        {required ? (
                            <Link to={PathsToNavigate.MAIN}>
                                <Button
                                    color={ButtonColors.gray}
                                    size={ButtonSizes.sm}
                                    onClick={() => setIsOpen(false)}
                                    className={'mr-3'}
                                >
                                    На главную
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                color={ButtonColors.gray}
                                size={ButtonSizes.sm}
                                onClick={() => setIsOpen(false)}
                                className={'mr-3'}
                            >
                                Нет
                            </Button>
                        )}
                        <Button color={ButtonColors.green} size={ButtonSizes.sm} onClick={onSuccess}>
                            Отправить письмо
                        </Button>
                    </div>
                </div>
            </ReactModal>
        </>
    );
};

export default EmailConfirmModal;

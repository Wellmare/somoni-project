import classNames from 'classnames';
import React, { FC } from 'react';

import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';

import { PathsToNavigate } from '../../../constants/Paths';
import { ButtonColors, ButtonSizes } from '../../../types/UI/Button.types';
import Button from '../../Button/Button';
import s from '../Alert/Alert.module.scss';

interface IEmailSendedModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const EmailSendedModal: FC<IEmailSendedModalProps> = ({ setIsOpen, isOpen }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            overlayClassName={s.overlay}
            className={s.modal}
            bodyOpenClassName={s.body}
            appElement={document.body}
        >
            <div className={classNames('flex', 'justify-between', 'items-center', s.alertHeader)}>
                <h3 className={s.title}>Письмо отправлено вам на почту</h3>
            </div>
            <div className={s.content}>
                <p className={s.text}>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Обязательно проверьте папку "Спам" на почте!. Нажмите на ссылку в письме и подтвердите почту. <br />{' '}
                    Без подтверждения почты вы <i>не сможете создавать посты и писать комментарии</i>
                </p>
                <div className={classNames('mt-3', 'flex', 'justify-end', 'items-center')}>
                    <Link to={PathsToNavigate.MAIN}>
                        <Button color={ButtonColors.green} size={ButtonSizes.sm} onClick={() => setIsOpen(false)}>
                            Ок
                        </Button>
                    </Link>
                </div>
            </div>
        </ReactModal>
    );
};

export default EmailSendedModal;

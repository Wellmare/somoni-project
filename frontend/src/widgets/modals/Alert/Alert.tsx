import classNames from 'classnames';
import React, { FC } from 'react';
import ReactModal from 'react-modal';

import { Button, ButtonColors, ButtonSizes } from 'shared/ui/Button';

import s from '../Modal.module.scss';

interface IAlertDeleteProps {
    title: string;
    text: string;
    isOpen: boolean;
    onSuccess: () => void;
    onClose: () => void;
    buttonText: string;
}

export const Alert: FC<IAlertDeleteProps> = ({ text, title, onSuccess, isOpen, onClose, buttonText }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            overlayClassName={s.overlay}
            className={s.modal}
            bodyOpenClassName={s.body}
            appElement={document.body}
        >
            <div className={classNames('flex', 'justify-between', 'items-center', s.alertHeader)}>
                <h3 className={s.title}>{title}</h3>
                <button onClick={onClose} className={classNames('cursor-pointer')}>
                    &#10006;
                </button>
            </div>
            <div className={s.content}>
                <p className={s.text}>{text}</p>
                <div className={classNames('mt-3', 'flex', 'justify-end', 'items-center')}>
                    <Button color={ButtonColors.gray} size={ButtonSizes.sm} onClick={onClose} className={'mr-3'}>
                        Нет
                    </Button>
                    <Button color={ButtonColors.red} size={ButtonSizes.sm} onClick={onSuccess}>
                        {buttonText}
                    </Button>
                </div>
            </div>
        </ReactModal>
    );
};

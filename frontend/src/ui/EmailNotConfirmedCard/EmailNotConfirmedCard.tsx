import React, { FC, useState } from 'react';

import { ButtonColors, ButtonSizes } from '../../types/UI/Button.types';
import Button from '../Button/Button';
import Card from '../Card/Card';
import EmailConfirmModal from '../modals/EmailConfirmModal/EmailConfirmModal';

// interface IEmailNotConfirmedCardProps {
//
// }

const EmailNotConfirmedCard: FC /* <IEmailNotConfirmedCardProps> */ = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <EmailConfirmModal isOpen={isOpen} setIsOpen={setIsOpen} required={false} />
            <Card className={'flex justify-between items-center flex-wrap'}>
                <h2>Ваш email не подтвержден</h2>
                <Button color={ButtonColors.blue} size={ButtonSizes.sm} onClick={() => setIsOpen(true)}>
                    Подтвердить
                </Button>
            </Card>
        </>
    );
};

export default EmailNotConfirmedCard;

import React, { FC, useState } from 'react';

import { Button, ButtonColors, ButtonSizes } from 'shared/ui/Button';
import { Card } from 'shared/ui/Card';
import { EmailConfirmModal } from 'widgets/modals/EmailConfirmModal';

// interface IEmailNotConfirmedCardProps {
//
// }

export const EmailNotConfirmedCard: FC /* <IEmailNotConfirmedCardProps> */ = () => {
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

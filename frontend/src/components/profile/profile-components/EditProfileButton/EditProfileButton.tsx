import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { PathsToNavigate } from '../../../../constants/Paths';
import { ButtonColors, ButtonSizes } from '../../../../types/UI/Button.types';
import Button from '../../../common/Button/Button';

const EditProfileButton: FC = () => {
    const navigate = useNavigate();

    return (
        <Button
            color={ButtonColors.green}
            size={ButtonSizes.md}
            width={'100%'}
            onClick={() => navigate(PathsToNavigate.EDIT_PROFILE)}
        >
            Edit profile
        </Button>
    );
};

export default EditProfileButton;

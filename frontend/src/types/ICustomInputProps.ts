import { Control } from 'react-hook-form';

import { IInputProps } from '../components/common/FormInput/FormInput';

export interface ICustomInputProps extends Partial<IInputProps> {
    control: Control<any>;
    name?: string;
}

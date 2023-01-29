import { Control } from 'react-hook-form';

import { IInputProps } from '../components/forms/inputs/FormInput/FormInput';

export interface ICustomInputProps extends Partial<IInputProps> {
    control: Control<any>;
    name?: string;
    [prop: string]: any;
}

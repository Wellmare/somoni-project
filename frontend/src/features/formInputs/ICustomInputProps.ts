import { IInputProps } from 'entities/inputs';
import { Control } from 'react-hook-form';

export interface ICustomInputProps extends Partial<IInputProps> {
    control: Control<any>;
    name?: string;
    [prop: string]: any;
}

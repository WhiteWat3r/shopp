export interface IInput {
    type: 'text' | 'checkbox' | 'number' | '';
    mode: 'primary' | 'secondary' | 'checkbox' | 'tertiary' | 'listItem';
    onChange?: any;
    validation?: any;
    id: string;
    labelText: string;
    checked?: boolean;
}
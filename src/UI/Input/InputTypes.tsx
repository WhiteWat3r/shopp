export interface IInput {
    type: 'text' | 'checkbox' | 'number' | 'password' |'';
    mode: 'primary' | 'secondary' | 'checkbox' | 'tertiary' | 'listItem' | 'profileInput';
    onChange?: any;
    validation?: any;
    id: string;
    labelText?: string;
    checked?: boolean;
    visible?: boolean;
    onButtonClick?: () => void;
}
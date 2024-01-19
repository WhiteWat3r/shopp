export interface ILikeButton {
    children: any;
    onClick: () => void;
    active: boolean;
    type: 'button' | 'submit';
    isDisabled: boolean;
}
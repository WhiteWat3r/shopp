import React from "react";

export interface iButton {
    onClick?: any;
    type?: 'button' | 'submit';
    children: React.ReactNode | string;
    isDisabled: boolean;
    mode: 'primary' | 'secondary' | 'like';
}
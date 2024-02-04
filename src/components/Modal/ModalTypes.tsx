export interface IModalProps {
    handleConfirm?: () => void;
    header?: string;
    text?: string;
    handleClose: () => void;
    isScreenSlider?: boolean;
    screens?: string[];
    initialSlide?: number;
}
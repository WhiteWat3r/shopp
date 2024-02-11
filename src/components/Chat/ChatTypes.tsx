import { IMessage } from "../../types/gameTypes";

export interface IChatProps {
    currentDialog?: IMessage[] | null;
    header: string;
    type: 'admin' | 'user'
}
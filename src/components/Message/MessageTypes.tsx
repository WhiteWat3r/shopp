import { IMessage } from "../../types/gameTypes";

export interface IMesasageProps {
  message: IMessage;
  type: 'admin' | 'user'
}

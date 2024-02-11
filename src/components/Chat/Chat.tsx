import { useAppSelector } from '../../services/store';
import style from './Chat.module.scss';
import { Message } from '../Message/Message';
import { Button } from '../../UI/Button/Button';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useSendToAdminMutation, useSendToUserMutation } from '../../api/supportApi';
import { IChatProps } from './ChatTypes';
import { IMessage } from '../../types/gameTypes';

export const Chat = ({ currentDialog, header, type }: IChatProps) => {
  const [sendToSupport] = useSendToAdminMutation();
  const [sendToUser] = useSendToUserMutation();

  const userChat = useAppSelector((store) => store.user.user.dialog?.messages);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (currentDialog) {
      setMessages(currentDialog);
    } else {
      setMessages(userChat);
    }
  }, [currentDialog, userChat]);

  const messageListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    type === 'user'
      ? await sendToSupport({ content: inputValue })
      : await sendToUser({ dialogId: messages[0].dialogId, content: inputValue });

    setInputValue('');
  };

  return (
    <div className={style.chat}>
      <h2 className={style.chat__header}>{header}</h2>

      {currentDialog === null ? (
        <span className={style.chat__notification}>Выберите пользователя, чтобы написать</span>
      ) : (
        <>
          <div className={style.chat__container}>
            <ul className={style.chat__messageList + ' custom-scroll'} ref={messageListRef}>
              {messages &&
                messages.map((message) => (
                  <Message type={type} key={message.id} message={message} />
                ))}
            </ul>
          </div>

          <form className={style.chat__inputContainer} onSubmit={handleSendMessage}>
            <input
              className={style.chat__input}
              placeholder={'Написать'}
              type={'text'}
              id={'chat'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className={style.chat__buttonContainer}>
              <Button isDisabled={!inputValue} mode={'primary'} type={'submit'}>
                Отправить
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

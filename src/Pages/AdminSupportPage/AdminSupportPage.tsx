import style from './AdminSupportPage.module.scss';
import { Chat } from '../../components/Chat/Chat';
import { useGetChatWithUsersQuery } from '../../api/supportApi';
import { IDialog, IMessage } from '../../types/gameTypes';
import { config } from '../../utils/config';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export const AdminSupportPage = () => {
  const { data: dialogs } = useGetChatWithUsersQuery('');

  // const chatUsers = dialogs.data.map(dialog => {
  //     // const user = dialog.users.find(user => user.role !== 'ADMIN')
  //     return dialog.users[0]
  // })

  const [currentDialog, setCurrentDialog] = useState<IMessage[] | null>(null);
  const [numberDialog, setNumberDialog] = useState(0);

  useEffect(() => {
    dialogs && setCurrentDialog(dialogs[numberDialog]?.messages);
  }, [dialogs]);

  const handleSetDialog = (messages: IMessage[], index: number) => {
    setCurrentDialog(messages);
    setNumberDialog(index);
  };

  // console.log(dialogs, 'dialogs');

  // console.log(currentDialog, 'currentDialog');

  return (
    <section className={style.page}>
      {dialogs && (
        <ul className={style.dialogs}>
          {dialogs?.map((dialog: IDialog, index: number) => (
            <li
              className={classNames(style.dialog, index === numberDialog && style.dialog_active)}
              onClick={() => handleSetDialog(dialog?.messages, index)} key={dialog.id}>
              <div className={style.dialog__avatarContainer}>
                {dialog.users[0]?.photo ? (
                  <img
                    className={style.dialog__img}
                    src={config.baseUrl + '/' + dialog.users[0]?.photo}
                    alt="Аватар"
                  />
                ) : (
                  <span className={style.dialog__initial}>
                    {dialog.users[0]?.nickname?.slice(0, 1).toUpperCase() ||
                      dialog.users[0]?.email?.slice(0, 1).toUpperCase()}
                  </span>
                )}
              </div>

              <span>{dialog.users[0]?.nickname || dialog.users[0]?.email}</span>
            </li>
          ))}
        </ul>
      )}

      <div className={style.page__chatContainer}>
        <Chat currentDialog={currentDialog} header={'Поддержка'} type={'admin'} />
      </div>
    </section>
  );
};

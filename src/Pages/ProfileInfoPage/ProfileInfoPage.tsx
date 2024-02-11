import style from './ProfileInfoPage.module.scss';
import { ProfileChangeForm } from '../../components/ProfileChangeForm/ProfileChangeForm';
import { ChangeEmailAndPasswordForm } from '../../components/ChangeEmailAndPasswordForm/ChangeEmailAndPasswordForm';

export const ProfileInfoPage = () => {
  return (
    <div className={style.info}>
      <ProfileChangeForm />
      <ChangeEmailAndPasswordForm type="password" />
      <ChangeEmailAndPasswordForm type="email" />
    </div>
  );
};

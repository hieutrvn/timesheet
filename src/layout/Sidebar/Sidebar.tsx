import React, { useEffect } from 'react';
import styles from './Sidebar.module.scss';
import logo from 'src/assets/img/logo.png';
import avt from 'src/assets/img/avatars/avatar.jpg';
import picon from 'src/assets/icons/ic_analytics.svg';
import licon from 'src/assets/icons/ic_lock.svg';
import { Link, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, logoutAction } from 'src/redux/actions/authen';
import { stateType } from 'src/features/Login/type';

function Sidebar (): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state: stateType) => state?.authen?.profile);
  useEffect(() => {
    void (async () => {
      dispatch(await fetchProfile());
    })();
  }, [dispatch]);
  const handleLogout = async (): Promise<void> => {
    dispatch(await logoutAction());
    navigate('/');
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <div className={styles.logout} onClick={handleLogout as React.MouseEventHandler<HTMLDivElement>}>Logout</div>
    }
  ];
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="" />
        <Link to='/project/list' className={styles.content}>
                    Timesheet
        </Link>
      </div>
      {profile !== null && (
        <Dropdown menu={{ items }} placement="bottom" arrow>
          <div className={styles.user}>
            <img src={avt} alt="" />
            <p >Hello! {profile.name}</p>
          </div>
        </Dropdown>
      )}
      <ul>
        <li>
          <Link to='/project/list' className={`${styles.item} ${styles.activeSidebar}`}>
            <img src={picon} alt="" />
            <p>Projects</p>
          </Link>
        </li>
        <li>
          <Link to='/' className={styles.item}>
            <img src={licon} alt="" />
            <p>Login</p>
          </Link>
        </li>
      </ul>

    </div>
  );
}

export default Sidebar;

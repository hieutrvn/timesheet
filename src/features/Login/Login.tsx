import React from 'react';
import styles from './Login.module.scss';
import img from 'src/assets/img/login.png';
import logo from 'src/assets/img/logo.png';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { LoginFormInput } from './type';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProfile, loginAction } from 'src/redux/actions/authen';
import { toast } from 'react-toastify';

const FormSchema = z.object({
  userNameOrEmailAddress: z.string({
    required_error: 'Username is required!'
  }),
  password: z.string({
    required_error: 'Password is required!'
  })
});

function Login (): JSX.Element {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInput>({
    resolver: zodResolver(FormSchema)
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      const res = dispatch(await loginAction(data));
      console.log(res);
      if (res.type !== '') {
        dispatch(await fetchProfile());
        navigate('/project/list');
      }
    } catch (e) {
      toast.error('Can not Login !!!');
    }
  };
  return (
    <div className={styles.login}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <h3>Welcome to TimeSheet</h3>
        <img src={img} alt="Error" />
      </div>
      <div className={styles.right}>
        <div className={styles.contrainer}>
          <div className={styles.header}>
            <h2>Sign in</h2>
            <p>Don’t have an account? <a href="#">Get started</a>
            </p>
          </div>
          <div className={styles.info}>
            <form className={styles.form} onSubmit={handleSubmit(handleLogin) as React.FormEventHandler<HTMLFormElement>} >
              <label className={styles.label} >
                <Controller
                  name="userNameOrEmailAddress"
                  control={control}
                  render={({ field }) => <TextField {...field} label="Username or Email" fullWidth />}
                />
                {((errors?.userNameOrEmailAddress) != null) && (
                  <div className={styles.error}>
                    {errors?.userNameOrEmailAddress?.message}
                  </div>
                )}
              </label>
              <label className={styles.label} >
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => <TextField {...field} label="Password" type="password" fullWidth />}
                />
                {((errors?.password) != null) && (
                  <div className={styles.error}>
                    {errors?.password?.message}
                  </div>
                )}
              </label>
              <Controller
                name="rememberClient"
                control={control}
                render={({ field }) => <div className={styles.remember} {...field}>
                  <Checkbox defaultChecked={false} />
                  <p>Remember me</p>
                </div>}
              />
              <div>
                <button className={`btnCreate ${styles.btnAuthen}`} type="submit" >LOGIN</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

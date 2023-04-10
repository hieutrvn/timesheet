import React from 'react';
import ReactLoading from 'react-loading';
import styles from './Loading.module.scss';

function Loading (): JSX.Element {
  return (
    <div className={styles.loading}>
      <ReactLoading type="spin" color='var(--black-3)' height={'3%'} width={'3%'} />
    </div>
  );
}

export default Loading;

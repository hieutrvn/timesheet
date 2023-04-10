import React from 'react';
import styles from './TeamView.module.scss';
import { useSelector } from 'react-redux';
import { TeamType, stateType } from 'src/features/ProjectManagement/type';
import moment from 'moment';

function TeamView (): JSX.Element {
  const timesheetStatisticTeams = useSelector((state: stateType) => state.projects.timesheetStatisticTeams);
  const totalWorkingTime = timesheetStatisticTeams?.reduce((it1, it2) => Number(it1) + Number(it2.totalWorkingTime), 0);
  const billableWorkingTime = timesheetStatisticTeams?.reduce((it1, it2) => Number(it1) + Number(it2.billableWorkingTime), 0);
  return (
    <div className={styles.teamView}>
      <table className={styles.teamTable}>
        <thead>
          <tr>
            <th className={styles.thName}>Name</th>
            <th className={styles.thHour}>Hour</th>
            <th className={styles.thBillable}>Billable Hour</th>
          </tr>
          <tr>
            <th className={styles.thTotal}>Total:</th>
            <th className={styles.thTime}>{moment.utc(totalWorkingTime * 1000).format('HH:mm')}</th>
            <th className={styles.thPercent}>{((totalWorkingTime !== 0 ? billableWorkingTime / totalWorkingTime : 0) * 100).toFixed(2)}%</th>
          </tr>
        </thead>
        <tbody>
          {timesheetStatisticTeams.map((item: TeamType) => (
            <tr key={item.userID}>
              <td className={styles.tdName}>{item.userName}</td>
              <td className={styles.tdTime}>{moment.utc(item.totalWorkingTime * 1000).format('HH:mm')}</td>
              <td className={styles.tdPercent}>{((item.totalWorkingTime !== 0 ? item.billableWorkingTime / item.totalWorkingTime : 0) * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamView;

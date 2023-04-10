import React from 'react';
import styles from './TaskView.module.scss';
import { useSelector } from 'react-redux';
import { TaskType, stateType } from 'src/features/ProjectManagement/type';
import moment from 'moment';

function TaskView (): JSX.Element {
  const timesheetStatisticTasks = useSelector((state: stateType) => state.projects.timesheetStatisticTasks);

  const billableTask = timesheetStatisticTasks.filter((item: TaskType) => item.billable);
  const totalWorkingTimeBillale = billableTask.reduce((it1, it2) => Number(it1) + Number(it2.totalWorkingTime), 0);
  const billableWorkingTime = billableTask.reduce((it1, it2) => Number(it1) + Number(it2.billableWorkingTime), 0);

  const nonBillableTask = timesheetStatisticTasks.filter((item: TaskType) => !item.billable);
  const totalWorkingTimeNonbillale = nonBillableTask.reduce((it1, it2) => Number(it1) + Number(it2.totalWorkingTime), 0);
  return (
    <div className={styles.taskView}>
      {billableTask?.length > 0 && (
        <table className={styles.taskBillable}>
          <thead>
            <tr>
              <th className={styles.thName}>Billable Tasks</th>
              <th className={styles.thHour}>Hour</th>
              <th className={styles.thBillable}>Billable Hour</th>
            </tr>
            <tr>
              <th className={styles.thTotal}>Total:</th>
              <th className={styles.thTime}>{moment.utc(totalWorkingTimeBillale * 1000).format('HH:mm')}</th>
              <th className={styles.thPercent}>{((totalWorkingTimeBillale !== 0 ? billableWorkingTime / totalWorkingTimeBillale : 0) * 100).toFixed(2)}%</th>
            </tr>
          </thead>
          <tbody>
            {billableTask.map((item: TaskType) => (
              <tr key={item.taskId}>
                <td className={styles.tdName}>{item.taskName}</td>
                <td className={styles.tdTime}>{moment.utc(item.totalWorkingTime * 1000).format('HH:mm')}</td>
                <td className={styles.tdPercent}>{((item.totalWorkingTime !== 0 ? item.billableWorkingTime / item.totalWorkingTime : 0) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {nonBillableTask?.length > 0 && (
        <table className={styles.taskNonBillable}>
          <thead>
            <tr className={styles.task}>
              <th className={styles.thName}>Non-billable Tasks</th>
              <th className={styles.thHour}>HOURS</th>
            </tr>
            <tr className={styles.total}>
              <th className={styles.thTotal}>Total:</th>
              <th className={styles.thTime}>{moment.utc(totalWorkingTimeNonbillale * 1000).format('HH:mm')}</th>
            </tr>
          </thead>
          <tbody>
            {nonBillableTask.map((item: TaskType) => (
              <tr key={item.taskId} className={styles.detail}>
                <td className={styles.tdName}>{item.taskName}</td>
                <td className={styles.tdTime}>{moment.utc(item.totalWorkingTime * 1000).format('HH:mm')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default TaskView;

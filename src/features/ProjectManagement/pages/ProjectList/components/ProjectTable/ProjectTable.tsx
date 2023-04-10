import React, { useState } from 'react';
import styles from './ProjectTable.module.scss';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Dropdown } from 'antd';
import { GrEdit, GrView, GrClose, GrCheckmark } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ProjectType } from 'src/features/ProjectManagement/type';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { activeProject, deactiveProject, deleteProject } from 'src/services/project';
import { Box, Modal } from '@mui/material';
import ProjectView from 'src/features/ProjectManagement/pages/ProjectView/ProjectView';
import { FaMinus } from 'react-icons/fa';
interface ProjectTableProps {
  projects: ProjectType[]
  fetchProjects: () => Promise<void>
}
interface PmsProps {
  pmList: string[]
}
const projectType: string[] = [
  'Time & Material', 'Fixed Fee', 'Non-Billable', 'ODC', 'Product', 'Training'
];
const Pms = ({ pmList }: PmsProps): JSX.Element => {
  const [length, setLength] = useState(2);
  return (
    <>
      {pmList.slice(0, length).map((item, index) => (
        <button className={styles.nameMember} key={index}>{item}</button>
      ))}
      {(length < pmList.length)
        ? <button className={`${styles.countMember} ${styles.pms}`} onClick={() => setLength(pmList.length)}>+ {pmList.length - length} pms</button>
        : (pmList.length >= 3 && <button className={`${styles.countMember} ${styles.pms}`} onClick={() => setLength(2)}><FaMinus /></button>)
      }
    </>
  );
};
function ProjectTable ({ projects, fetchProjects }: ProjectTableProps): JSX.Element {
  const [modalId, setModalId] = useState<number | undefined>();
  const handleDelete = async (id: number): Promise<void> => {
    try {
      const res = await deleteProject(id);
      if (res.status === 200) {
        await fetchProjects();
        toast.success('Delete Project Successfully!');
      }
    } catch (e) {
      toast.error('Delete Project Failed!');
    }
  };
  const handleActive = async (id: number): Promise<void> => {
    try {
      const res = await activeProject(id);
      if (res.status === 200) {
        await fetchProjects();
        toast.success('Active Project Successfully!');
      }
    } catch (e) {
      toast.error('Active Project Failed!');
    }
  };
  const handleDeactive = async (id: number): Promise<void> => {
    try {
      const res = await deactiveProject(id);
      if (res.status === 200) {
        await fetchProjects();
        toast.success('Deactive Project successfully!');
      }
    } catch (e) {
      toast.error('Deactive Project Failed!');
    }
  };
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 3
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (id: number): void => {
    setModalId(id);
    setOpen(true);
  };
  const handleClose = (): void => setOpen(false);
  return (
    <div className={styles.projectTable}>
      <div className={styles.client}>
                Project Table
      </div>
      <div className={styles.project}>
        <table>
          <thead>
            <tr>
              <th className={styles.thProjectName}>PROJECT</th>
              <th className={styles.thMember}>PMS/MEMBERS</th>
              <th className={styles.thProjectType}>PROJECT TYPE</th>
              <th className={styles.thTime}>TIME</th>
              <th className={styles.thClient}>CLIENT</th>
              <th className={styles.thStatus}>STATUS</th>
              <th className={styles.thAction}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((item: ProjectType) => (
              <tr key={item?.id} className={styles.row}>
                <td className={styles.tdProjectName}>{item.name}</td>
                <td className={styles.tdMember}>
                  <Pms pmList={item.pms} />
                  <button className={styles.countMember}>+ {item.activeMember} members</button>
                </td>
                <td className={styles.tdProjectType}>{projectType[item?.projectType]}</td>
                <td className={styles.tdTime}>{moment(item.timeStart).format('DD/MM/YY')} - {moment(item.timeEnd).format('DD/MM/YY')}</td>
                <td className={styles.tdClient}>{item.customerName}</td>
                <td className={styles.tdStatus}>
                  <button className={(item.status !== 1) ? '' : styles.btnDeactive}>{(item.status !== 1) ? 'Active' : 'Deactive'}</button>
                </td>
                <td className={styles.tdAction}>
                  <Dropdown
                    dropdownRender={() => (
                      <div className={styles.dropdownAction}>
                        <div className={`${styles.actionItem} ${styles.actionEdit}`} >
                          <Link to={`/project/edit/${item.id}`}>
                            <GrEdit />
                                                        Edit
                          </Link>
                        </div>
                        <div className={`${styles.actionItem} ${styles.actionView}`}>
                          <div onClick={() => handleOpen(item.id)}>
                            <GrView />
                                                        View
                          </div>
                        </div>
                        <div className={`${styles.actionItem} ${styles.actionActive}`} onClick={async () => { (item.status !== 0) ? await handleActive(item.id) : await handleDeactive(item.id); }}>
                          {(item.status !== 0) ? <GrCheckmark /> : <GrClose />}
                          {(item.status !== 0) ? 'Active' : 'Deactive'}
                        </div>
                        <div className={`${styles.actionItem} ${styles.actionDelete}`} onClick={async () => await handleDelete(item.id)}>
                          <RiDeleteBin6Line />
                                                    Delete
                        </div>
                      </div>
                    )}
                    trigger={['hover']} placement="bottom" arrow>
                    <button className={styles.round}><BiDotsVerticalRounded /></button>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ProjectView projectId={modalId as number} />
        </Box>
      </Modal>
    </div>
  );
}
export default ProjectTable;

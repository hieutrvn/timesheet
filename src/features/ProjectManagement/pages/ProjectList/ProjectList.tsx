import React, { useEffect, useState } from 'react';
import styles from './ProjectList.module.scss';
import Header from 'src/layout/Header/Header';
import ProjectTable from './components/ProjectTable/ProjectTable';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectList } from 'src/redux/actions/projects';
import Loading from 'src/components/Loading/Loading';
import { stateType } from '../../type';

function ProjectList (): JSX.Element {
  const dispatch = useDispatch();
  const projects = useSelector((state: stateType) => state.projects.projects);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<number>(0);
  const fetchProjects = async (): Promise<void> => {
    setLoading(true);
    dispatch(await getProjectList(status, search));
    setLoading(false);
  };
  useEffect(() => {
    void fetchProjects();
  }, [dispatch, search, status]);
  return (
    <div className={styles.projectList}>
      <div className={styles.content}>
        <Header search={search} status={status} setSearch={setSearch} setStatus={setStatus} />
        <div className={styles.table}>
          <ProjectTable projects={projects} fetchProjects={fetchProjects} />
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
}

export default ProjectList;

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_ACTIVITIES } from '../store/action';
import Kanban from '../components/Kanban';
import Nav from '../components/Nav';

function Dashboard() {
  const dispatch = useDispatch();
  const activities = useSelector(state => state.activities);

  const backlog = activities.filter(act => act.category === 'Backlog')
  const onProgress = activities.filter(act => act.category === 'On Progress')
  const needsReview = activities.filter(act => act.category === 'Needs Review')
  const finished = activities.filter(act => act.category === 'Finished')

  useEffect(() => {
    dispatch(FETCH_ACTIVITIES());
  }, [dispatch])

  return (
    <>
      <Nav />
      <main>
        <Kanban title="Backlog" acts={backlog} />
        <Kanban title="On Progress" acts={onProgress} />
        <Kanban title="Needs Review" acts={needsReview} />
        <Kanban title="Finished" acts={finished} />
      </main>
    </>
  )
}

export default Dashboard

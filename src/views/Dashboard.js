import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_ACTIVITIES } from '../store/action';
import Kanban from '../components/Kanban';
import Nav from '../components/Nav';
import { Spring } from 'react-spring/renderprops'
import Joyride from 'react-joyride';

function Dashboard() {
  const dispatch = useDispatch();
  const activities = useSelector(state => state.activities);

  const backlog = activities.filter(act => act.category === 'Backlog')
  const onProgress = activities.filter(act => act.category === 'On Progress')
  const needsReview = activities.filter(act => act.category === 'Needs Review')
  const finished = activities.filter(act => act.category === 'Finished')

  const run = true;
  const steps = [
    {
      target: '#tour-add',
      content: 'Type your activity then hit ENTER'
    }
  ]

  useEffect(() => {
    dispatch(FETCH_ACTIVITIES());
  }, [dispatch])  

  return (
    <>
      <Nav />
      <main>
        <Joyride
          steps={steps}
          run={run}
        />
        <Spring
          from={{ transform: 'translate3d(0,-40px,0)', opacity: 0 }}
          to={{ transform: 'translate3d(0,0px,0)', opacity: 1 }}>
          {props => <Kanban title="Backlog" acts={backlog} props={props} />}
        </Spring>
        <Spring
          from={{ transform: 'translate3d(0,-40px,0)', opacity: 0 }}
          to={{ transform: 'translate3d(0,0px,0)', opacity: 1 }}>
          {props => <Kanban title="On Progress" acts={onProgress} props={props} />}
        </Spring>
        <Spring
          from={{ transform: 'translate3d(0,-40px,0)', opacity: 0 }}
          to={{ transform: 'translate3d(0,0px,0)', opacity: 1 }}>
          {props => <Kanban title="Needs Review" acts={needsReview} props={props} />}
        </Spring>
        <Spring
          from={{ transform: 'translate3d(0,-40px,0)', opacity: 0 }}
          to={{ transform: 'translate3d(0,0px,0)', opacity: 1 }}>
          {props => <Kanban title="Finished" acts={finished} props={props} />}
        </Spring>
      </main>
    </>
  )
}

export default Dashboard

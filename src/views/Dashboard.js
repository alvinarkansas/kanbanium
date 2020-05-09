import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_ACTIVITIES } from '../store/action';
import Kanban from '../components/Kanban';
import Nav from '../components/Nav';
import { Spring } from 'react-spring/renderprops'
import Joyride, { ACTIONS, STATUS } from 'react-joyride';

function Dashboard() {
  const dispatch = useDispatch();
  const activities = useSelector(state => state.activities);

  const backlog = activities.filter(act => act.category === 'Backlog')
  const onProgress = activities.filter(act => act.category === 'On Progress')
  const needsReview = activities.filter(act => act.category === 'Needs Review')
  const finished = activities.filter(act => act.category === 'Finished')

  const [run, setRun] = useState(false);
  const steps = [
    {
      target: '#tour-add',
      content: <p>Type your activity then hit <b>ENTER</b></p>,
      disableBeacon: true
    }
  ]

  useEffect(() => {
    dispatch(FETCH_ACTIVITIES());
    if (!localStorage.getItem('viewed_tour')) setRun(true)
  }, [dispatch])

  const viewedTour = () => localStorage.setItem('viewed_tour', 'true');

  const handleCallback = (joy) => {
    const { action, status } = joy;
    if (action === ACTIONS.CLOSE || (status === STATUS.SKIPPED && run) || status === STATUS.FINISHED) {
      viewedTour();
    }
  }

  return (
    <>
      <Nav />
      <main>
        <Joyride
          steps={steps}
          run={run}
          callback={handleCallback}
          locale={{close: 'Got it!'}}
        />
        {/* <Spring
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
        </Spring> */}
        <Kanban title="Backlog" acts={backlog} />
        <Kanban title="On Progress" acts={onProgress} />
        <Kanban title="Needs Review" acts={needsReview} />
        <Kanban title="Finished" acts={finished} />
      </main>
    </>
  )
}

export default Dashboard

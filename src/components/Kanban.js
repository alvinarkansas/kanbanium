import React, { useState } from 'react'
import Act from './Act';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_ACTIVITY } from '../store/action';
import BounceLoader from 'react-spinners/BounceLoader';

function Kanban({ title, acts, props }) {
  const [newAct, setNewAct] = useState('');
  const dispatch = useDispatch();
  const addLoading = useSelector(state => state.addLoading);

  function changeAct(e) {
    setNewAct(e.target.value)
  }

  function addNewAct(e) {
    e.preventDefault();
    dispatch(ADD_ACTIVITY(newAct));
    setNewAct('');
  }

  return (
    <div className="kanban" style={props}>
      {title === 'Backlog' ? <p className="txt-crimson">{title}</p> : (title === 'On Progress' ? <p className="txt-night">{title}</p> : (title === 'Needs Review' ? <p className="txt-violet">{title}</p> : <p className="txt-leaf">{title}</p>))}
      {acts.map(act => <Act key={act.id} act={act} />)}
      {
        title === 'Backlog'
          ?
          <form className="add-act" id="tour-add" onSubmit={addNewAct}>
            <input type="text" placeholder="Type new activity here" onChange={changeAct} value={newAct} />
            <BounceLoader
              size={40}
              color={'#089C72'}
              loading={addLoading}
            />
          </form>
          :
          null
      }
    </div>
  )
}

export default Kanban

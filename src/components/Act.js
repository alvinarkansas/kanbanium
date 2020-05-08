import React, { useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { MOVE, DELETE, SAVE_CHANGES } from '../store/action';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import moment from 'moment';

function Act({ act }) {
  const dispatch = useDispatch();
  const category = act.category;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState(act.title)

  const moveLeft = () => {
    let newCategory;
    if (act.category === 'Finished') newCategory = 'Needs Review'
    else if (act.category === 'Needs Review') newCategory = 'On Progress'
    else if (act.category === 'On Progress') newCategory = 'Backlog'
    dispatch(MOVE({ id: act.id, category: newCategory }))
  }

  const moveRight = () => {
    let newCategory;
    if (act.category === 'Backlog') newCategory = 'On Progress'
    else if (act.category === 'On Progress') newCategory = 'Needs Review'
    else if (act.category === 'Needs Review') newCategory = 'Finished'
    dispatch(MOVE({ id: act.id, category: newCategory }))
  }

  const deleteAct = () => {
    dispatch(DELETE(act.id));
  }

  const saveChanges = () => {
    dispatch(SAVE_CHANGES({ id: act.id, title }))
    setModalIsOpen(false);
  }

  return (
    <>
      <div className={'act ' + (category === 'Backlog' ? 'crimson' : (category === 'On Progress' ? 'night' : (category === 'Needs Review' ? 'violet' : 'leaf')))}>
        {
          act.category !== 'Backlog'
            ?
            <div className="move-btn" onClick={moveLeft} >
              <FaAngleLeft />
            </div>
            :
            <div></div>
        }
        <div onClick={() => setModalIsOpen(true)}>
          <p>{act.title}</p>
        </div>
        {
          act.category !== 'Finished'
            ?
            <div className="move-btn" onClick={moveRight} >
              <FaAngleRight />
            </div>
            :
            <div></div>
        }
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal disable-select"
        overlayClassName="modal-overlay"
      >
        <div>
          <div>
            <form className="outline-form disable-select extra-mb">
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="disable-select"
              />
            </form>
            <p className={'extra-mb ' + (act.category === 'Backlog' ? 'txt-crimson' : (act.category === 'On Progress' ? 'txt-night' : (act.category === 'Needs Review' ? 'txt-violet' : 'txt-leaf')))}>{act.category}</p>
            <p>created {moment(act.createdAt).fromNow()}</p>
          </div>
          <div id="option">
            <div className="big-btn leaf" onClick={saveChanges}>
              <p>SAVE CHANGES</p>
            </div>
            <div className="big-btn crimson" onClick={deleteAct}>
              <p>REMOVE</p>
            </div>
          </div>
          <div className="close-btn" onClick={() => setModalIsOpen(false)} >
            <MdClose />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Act

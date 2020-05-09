import axios from 'axios';
import notification from '../components/Notification';

export function SET_ACTIVITIES(data) {
    return { type: 'SET_ACTIVITIES', payload: data }
}

export function SET_LOADING(data) {
    return { type: 'SET_LOADING', payload: data }
}

export function SET_ADD_LOADING(data) {
    return { type: 'SET_ADD_LOADING', payload: data }
}

export function FETCH_ACTIVITIES() {
    return (dispatch) => {
        dispatch(SET_LOADING(true))
        axios({
            method: 'get',
            url: 'https://salty-sierra-49064.herokuapp.com/activities',
            headers: {
                token: localStorage.getItem('access_token')
            }
        })
            .then(({ data }) => {
                dispatch(SET_ACTIVITIES(data))
            })
            .catch(err => {
                console.log(err.response)
            })
            .finally(_ => {
                dispatch(SET_LOADING(false))
            })
    }
}

export function ADD_ACTIVITY(data) {
    return (dispatch) => {
        dispatch(SET_ADD_LOADING(true));
        axios({
            method: 'post',
            url: 'https://salty-sierra-49064.herokuapp.com/activities',
            data: { title: data },
            headers: {
                token: localStorage.getItem('access_token')
            }
        })
            .then(({ data }) => {
                dispatch(FETCH_ACTIVITIES());
                console.log('added new activity', data);
                notification('success', 'Added new activity', data.title)
            })
            .catch(err => {
                console.log(err.response)
            })
            .finally(_ => {
                dispatch(SET_ADD_LOADING(false))
            })
    }
}

export function MOVE(data) {
    return (dispatch) => {
        dispatch(SET_LOADING(true))
        axios({
            method: 'patch',
            url: `https://salty-sierra-49064.herokuapp.com/activities/${data.id}`,
            headers: {
                token: localStorage.getItem('access_token')
            },
            data: {
                new_category: data.category
            }
        })
            .then(({ data }) => {
                console.log('successfully moved', data);
                dispatch(FETCH_ACTIVITIES());
            })
            .catch(err => {
                console.log(err.response);
            })
            .finally(_ => {
                dispatch(SET_LOADING(false))
            })
    }
}

export function DELETE(id) {
    return (dispatch) => {
        dispatch(SET_LOADING(true))
        axios({
            method: 'delete',
            url: `https://salty-sierra-49064.herokuapp.com/activities/${id}`,
            headers: {
                token: localStorage.getItem('access_token')
            }
        })
            .then(({ data }) => {
                console.log('successfully deleted', data);
                dispatch(FETCH_ACTIVITIES());
                notification('success', 'Activity deleted', data.deletedActivity.title)
            })
            .catch(err => {
                console.log(err.response);
            })
            .finally(_ => {
                dispatch(SET_LOADING(false))
            })
    }
}

export function SAVE_CHANGES(data) {
    return (dispatch) => {
        dispatch(SET_LOADING(true))
        axios({
            method: 'patch',
            url: `https://salty-sierra-49064.herokuapp.com/activities/title/${data.id}`,
            data: {
                title: data.title
            },
            headers: {
                token: localStorage.getItem('access_token')
            }
        })
            .then(({ data }) => {
                console.log('successfully udpated', data);
                dispatch(FETCH_ACTIVITIES());
            })
            .catch(err => {
                console.log(err.response);
            })
            .finally(_ => {
                dispatch(SET_LOADING(false))
            })
    }
}
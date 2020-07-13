import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

// const formateData = data => ({
//     ...data,
//     age: parseInt(data.age ? data.age : 0)
// })

export const fetchAll = () => dispatch => {
    api.dNote().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    //data = formateData(data)
    api.dNote().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (uid, data, onSuccess) => dispatch => {
    // data = formateData(data)
    api.dNote().update(uid, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { uid, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (uid, onSuccess) => dispatch => {
    api.dNote().delete(uid)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: uid
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
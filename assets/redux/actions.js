import firebase from '../config';


export const setFrom = (input, value) => (dispatch) => {
        setTimeout(() => {
            return dispatch({type: 'asd', inputType: input, inputValue: value});
            }, 2000)
}

export const setFromRegister = (input, value) => (dispatch) => {
    return dispatch({type: 'ON_REGIS', inputType: input, inputValue: value});
}

export const setStatusCorrect = (status) => (dispatch) => {
    return dispatch({type:'ON_CORRECT', value:status})
}

export const Logiinn = (email, accpass) => (dispatch) => {
    return new Promise((acc, dc) => {
        dispatch({type:'ON_SUBMIT', value:true})
        firebase.auth().signInWithEmailAndPassword(email, accpass)
        .then(res => {
        console.log('dari action login', res)
        
        const datauser = {
            email : res.user.email,
            emailVerified : res.user.emailVerified,
            uid : res.user.uid,
        }

        dispatch({type:'ON_SUBMIT', value:false})
        acc(datauser)
        })
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode, errorMessage);
        dispatch({type:'ON_SUBMIT', value:false})
        dc(false)
        })
    })
}

export const asd = (email, accpass) => (dispatch) => {
    return new Promise((acc, dc) => {
        dispatch({type:'ON_SUBMIT', value:true})
        firebase.auth().createUserWithEmailAndPassword(email, accpass)
        .then(res => {
        console.log('dari action', res)
        
        const datauser = {
            email : res.user.email,
            emailVerified : res.user.emailVerified,
            uid : res.user.uid,
        }

        dispatch({type:'ON_SUBMIT', value:false})
        acc(datauser)
        })
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode, errorMessage);
        dispatch({type:'ON_SUBMIT', value:false})
        dc(false)
        })
    })
}
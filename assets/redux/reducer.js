import { combineReducers } from "redux";

const initStateRegister = {
    form: {
        email:'KAMBING',
        password:'',
        accpass:'',
        token:'',
    },
    isLoading: false,
    onCorrect: false,
};

const register = (state = initStateRegister, action) => {
    if(action.type === 'ON_REGIS'){
        return{
            ...state,
            form:{
                ...state.form,
                [action.inputType]: action.inputValue,
            }
        }
    }
    if(action.type === 'ON_CORRECT'){
        return{
            ...state,
            onCorrect:action.value,
        }
    }
    if(action.type === 'ON_SUBMIT'){
        return{
            ...state,
            isLoading:action.value,
        }
    }
    return state;
};

const initStateLogin = {
    form: {
        email: 'MyAquarium',
        password: '',
    },
    name: 'kambing',
    isLoading:false,
};

const login = (state = initStateLogin, action) => {
    if(action.type === 'asd'){
        return{
            ...state,
            form:{
                ...state.form,
                [action.inputType]: action.inputValue,
            }
        }
    }
    if(action.type==='diklik'){
        return{
            ...state,
            isLoading:action.value,
        }
    }
    return state;
};

const initStateDashboard = {
    btnPower: false,
    lampu: 'Off',
};

const dashboard = (state = initStateDashboard, action) => {
    if(action.type==='KAMBING'){
        return{
            ...state,
            isLoading:action.value,
        }
    }
    return state;
};

const reducer = combineReducers({
    register,
    login,
    dashboard,
})

export default reducer;
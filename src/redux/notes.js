import * as ActionTypes from './actionTypes';

export const Notes=(state={
        isLoading:true,
        err:null,
        notes:[]
    },action)=>{
        switch(action.type){
            case ActionTypes.ADD_NOTES:
                return {...state,isLoading:false,err:null,notes:action.payload}
            case ActionTypes.NOTES_LOADING:
                return {...state,isLoading:true,err:null,notes:[]}
            case ActionTypes.NOTES_FAILED:
                return {...state,isLoading:false,err:action.payload,notes:[]}
            default:
                return state;
        }
}
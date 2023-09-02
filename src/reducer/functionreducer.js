import {createSlice} from "@reduxjs/toolkit";


const slice1 =createSlice({
    name:'functionlar',
    initialState:{
        func:{
                actives:false,
                class1:'homepageone',
                class2:'homepagetwo',
                class3:'sidebar',
                class4:'',
                class5:'app-css2'
        }
    },
    reducers:{
        active:(state,action)=>     {
            state.func.actives = !state.func.actives
            if(state.func.class2 === 'homepagetwo'){
                    state.func.class1='homepage1'
                    state.func.class2='homepage2'
                    state.func.class3='sidebar2'
                    state.func.class4='media'
                }

                else{
                    state.func.class1='homepageone'
                    state.func.class2='homepagetwo'
                    state.func.class3='sidebar'
                    state.func.class4="media2"
                }

        },
        activSavdo:(state)=>{
            state.func.actives = false;
            if(state.func.class2 === 'homepage2'){
                    state.func.class1='homepageone'
                    state.func.class2='homepagetwo'
                    state.func.class3='sidebar'
                    state.func.class4='media2'
                }
                else{
                    state.func.class1='homepageone'
                    state.func.class2='homepagetwo'
                    state.func.class3='sidebar'
                    state.func.class4="media2"
                }
        },
        activemedia:(state,action)=>{
            state.func.class4='media2'
            state.func.class2='homepagetwo'
            state.func.class1='homepageone'
            state.func.class3='sidebar'
        },
        activetoggle:(state,action)=>{

        }
    }
})

export const {  active,activemedia,activSavdo,activetoggle} = slice1.actions
export default slice1.reducer

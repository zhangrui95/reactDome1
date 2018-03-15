import {SELECT_DATA} from '../constants/ActionTypes'
import syncReducer from './syncReducer'

export default syncReducer({
    [SELECT_DATA]:{
        request:(state) => state,
        done:(state,action) => Object.assign({},state,{[action.domain]:action.response})
    }
})
import {LIST_ENT} from '../constants/ActionTypes'
import syncReducer from './syncReducer'

export default syncReducer({
  [LIST_ENT]:{
    request:(state,action) => {return {option:action.option}},
    done:(state,action) => {
      const response = action.response||{};
      const data = response.data||[];
      const option = state.option;
      option.count = response.total||0;
      if(data!=null){
        const left = option.count%option.limit;
        option.total = (option.count - left) / option.limit+(left==0?0:1);
        option.displayEnd = option.start+data.length;
        if(data.length==0){
          option.displayStart=0;
          option.current=0;
        }else{
          option.displayStart = option.start+1;
        }
      }
      return Object.assign({},state,{response:action.response});
    },
    fail:(state,action) => Object.assign({},state,{error:action.error})
  }
})
export interface LabState {step:number;answers:(number|null)[]}
export type LabAction={type:'answer';option:number}|{type:'next'}|{type:'back'}
export function initialLabState():LabState{return {step:0,answers:[null,null,null]}}
export function labReducer(state:LabState,action:LabAction):LabState{
 if(action.type==='answer'){if(state.step>2||!Number.isInteger(action.option)||action.option<0||action.option>2)return state;const answers=[...state.answers];answers[state.step]=action.option;return {...state,answers}}
 if(action.type==='back')return {...state,step:Math.max(0,state.step-1)}
 if(state.step<3&&state.answers[state.step]!==null)return {...state,step:state.step+1}
 return state
}

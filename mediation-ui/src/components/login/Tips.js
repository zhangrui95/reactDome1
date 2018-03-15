import React, { Component, PropTypes } from 'react'
import QueueAnim from 'rc-queue-anim';

class Tips extends Component {

    animChange(e) {
        const {key} = e;
        switch (key){
            // case '1':return { opacity: [1, 0], translateY: [0, 50] };
            // case '2':return { opacity: [1, 0], translateX: [0, -500] };
            default:return { opacity: [1, 0], translateX: [0, -500] };
        }
    }

    render(){
        return (
            <div className="login-left">
               
            </div>
        )
    }

}
// <div className="login-left">
//     <QueueAnim animConfig={this.animChange} interval={500} duration={700} className="sfb very-big-white">
//         <p key="1">“ 队伍专业化 ”</p><p key="2">“ 监管信息化 ”</p><p key="3">“ 执法规范化 ”</p>
//         <p key="4">“ 检查常态化 ”</p><p key="5">“ 宣传立体化 ”</p><p key="6">“ 责任实名化 ”</p>
//         <p key="7">“一个制度体系”</p>
//     </QueueAnim>
// </div>
// <div key="2" className="med-white lfl" >『 明确责任、自检自查、缓解人少任务重、方便事后追责 』</div>
// <div key="3" className="med-white lfr">『 让工作更简单，一切尽在掌握之中 』</div>
export default Tips;
class getTime {
    constructor() {

    }
    timeTarget(time) {
        let date = new Date();
        let getHours = 0, minutes = date.getMinutes() + time;
        if (minutes >= 60) {
            getHours += Math.floor(minutes / 60)
            minutes = minutes % 60
        }
        let hours = date.getHours() + getHours, d = 0;
        if (hours >= 24) {
            d += Math.floor(hours / 24);
            hours = hours % 24
        }
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() + d} ${hours}:${minutes}:${date.getSeconds()}`
    }
    currentTime(dom, time, format, callBack) {
        clearInterval(dom.timer)
        // 1. 定义将来的时间 
        let nextDate = new Date(time);        
            beginTime(false)
        // 2. 开启定时器
        dom.timer = setInterval(function () {
            beginTime(true)
        }, 1000);        
        function beginTime(flag) {
        let currentDate, currentTime, nextTime, allTime;
            // 3. 获取当前的时间
            currentDate = new Date();
            // 4. 获取毫秒数
            currentTime = currentDate.getTime();
            nextTime = nextDate.getTime();
            // 5. 获取剩余的毫秒
            allTime = nextTime - currentTime;
            // 6. 获取秒
            let allSecond = parseInt(allTime / 1000);
            //7. 小时
            let h = parseInt(allSecond / 3600 % 24).toString().padStart(2, 0); // 时
            //8. 分钟
            let m = parseInt(allSecond / 60 % 60).toString().padStart(2, 0); // 分
            //8. 秒
            let s = parseInt(allSecond % 60).toString().padStart(2, 0); // 秒
            if (format === 'S') {
                dom.innerText = '重新获取 (' + s + ')'
            } else if(format === 'P'){
                dom.innerHTML = '请你在<span>'+ m +'</span>分<span>'+ s +'</span>秒内完成支付'
            }
            else {
                dom.innerText = h + ':' + m + ':' + s;
            }            
            if (allSecond <= 0) {
                clearInterval(dom.timer)
                //7. 到达时间执行回调
                dom.innerText = '00:00:00'
                if(flag){
                    callBack()
                }
                
               
            }
        }
    }
}
export const current = new getTime().currentTime.bind(new getTime())
export const time = new getTime().timeTarget.bind(new getTime())
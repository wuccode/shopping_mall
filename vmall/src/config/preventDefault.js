export default function(dom){
    let startY, moveY, disY,startX, moveX, disX, isPreventDefault;
    //手指按下
    dom.addEventListener('touchstart', function (e) {
        startY = e.changedTouches[0].clientY;
        startX = e.changedTouches[0].clientX;
        isPreventDefault = 0;

    })
    //手指滑动
    dom.addEventListener('touchmove', function (e) {
        moveY = e.changedTouches[0].clientY;
        moveX = e.changedTouches[0].clientX;
        disY = moveY - startY
        disX = moveX - startX
        isPreventDefault = Math.abs(disY) < Math.abs(disX) ? 1 : 0;
        if(isPreventDefault){
            e.preventDefault()            
        }
    })    
}
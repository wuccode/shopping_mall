import preventDefault from './preventDefault'
export default function (centents, lists, speed = 0.3, d = 50, index = 0, ratio = 50) {
    let startX, moveX, disX, startY, moveY, disY, prev = index;
    let y = 0, x = 0;
    lists.children[index].className = 'active'
    centents.style.transform = 'translate3d(' + -ratio * index + '%, 0, 0)';
    preventDefault(centents)
    //手指按下
    centents.addEventListener('touchstart', function (e) {
        startX = e.changedTouches[0].clientX
        startY = e.changedTouches[0].clientY
        disX = 0;
    })
    //手指滑动
    centents.addEventListener('touchmove', function (e) {
        this.style.transition = 'none';
        moveX = e.changedTouches[0].clientX
        moveY = e.changedTouches[0].clientY
        disY = moveY - startY
        disX = moveX - startX;
        y += Math.abs(disY)
        x += Math.abs(disX)
        let pos = disX - (document.documentElement.clientWidth * index);
        if (y > x) return;
        if (index == 0) {
            if (disX > 0) pos = disX * 0.4
        } else if (index == this.children.length - 1) {
            if (disX < 0) pos = disX - (disX * 0.6) - (document.documentElement.clientWidth * index);
        }
        this.style.transform = 'translate3d(' + pos + 'px, 0, 0)';

    });
    //手指抬起
    centents.addEventListener('touchend', function () {
        y = 0
        x = 0
        this.style.transition = 'transform ' + 0.3 + 's ease-out';
        if (Math.abs(disX) > d) {
            if (disX < 0) {
                index++;
                if (index >= this.children.length - 1) index = this.children.length - 1;
            } else {
                index--;
                if (index <= 0) index = 0;
            }
        }
        this.style.transform = 'translate3d(' + -ratio * index + '%, 0, 0)';
        lists.children[prev].className = ''
        lists.children[index].className = 'active'
        prev = index;
    });
    if (!lists) return;
    lists.children.forEach((e, pos) => {
        e.addEventListener('click', (e) => {
            e.preventDefault()
            index = pos;
            centents.style.transition = 'transform ' + speed + 's ease-out';
            centents.style.transform = 'translate3d(' + -ratio * index + '%, 0, 0)';
            lists.children[prev].className = ''
            lists.children[index].className = 'active'
            prev = index;
        })
    })
}
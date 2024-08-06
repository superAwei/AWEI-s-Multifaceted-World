import {cursorInit} from './components/cursorEffect.js'
import  pageInit from './components/pageInit.js'
cursorInit()
pageInit()

// 滑鼠移入出現作品圖片
console.log(gsap)

gsap.set('.circle_img', {
    opacity: 0,
    scale: 0,
    xPercent: -50,
    yPercent: -50,
})

$('.selected_works_box').hover(
    function(e) { // mouseenter
        const $circleImg = $(this).find('.circle_img')
        gsap.to($circleImg[0], {
            scale: 1,
            opacity: 1,
            duration: 0.2
        })
    },
    function(e) { // mouseleave
        const $circleImg = $(this).find('.circle_img')
        gsap.to($circleImg[0], {
            scale: 0,
            opacity: 0,
            duration: 0.2
        })
    }
)

$('.selected_works_box').mousemove(function(e) {
    const $circleImg = $(this).find('.circle_img')
    const rect = this.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    gsap.to($circleImg[0], {
        x: x,
        y: y,
        duration: 0.2
    })
})

// 深色模式切換
$('.switch_box').click(function(e){
    console.log(e.target)
    if(!e.target.classList.contains('fakeCheckBox')){
        $('body').toggleClass('dark')
    }
})
//AOS
AOS.init();

//GSAP
gsap.registerPlugin(ScrollTrigger)

const sections = gsap.utils.toArray('.block');

let allWidth = 0;

sections.forEach((item, index) => {
    const itemWidth = item.getBoundingClientRect().width;
    allWidth += itemWidth;
});

const scrollContentTrigger = gsap.to('.scroll-content', {
    x: -allWidth + document.querySelector('.scroll-content').offsetWidth,
    ease: 'none',
    scrollTrigger: {
        trigger: '.scroll-content',
        pin: true,
        scrub: 1,
        end: () => '+=' + (allWidth - document.querySelector('.scroll-content').offsetWidth),
        onLeave: () => {
            document.body.classList.add('dark');
        },
        onEnterBack: () => {
            document.body.classList.remove('dark');
        }
    }
})

// 文字偏移
const fontTrigger = gsap.to('.font-graphy', {
    x: -200,
    ease: 'none',
    scrollTrigger: {
        trigger: '.scroll-content',
        scrub: 1,
        start: document.querySelector('.project_group').getBoundingClientRect().width - innerWidth + 800,
        end: '+=' + innerWidth
    }
})

// 新增背景色變化效果
const createBackgroundEffect = () => {
    return ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            if (self.progress >= 0.9) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        }
    });
}

let backgroundEffect = createBackgroundEffect();

// 響應式處理函數
const handleResize = () => {
    if (window.innerWidth < 481) {
        if (scrollContentTrigger.scrollTrigger) {
            scrollContentTrigger.scrollTrigger.disable();
        }
        if (fontTrigger.scrollTrigger) {
            fontTrigger.scrollTrigger.disable();
        }
        // 重新創建背景效果，適應小螢幕
        if (backgroundEffect) {
            backgroundEffect.kill();
        }
        backgroundEffect = createBackgroundEffect();
    } else {
        if (scrollContentTrigger.scrollTrigger) {
            scrollContentTrigger.scrollTrigger.enable();
        }
        if (fontTrigger.scrollTrigger) {
            fontTrigger.scrollTrigger.enable();
        }
        // 在大螢幕上使用原有的背景變化效果
        if (backgroundEffect) {
            backgroundEffect.kill();
        }
        backgroundEffect = null;
    }
}

// 初始調用一次來設置初始狀態
handleResize();

// 監聽 resize 事件
window.addEventListener('resize', handleResize);
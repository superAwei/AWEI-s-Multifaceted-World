export default function pageInit(){
    $(function(){
        $('.loading_block').addClass('loading_moveup');
        const eles = $('.init-Ref')
        setTimeout(()=>{
            const io = new IntersectionObserver((entries)=>{
                entries.forEach((entry)=>{
                    if(entry.isIntersecting){
                        $(entry.target).addClass('animate__animated animate__fadeIn')
                    }
                })
            })
            eles.each((index,dom)=>{
                io.observe(dom)
            })
        },2000 )
    })
}
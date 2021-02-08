export const resize = (dom)=>{
    if(!dom) return false;
    window.addEventListener('resize',()=>{
        dom.resize()
    })
}
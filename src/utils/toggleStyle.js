export const includesStyleElement = (styles,styleId='styleId')=>{
    const el = document.getElementById(styleId)
    if(el){
        el.remove()
    }
    const style = document.createElement('style')
    style.id = 'styleId'
    if(style.styleSheet){
        style.styleSheet.cssText= styles
    }else {
        style.appendChild(document.createTextNode(styles))
    }
    document.getElementsByTagName('head')[0].appendChild(style)
}
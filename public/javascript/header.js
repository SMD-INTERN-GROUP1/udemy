var menubar=document.querySelector('.menu-bar')
var menu=document.querySelector('.nav-item')
var close=document.querySelector('.nav-close')
var bg=document.querySelector('.black-bg')
menubar.onclick=() =>{
    menu.classList.add('active')
    close.classList.add('active')
    bg.classList.add('active')
}
close.onclick=() =>{
    menu.classList.remove('active')
    close.classList.remove('active')
    bg.classList.remove('active')
}
bg.onclick=() =>{
    menu.classList.remove('active')
    close.classList.remove('active')
    bg.classList.remove('active')
}

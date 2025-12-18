const close_tab = document.getElementById('close_tab');
const menu_list = document.getElementById('menu_list')

close_tab.addEventListener('click', ()=>{
  menu_list.style.right = '-300px';

  menu_list.style.transition = '0.5 ease-out'
})

const menu_bars = document.getElementById('bars');

menu_bars.addEventListener('click', () => {
  menu_list.style.right = '0px';
  menu_list.style.transition = '0.5 ease-out';
})
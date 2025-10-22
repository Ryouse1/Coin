let stack = [], targets = [];

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  startBtn.addEventListener('click', () => {
    document.getElementById('title-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    setupParticles(50);
    setupGame();
  });
});

function setupGame(){
  const diff = document.getElementById('difficulty').value;
  let n, maxNum, slotCount;
  if(diff==='easy'){ n=2+Math.floor(Math.random()*2)*2; maxNum=3; slotCount=2; }
  else if(diff==='normal'){ n=4+Math.floor(Math.random()*2)*2; maxNum=5; slotCount=3; }
  else{ n=6+Math.floor(Math.random()*1)*2; maxNum=8; slotCount=4; }

  stack=[]; for(let i=0;i<n;i++) stack.push(Math.floor(Math.random()*maxNum)+1);
  targets=[]; for(let i=0;i<slotCount;i++) targets.push(Math.floor(Math.random()*maxNum*2)+2);
  render();
}

function render(){
  const coinsContainer=document.getElementById('coins');
  coinsContainer.innerHTML='';
  stack.forEach((num,i)=>{
    const coin=document.createElement('div');
    coin.className='coin'; coin.innerText=num; coin.draggable=true; coin.id='coin'+i;
    coinsContainer.appendChild(coin);
  });

  const slotsContainer=document.getElementById('slots');
  slotsContainer.innerHTML='';
  targets.forEach((t,i)=>{
    const slot=document.createElement('div');
    slot.className='slot'; slot.dataset.target=t; slot.innerHTML=`合計 ${t}`;
    slotsContainer.appendChild(slot);
    slot.ondragover=e=>e.preventDefault();
    slot.ondrop=e=>{
      e.preventDefault();
      const coinId=e.dataTransfer.getData('text');
      const coin=document.getElementById(coinId);
      slot.appendChild(coin);
      checkSlots();
    };
  });

  document.querySelectorAll('.coin').forEach(c=>{
    c.ondragstart=e=>e.dataTransfer.setData('text', e.target.id);
  });
}

function checkSlots(){
  let allCorrect=true;
  document.querySelectorAll('.slot').forEach(slot=>{
    const target=parseInt(slot.dataset.target);
    const sum=Array.from(slot.children).reduce((a,v)=>a+(v.className==='coin'?parseInt(v.innerText):0),0);
    if(sum===target) slot.classList.add('correct'); else slot.classList.remove('correct');
    if(sum!==target) allCorrect=false;
  });
  if(allCorrect) setTimeout(()=>alert('クリア！🎉'),100);
}

function setupParticles(num){
  const container=document.getElementById('particles');
  for(let i=0;i<num;i++){
    const p=document.createElement('div');
    p.style.position='absolute';
    p.style.width='6px'; p.style.height='6px';
    p.style.borderRadius='50%';
    p.style.background='rgba(255,255,255,0.7)';
    p.style.left=Math.random()*window.innerWidth+'px';
    p.style.top=Math.random()*window.innerHeight+'px';
    p.style.animation=`particleMove ${3+Math.random()*3}s linear infinite alternate`;
    container.appendChild(p);
  }
}

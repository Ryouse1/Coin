let stack=[], targets=[];

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startBtn').addEventListener('click', ()=>{
    document.getElementById('title-screen').style.display='none';
    document.getElementById('game-screen').style.display='block';
    setupParticles(50);
    setupGame();
  });
});

function setupGame(){
  const diff = document.getElementById('difficulty').value;
  let slotCount;
  if(diff==='easy') slotCount = 2;
  else if(diff==='normal') slotCount = 3;
  else slotCount = 4;

  // まず答え（枠の合計）を生成
  targets = [];
  for(let i=0;i<slotCount;i++){
    targets.push(0); // 初期値0、後でコイン分配で決める
  }

  // コインの合計を決める
  let totalCoins = 0;
  const coinCount = slotCount*2 + Math.floor(Math.random()*3); // 適当にコイン数
  stack = [];
  for(let i=0;i<coinCount;i++){
    const val = Math.floor(Math.random()*5)+1;
    stack.push(val);
    totalCoins += val;
  }

  // 枠ごとの正解をランダムに分ける
  let remaining = totalCoins;
  for(let i=0;i<slotCount-1;i++){
    const val = Math.floor(Math.random()*(remaining-(slotCount-i-1)))+1;
    targets[i] = val;
    remaining -= val;
  }
  targets[slotCount-1] = remaining;
  // シャッフル
  targets.sort(()=>Math.random()-0.5);

  render();
}

function render(){
  const coinsContainer=document.getElementById('coins');
  coinsContainer.innerHTML='';
  stack.forEach((num,i)=>{
    const coin=document.createElement('div');
    coin.className='coin';
    coin.innerText=num;
    coin.id='coin'+i;
    coin.setAttribute('draggable','true');
    coin.addEventListener('dragstart', e=>{
      e.dataTransfer.setData('text/plain', e.target.id);
    });
    coinsContainer.appendChild(coin);
  });

  const slotsContainer=document.getElementById('slots');
  slotsContainer.innerHTML='';
  targets.forEach((t,i)=>{
    const slot=document.createElement('div');
    slot.className='slot';
    slot.dataset.target=t;

    slot.addEventListener('dragover', e=>e.preventDefault());
    slot.addEventListener('dragenter', e=>{
      e.preventDefault();
      slot.style.backgroundColor='rgba(173,216,230,0.5)';
    });
    slot.addEventListener('dragleave', e=>{
      slot.style.backgroundColor='rgba(255,255,255,0.7)';
    });
    slot.addEventListener('drop', e=>{
      e.preventDefault();
      const coinId = e.dataTransfer.getData('text/plain');
      const coin = document.getElementById(coinId);
      slot.appendChild(coin);
      slot.style.backgroundColor='rgba(255,255,255,0.7)';
      checkSlots();
    });

    slotsContainer.appendChild(slot);
  });
}

function checkSlots(){
  let allCorrect=true;
  document.querySelectorAll('.slot').forEach(slot=>{
    const sum = Array.from(slot.children).reduce((a,v)=>a+(v.className==='coin'?parseInt(v.innerText):0),0);
    if(sum===parseInt(slot.dataset.target)) slot.classList.add('correct');
    else { slot.classList.remove('correct'); allCorrect=false; }
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

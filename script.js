let stack = [];
let targets = [];

function setupGame(){
  const diff = document.getElementById('difficulty').value;
  let n, maxNum, slotCount;

  if(diff==='easy'){ n=2+Math.floor(Math.random()*2)*2; maxNum=3; slotCount=2; }
  else if(diff==='normal'){ n=4+Math.floor(Math.random()*2)*2; maxNum=5; slotCount=3; }
  else{ n=6+Math.floor(Math.random()*1)*2; maxNum=8; slotCount=4; }

  // コイン生成
  stack = [];
  for(let i=0;i<n;i++) stack.push(Math.floor(Math.random()*maxNum)+1);

  // 枠生成（簡単にランダム合計）
  targets = [];
  for(let i=0;i<slotCount;i++){
    targets.push(Math.floor(Math.random()*maxNum*2)+2); // 目標合計
  }

  render();
}

// 表示
function render(){
  const coinsContainer = document.getElementById('coins');
  coinsContainer.innerHTML='';
  stack.forEach((num,i)=>{
    const coin = document.createElement('div');
    coin.className='coin';
    coin.innerText=num;
    coin.draggable=true;
    coin.id='coin'+i;
    coinsContainer.appendChild(coin);
  });

  // 枠
  const slotsContainer = document.getElementById('slots');
  slotsContainer.innerHTML='';
  targets.forEach((t,i)=>{
    const slot = document.createElement('div');
    slot.className='slot';
    slot.dataset.target=t;
    slot.innerHTML=`合計 ${t}`;
    slotsContainer.appendChild(slot);

    slot.ondragover = e => e.preventDefault();
    slot.ondrop = e=>{
      e.preventDefault();
      const coinId = e.dataTransfer.getData('text');
      const coin = document.getElementById(coinId);
      slot.appendChild(coin);
      checkSlots();
    };
  });

  // ドラッグ開始
  document.querySelectorAll('.coin').forEach(c=>{
    c.ondragstart = e => e.dataTransfer.setData('text', e.target.id);
  });
}

// スロットチェック
function checkSlots(){
  let allCorrect = true;
  document.querySelectorAll('.slot').forEach(slot=>{
    const target = parseInt(slot.dataset.target);
    const sum = Array.from(slot.children).reduce((a,v)=>{
      return a + (v.className==='coin'?parseInt(v.innerText):0);
    },0);
    if(sum!==target) allCorrect=false;
  });
  if(allCorrect) setTimeout(()=>alert('クリア！🎉'),100);
}

// 初期ゲーム
setupGame();

let stack = [], targets = [];

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  startBtn.addEventListener('click', () => {
    document.getElementById('title-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    setupParticles(30); // 軽めに
    setupGame();
  });
});

// ゲームセットアップ
function setupGame() {
  const diff = document.getElementById('difficulty').value;
  const slotCount = diff === 'easy' ? 2 : diff === 'normal' ? 3 : 4;

  // コイン生成
  const coinCount = slotCount * 2 + Math.floor(Math.random() * 3);
  stack = [];
  let totalCoins = 0;
  for (let i = 0; i < coinCount; i++) {
    const val = Math.floor(Math.random() * 5) + 1;
    stack.push(val);
    totalCoins += val;
  }

  // 枠ごとの正解値をランダムに分配
  targets = Array(slotCount).fill(0);
  let remaining = totalCoins;
  for (let i = 0; i < slotCount - 1; i++) {
    const val = Math.floor(Math.random() * (remaining - (slotCount - i - 1))) + 1;
    targets[i] = val;
    remaining -= val;
  }
  targets[slotCount - 1] = remaining;
  targets.sort(() => Math.random() - 0.5);

  render();
}

// 描画
function render() {
  const coinsContainer = document.getElementById('coins');
  coinsContainer.innerHTML = '';
  stack.forEach((num, i) => {
    const coin = document.createElement('div');
    coin.className = 'coin';
    coin.innerText = num;
    coin.id = 'coin' + i;
    coin.setAttribute('draggable', 'true');

    // ドラッグ開始時
    coin.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', e.target.id);
    });

    coinsContainer.appendChild(coin);
  });

  const slotsContainer = document.getElementById('slots');
  slotsContainer.innerHTML = '';
  targets.forEach((t, i) => {
    const slot = document.createElement('div');
    slot.className = 'slot';
    slot.dataset.target = t;

    // ドロップ許可
    slot.addEventListener('dragover', e => e.preventDefault());

    // ドロップ処理
    slot.addEventListener('drop', e => {
      e.preventDefault();
      const coinId = e.dataTransfer.getData('text/plain');
      const coin = document.getElementById(coinId);
      slot.appendChild(coin);
      checkSlots();
    });

    slotsContainer.appendChild(slot);
  });
}

// 正解判定
function checkSlots() {
  let allCorrect = true;
  document.querySelectorAll('.slot').forEach(slot => {
    const sum = Array.from(slot.children).reduce(
      (a, v) => a + (v.className === 'coin' ? parseInt(v.innerText) : 0),
      0
    );
    if (sum === parseInt(slot.dataset.target)) slot.classList.add('correct');
    else { slot.classList.remove('correct'); allCorrect = false; }
  });

  if (allCorrect) {
    setTimeout(() => {
      alert('クリア！🎉');
      document.getElementById('game-screen').style.display = 'none';
      document.getElementById('title-screen').style.display = 'flex';
      document.getElementById('coins').innerHTML = '';
      document.getElementById('slots').innerHTML = '';
    }, 100);
  }
}

// 軽量パーティクル
function setupParticles(num) {
  const container = document.getElementById('particles');
  container.innerHTML = '';
  for (let i = 0; i < num; i++) {
    const p = document.createElement('div');
    p.style.position = 'absolute';
    p.style.width = '6px';
    p.style.height = '6px';
    p.style.borderRadius = '50%';
    p.style.background = 'rgba(255,255,255,0.7)';
    p.style.left = Math.random() * window.innerWidth + 'px';
    p.style.top = Math.random() * window.innerHeight + 'px';
    p.style.pointerEvents = 'none';
    container.appendChild(p);
  }
}

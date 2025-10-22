/* 全体背景 */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #ffecd2, #fcb69f);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

/* タイトル画面 */
#title-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
}

h1 {
  font-size: 48px;
  color: #8B4513;
  text-shadow: 3px 3px 6px #fff, 0 0 10px #fcb69f;
  margin-bottom: 30px;
}

/* スタートボタン */
#startBtn {
  font-size: 24px;
  padding: 15px 40px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(to bottom, #ffd700, #ffb700);
  box-shadow: 0 5px #b38600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
#startBtn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px #b38600;
}
#startBtn:active {
  transform: translateY(2px);
  box-shadow: 0 3px #b38600;
}

/* 難易度セレクト */
select {
  font-size: 18px;
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 2px solid #aaa;
  background: linear-gradient(to bottom, #fff, #ffe680);
}

/* コイン */
#coins {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  min-height: 80px;
}

.coin {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fffacd, #ffd700);
  box-shadow: 2px 2px 6px rgba(0,0,0,0.3);
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  cursor: grab;
  transition: transform 0.2s;
}
.coin:active { transform: scale(1.2); }

/* 枠 */
#slots {
  display: flex;
  flex-wrap: wrap;
  min-height: 100px;
  justify-content: center;
}

.slot {
  width: 120px;
  height: 100px;
  border: 3px dashed #333;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
  font-size: 16px;
  background-color: rgba(255,255,255,0.7);
  border-radius: 12px;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
  transition: background-color 0.3s;
}
.slot.correct {
  background-color: #90ee90;
  border-color: #008000;
}

/* ゲーム画面全体 */
#game-screen h2 {
  color: #8B4513;
  text-shadow: 1px 1px 3px #fff;
}

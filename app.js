const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

let currentInput = '0'; // 現在の入力値
let shouldResetDisplay = false; // 計算後にディスプレイをリセットするかどうか

// ボタンクリックのイベントリスナー
buttons.addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;

    const btn = e.target;
    const value = btn.dataset.value;

    handleInput(value);
});

// 入力処理のメイン関数
function handleInput(value) {
    if (value === 'C') {
        clearAll();
    } else if (value === '=') {
        calculate();
    } else {
        appendValue(value);
    }
    updateDisplay();
}

// 値を追記する関数
function appendValue(value) {
    // 計算直後 or 初期状態'0'の場合
    if (shouldResetDisplay || currentInput === '0') {
        // オペレーターで始まるのを防ぐ（ただし、マイナスは許可するなどの拡張も可能）
        if (['+', '*', '/'].includes(value)) {
             // 何もしない、またはエラー表示
             return;
        }
        currentInput = value;
        shouldResetDisplay = false;
    } else {
        currentInput += value;
    }
}

// 計算を実行する関数
function calculate() {
    try {
        // 'eval'はセキュリティリスクがあるため、実際のプロダクトでは
        // パーサーを自作するか、安全なライブラリを使用することが推奨されます。
        // このサンプルではシンプルさのために使用します。
        const result = eval(currentInput.replace(/×/g, '*').replace(/÷/g, '/'));
        
        // 結果が数値でない場合や、無限大になった場合
        if (isNaN(result) || !isFinite(result)) {
            currentInput = 'Error';
        } else {
            // 小数点以下の桁数を調整
            currentInput = String(Math.round(result * 1e12) / 1e12);
        }
    } catch (error) {
        currentInput = 'Error';
    }
    shouldResetDisplay = true;
}

// クリアする関数
function clearAll() {
    currentInput = '0';
    shouldResetDisplay = false;
}

// ディスプレイを更新する関数
function updateDisplay() {
    display.textContent = currentInput;
}

// 初期表示
updateDisplay();

const weights = [2, 3, 4, 5];
const values = [3, 4, 5, 8];
const n = weights.length;
const W = 10;

let dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createTableHTML(dp) {
    let html = '<table class="table">';
    html += '<tr><th>i/w</th>' + Array.from({ length: W + 1 }, (_, w) => `<th>${w}</th>`).join('') + '</tr>';
    for (let i = 0; i <= n; i++) {
        html += `<tr><th>${i}</th>`;
        for (let w = 0; w <= W; w++) {
            html += `<td id="cell-${i}-${w}">${dp[i][w]}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    return html;
}

async function startKnapsack() {
    document.getElementById('result').innerText = '';
    dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));
    document.getElementById('table-container').innerHTML = createTableHTML(dp);

    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            await sleep(100);
            let cell = document.getElementById(`cell-${i}-${w}`);
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
            cell.classList.add("highlight");
            cell.innerText = dp[i][w];
            await sleep(100);
            cell.classList.remove("highlight");
        }
    }

    let res = dp[n][W];
    let w = W;
    let items = [];
    for (let i = n; i > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            items.push(i);
            w -= weights[i - 1];
        }
    }
    document.getElementById('result').innerText = `Максимальна цінність: ${res}. Обрані предмети: ${items.reverse().join(', ')}`;
}

const data = {
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: ['#ffb6c1', '#ffd1dc', '#d1c4e9', '#b2dfdb', '#ffcc80'],
  }]
};

const ctx = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(ctx, {
  type: 'pie',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    }
  }
});

function addEntry() {
  const category = document.getElementById('category').value;
  const amount = parseInt(document.getElementById('amount').value);

  const index = data.labels.indexOf(category);
  if (index !== -1) {
    data.datasets[0].data[index] += amount;
  } else {
    data.labels.push(category);
    data.datasets[0].data.push(amount);
  }

  // レグコメント切り替え
  const comment = document.getElementById('reg-comment');
  if (category.includes("課金")) {
    comment.textContent = "また課金でちゅか！？";
  } else if (category.includes("おやつ")) {
    comment.textContent = "おやつもらってうれしいでちゅ〜";
  } else if (category.includes("支出")) {
    comment.textContent = "今月けっこう使ってるでちゅ…";
  } else {
    comment.textContent = "いい感じでちゅ！";
  }

  // 履歴追加
  const list = document.getElementById('history-list');
  const item = document.createElement('li');
  item.textContent = \`\${new Date().toLocaleDateString()} - \${category}：\${amount}円\`;
  list.appendChild(item);

  saveData();
  pieChart.update();
}

function saveData() {
  localStorage.setItem('regData', JSON.stringify(data));
}

function loadData() {
  const saved = localStorage.getItem('regData');
  if (saved) {
    const parsed = JSON.parse(saved);
    data.labels = parsed.labels;
    data.datasets[0].data = parsed.datasets[0].data;
    pieChart.update();
  }
}

window.onload = () => {
  loadData();
};

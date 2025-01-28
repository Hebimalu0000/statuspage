// JSON データの取得先 URL
const apiUrl = './status.json';

// HTMLのリスト要素にステータス情報を表示する関数
async function renderStatus() {
  const statusList = document.getElementById('status-list');
  statusList.innerHTML = '';

  try {
    const response = await fetch(apiUrl);
    const statuses = await response.json();

    statuses.forEach(status => {
      const li = document.createElement('li');
      li.textContent = `${status.name}: ${status.status} (最終更新: ${status.lastUpdated})`;
      li.classList.add(status.status);
      statusList.appendChild(li);
    });
  } catch (error) {
    console.error('データの取得に失敗しました:', error);
    // エラー表示など、適切な処理を追加
  }
}

// ページ読み込み時にステータスを表示
window.onload = renderStatus;

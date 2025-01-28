// JSON データの取得先 URL
const apiUrl = './status.json';

// HTMLのリスト要素にステータス情報を表示する関数
async function renderStatus() {
  const statusList = document.getElementById('status-list');
  statusList.innerHTML = '';

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }

    const statuses = await response.json();

    statuses.forEach(status => {
      const li = document.createElement('li');
      li.textContent = `${status.name}: ${status.status} (最終更新: ${status.lastUpdated})`;
      li.classList.add(status.status);
      statusList.appendChild(li);
    });
  } catch (error) {
    console.error('データの取得に失敗しました:', error);
    alert(`データの取得に失敗しました: ${error.message}`);
    
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'ステータス情報の取得に失敗しました。時間を置いて再度お試しください。';
    errorMessage.style.color = 'red';
    statusList.appendChild(errorMessage);
  }
}

// ページ読み込み時にステータスを表示
window.onload = function() {
  renderStatus();
};

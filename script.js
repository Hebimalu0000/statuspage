// JSON データの取得先 URL
const apiUrl = './status.json?status';

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
      let msg = '';
      let iclass = '';

      // ステータスごとのメッセージとアイコンを設定
      switch (status.status) {
        case 'success':
          msg = '利用できます';
          iclass = 'fa-check-circle';
          break;
        case 'error':
          msg = '利用できません';
          iclass = 'fa-times-circle';
          break;
        case 'warning':
          msg = '利用中です';
          iclass = 'fa-exclamation-triangle';
          break;
        case 'info':
          msg = 'メンテナンス中です';
          iclass = 'fa-exclamation-circle';
          break;
        default:
          msg = '不明なステータス';
          iclass = 'fa-question-circle';
          break;
      }

      // ステータス情報をHTMLに追加
      const div = document.createElement('div');
      div.innerHTML = `
        <i class="fas ${iclass}"></i>
        <p><b>${status.name}</b> ${msg}</p>
        <span>(最終更新: ${status.lastUpdated})</span>
      `;
      div.classList.add('alert', `alert-box-${status.status}`);
      statusList.appendChild(div);
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
  setTimeout(() => {
　　 renderStatus();
  },60000);
};

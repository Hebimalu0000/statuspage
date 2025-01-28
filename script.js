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

    if (status.status ==　"success") {
      var msg = "利用できます" ;
      var iclass = "fa-check-circle" ;
    }

    if (status.status ==　"error") {
      var msg = "利用できません" ;
      var iclass = "fa-times-circle" ;
    }

    if (status.status ==　"warning") {
      var msg = "利用中です" ;
      var iclass = "fa-exclamation-triangle" ;
    }

    if (status.status ==　"info") {
      var msg = "メンテナンス中です" ;
      var iclass = "fa-exclamation-circle" ;
    }

    statuses.forEach(status => {
      const div = document.createElement('div');
      div.innerHtml = `<i class="fas ${iclass}"></i><p><b>${status.name}</b> ${msg}</p>(最終更新: ${status.lastUpdated})`;
      div.classList.add(`alert-box alert-box-${status.status}`);
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
};

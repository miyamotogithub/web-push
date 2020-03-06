// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBJQ9zfamI1Ewgmh4ZNpNJ_7R1FA8p0NqA",
    authDomain: "webpush-d22d0.firebaseapp.com",
    databaseURL: "https://webpush-d22d0.firebaseio.com",
    projectId: "webpush-d22d0",
    storageBucket: "webpush-d22d0.appspot.com",
    messagingSenderId: "511096896615",
    appId: "1:511096896615:web:6b82314947dddf524768c2"
};
const btnSubscribe = document.getElementById('btnSubscribe');
const btnUnSubscribe = document.getElementById('btnUnSubscribe');
const textInstanceIdToken = document.getElementById('textInstanceIdToken');
const sendWebPushArea = document.getElementById('sendWebPushArea');
const sendWebPush = document.getElementById('sendWebPush');

// メッセージング オブジェクトの取得
const messaging = firebase.messaging();

// アプリにウェブ認証情報を設定する
messaging.usePublicVapidKey("BFAaREMWt7fx1KXI34GTC23oC7Qy8LZsY2DyN5O20HpV29J1WqnbCvaZPLiQRii9mw0lNycbUcC5inNy523WG1Y");

// 権限要求
function requestPermission() {
	// 通知を受信する権限を要求する
	messaging.requestPermission().then(function() {
		// 現在の登録トークンの取得
		messaging.getToken().then(function(token) {
			textInstanceIdToken.value = token;
			btnSubscribe.style.display = 'none';
			btnUnSubscribe.style.display = 'block';
			sendWebPushArea.style.display = 'block';
			sendWebPush.value = 'https://andus.heteml.jp/firebase_cloud_messaging/send.php?id=' + token;
		}).catch(function(err) {
			textInstanceIdToken.value = 'トークンの取得に失敗しました（' + err + '）。';
		});
	}).catch(function(err) {
		textInstanceIdToken.value = '通知の許可が得られませんでした（' + err + '）。';
	});
}

// トークン削除
function deleteToken() {
	// トークン取得
	messaging.getToken().then(function(currentToken) {
		// トークン削除
		messaging.deleteToken(currentToken).then(function() {
			textInstanceIdToken.value = 'トークンが削除されました';
			btnSubscribe.style.display = 'block';
			btnUnSubscribe.style.display = 'none';
			sendWebPushArea.style.display = 'none';
			sendWebPush.value = '';
		}).catch(function(err) {
			textInstanceIdToken.value = 'トークンの削除に失敗しました（' + err + '）。';
		});
	}).catch(function(err) {
		textInstanceIdToken.value = 'トークンの取得に失敗しました（' + err + '）。';
	});
}

// 初期化
window.onload = function() {
	// イベント登録
	btnSubscribe.onclick = requestPermission;
	btnUnSubscribe.onclick = deleteToken;
	// トークン取得
	messaging.getToken().then(function(currentToken) {
		if (currentToken) {
			// 本来ここでサーバにトークン送る処理
			//sendTokenToServer(currentToken);
			textInstanceIdToken.value = currentToken;
			btnSubscribe.style.display = 'none';
			btnUnSubscribe.style.display = 'block';
			sendWebPushArea.style.display = 'block';
			sendWebPush.value = 'https://andus.heteml.jp/firebase_cloud_messaging/send.php?id=' + currentToken;
		} else {
			// トークン無い場合
			textInstanceIdToken.value = '通知の許可をしていません。「通知を許可する」を押してください。';
		}
	}).catch(function(err) {
		textInstanceIdToken.value = 'トークンの取得に失敗しました（' + err + '）。';
	});
};

messaging.onMessage(function(payload) {
	console.log('Message received. ', payload);
	// [START_EXCLUDE]
	// Update the UI to include the received message.
	appendMessage(payload);
	// [END_EXCLUDE]
});

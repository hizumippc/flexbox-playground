const previews = document.querySelectorAll('.preview');
let appliedButtons = {};

// クリック処理
	document.querySelectorAll('.code').forEach(codeEl => {
		codeEl.addEventListener('click', () => {

			// カテゴリ取得
				const category = codeEl.dataset.category;

			// 同カテゴリの選択解除
				if (appliedButtons[category]) {
					appliedButtons[category].classList.remove('selected');
				}

			// 選択状態にする
				appliedButtons[category] = codeEl;
				codeEl.classList.add('selected');

			// CSSプロパティ変換
				let cssProp = '';
				switch(category){
					case 'display': cssProp = 'display'; break;
					case 'flexDirection': cssProp = 'flexDirection'; break;
					case 'flexWrap': cssProp = 'flexWrap'; break;
					case 'justifyContent': cssProp = 'justifyContent'; break;
					case 'alignItems': cssProp = 'alignItems'; break;
					case 'alignContent': cssProp = 'alignContent'; break;
				}

			// 値抽出
				const value = codeEl.innerText
					.split(':')[1]
					.replace(';','')
					.trim();

			// 全プレビューに適用
				previews.forEach(p => {
					p.style[cssProp] = value;
				});
			
			updateResult();

		});
	});

// まとめてコピー（順番付き）
	function copyAll(event) {

		const cssText = document.getElementById('result').innerText;
		navigator.clipboard.writeText(cssText);

		// ボタン変更	
			const btn = event.target;
			const originalText = btn.innerText;
			btn.innerText = "✔ コピー済み";
			btn.disabled = true;

			setTimeout(() => {
			btn.innerText = originalText;
			btn.disabled = false;
			}, 1500);

	}

function updateResult() {
	const order = [
		'flexDirection',
		'flexWrap',
		'justifyContent',
		'alignItems',
		'alignContent'
	];

	let cssLines = '';

	order.forEach(cat => {
		const el = document.querySelector(`.code[data-category="${cat}"].selected`);
		if (el) cssLines += '  ' + el.innerText + '\n';
	});

	if (!cssLines) {
			cssLines = '/* プロパティを選択してください */\n';
	}

const cssText =
`.container {
display: flex;
${cssLines}}`;

		document.getElementById('result').innerText = cssText;
	}

// リセットボタン
function resetAll() {
	document.querySelectorAll('.selected').forEach(el => {
		el.classList.remove('selected');
	});
	appliedButtons = {};

	previews.forEach(p => {
		p.removeAttribute('style');
		p.style.display = 'flex';
	});
	
	updateResult(); 
}

// 初期処理
document.addEventListener('DOMContentLoaded', () => {
	updateResult();

	previews.forEach(p => {
		p.style.display = 'flex';
	});
});

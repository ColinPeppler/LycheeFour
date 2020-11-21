'use strict';

const page = document.getElementById('a-page')
const buyNowButton = document.getElementById('buy-now-button')

if (buyNowButton != null) {
	const dialog = document.createElement('dialog')
	dialog.id = 'our-dialog';
	dialog.innerHTML = '<div style="height:400px;width:300px"> I am a dialog! </div>';
	page.appendChild(dialog);

	// cancels the onClick
	$("#buy-now-button").click(ev => { ev.preventDefault(); });
	buyNowButton.addEventListener('click', () => {
		dialog.showModal()
	});
}

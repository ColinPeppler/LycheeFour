const page = document.getElementById('a-page')
const buyNowButton = document.getElementById('buy-now-button')
if (buyNowButton != null) {
	const dialog = document.createElement('dialog')
	dialog.id = 'our-dialog';
	dialog.innerHTML = 'I am a dialog!';
	page.appendChild(dialog);

	buyNowButton.addEventListener('click', () => {
		//dialog.show()		//it won't show :(
		alert('yeet')
	});
}


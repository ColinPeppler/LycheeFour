'use strict';

async function injectDialog() {
	/* Create dialog modal */
	const paragraph = "Hey! Looks like this might be an impulsive purchase 👀 Are you sure you need this?"
	const redBtn = redButton("No, put it back", "red-btn")
	const whiteBtn = `
		<div id="white-btn" style="width: 80px; line-height:35px">
			Yes I\'m sure.
		</div>
	`
	const dialog = createDialogElement()
	dialog.innerHTML = getBaseCard(paragraph, redBtn + whiteBtn);

	const page = document.getElementById('a-page')
	page.appendChild(dialog);

	/* Set onClick for close dialog */
	const closeDialog = document.getElementById('close-dialog')
	closeDialog.addEventListener('click', () => {
		dialog.close()
	});

	const buyNowButton = document.getElementById('buy-now-button')
	if (buyNowButton != null) {
		// cancels the onClick
		$("#buy-now-button").click(ev => { ev.preventDefault(); });
		buyNowButton.addEventListener('click', () => {
			dialog.showModal()
		});
	}
}

init().then(() => {
	console.log('init callback')
	injectDialog();
});

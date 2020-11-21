'use strict';


/* Create dialog modal */
const dialog = document.createElement('dialog')
dialog.id = 'our-dialog';
dialog.innerHTML = `
	<div style="height:460px; width:390px; box-shadow:0px 1px 3px #0000002C; border-radius: 5px;">
		I am a dialog! 
	</div>
`;

const page = document.getElementById('a-page')
page.appendChild(dialog);

const buyNowButton = document.getElementById('buy-now-button')
if (buyNowButton != null) {
	// cancels the onClick
	$("#buy-now-button").click(ev => { ev.preventDefault(); });
	buyNowButton.addEventListener('click', () => {
		dialog.showModal()
	});
}

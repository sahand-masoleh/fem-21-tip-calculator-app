const customTip = document.querySelector("#custom-tip");
customTip.addEventListener("focus", handleCustomTip);

function handleCustomTip(event) {
	const radio = event.target.previousElementSibling;
	radio.checked = true;
}

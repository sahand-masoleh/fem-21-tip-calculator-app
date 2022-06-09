// result elements
const tipAmount = document.querySelector("#tip-amount");
const total = document.querySelector("#total");

// things we need to do the calculations
const nums = {
	set bill(value) {
		this._bill = value;
		this.caculate();
	},
	set tip(value) {
		this._tip = value;
		this.caculate();
	},
	set people(value) {
		this._people = value;
		this.caculate();
	},

	caculate() {
		this._total = (this._bill * this._tip) / 100;
		total.innerText = this._total ? this._total.toFixed(2) : "_.__";

		this._tipAmount = this._total / this._people;
		tipAmount.innerText =
			this._tipAmount && this._people ? this._tipAmount.toFixed(2) : "_.__";
	},

	reset() {
		this.bill = null;
		this.tip = null;
		this.people = null;
	},
};

// handle text inputs
// # bill total
const bill = document.querySelector("#bill");
bill.addEventListener("input", (event) => handleTextInputChange("bill", event));
// # number of people
const people = document.querySelector("#people");
people.addEventListener("input", (event) =>
	handleTextInputChange("people", event)
);
// # custom tip
const customTip = document.querySelector("#custom-tip");
customTip.addEventListener("input", (event) =>
	handleTextInputChange("tip", event)
);

function handleTextInputChange(element, event) {
	const { target } = event;
	const errorText = target.nextElementSibling;
	let { value } = target;
	if (target.classList.contains("error")) {
		target.classList.remove("error");
	}
	// if the input contains anything but digits and decimal points
	if (value && !/^\d+(\.\d+)?$/.test(value)) {
		errorText.innerText = "Invalid Number";
		target.classList.add("error");
		nums[element] = null;
		return;
		// if the input is zero
	} else if (value === "0") {
		errorText.innerText = "Can't be zero";
		target.classList.add("error");
		nums[element] = null;
		return;
	}
	nums[element] = value;
}

// handle radio buttons
const tipOptions = document.querySelectorAll(".tip__options");
for (let tipOption of tipOptions) {
	tipOption.addEventListener("click", (event) =>
		handleRadioChange("tip", event)
	);
}

function handleRadioChange(element, event) {
	const { factor } = event.target.dataset;
	if (factor !== "custom") nums[element] = factor;
}

// handle the custom radio button
// deselect other radio buttons when custom is selected
customTip.addEventListener("focus", handleCustomTip);
function handleCustomTip(event) {
	const { previousElementSibling, value } = event.target;
	previousElementSibling.checked = true;
	nums.tip = value || null;
}

// reset
const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", reset);

function reset() {
	bill.value = null;
	for (let tipOption of tipOptions) {
		tipOption.checked = false;
	}
	customTip.value = null;
	people.value = null;
	nums.reset();
	total.innerText = "0.00";
	tipAmount.innerText = "0.00";
}

reset();

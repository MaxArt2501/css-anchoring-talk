const html = String.raw;

/** @type {import('p-slides').PresentationDeckElement} */
const deck = document.querySelector("p-deck");

deck.addEventListener(
	"command",
	/** @param {CommandEvent} event  */
	(event) => {
		if (event.command === "--show") {
			if (event.target instanceof HTMLDialogElement) event.target.show();
		}
	},
	{ capture: true },
);

/** @type {HTMLDialogElement | undefined} */
let activeWindow;

/**
 * @param {HTMLDialogElement} dialog
 * @param {boolean} [active=true]
 */
const setActiveWindow = (dialog, active = true) => {
	const slide = dialog.closest("p-slide");
	if (!slide) return;
	dialog.ariaCurrent = String(active);
	const taskbar = slide.querySelector(".taskbar");
	const btn = taskbar.querySelector(`button[aria-controls="${dialog.id}"]`);
	if (btn) {
		btn.ariaExpanded = String(active);
	} else {
		taskbar.insertAdjacentHTML(
			"beforeend",
			html`<button
				type="button"
				class="btn"
				aria-controls="${dialog.id}"
				aria-expanded="${active}"
			>
				${dialog.querySelector("header img.icon")?.outerHTML ?? ""}
				${dialog.querySelector("header .title")?.outerHTML ?? ""}
			</button>`,
		);
	}
	if (active && activeWindow && activeWindow !== dialog) setActiveWindow(activeWindow, false);
	activeWindow = active ? dialog : undefined;
};

deck.addEventListener(
	"toggle",
	(event) => {
		/** @type {import('p-slides').PresentationSlideElement} */
		const slide = event.target.closest("p-slide");
		if (
			event.target instanceof HTMLDialogElement &&
			event.target.classList.contains("window")
		) {
			const taskbar = slide.querySelector(".taskbar");
			if (event.newState === "open") {
				setActiveWindow(event.target);
			} else {
				const btn = taskbar.querySelector(
					`button[aria-controls="${event.target.id}"]`,
				);
				btn?.remove();
				if (activeWindow === event.target) {
					activeWindow = null;
					const dialog = slide.querySelector("dialog.window:open");
					if (dialog) setActiveWindow(dialog);
				}
			}
		}
	},
	{ capture: true },
);

/** @param {Element[]} fragments */
const toggleFragments = fragments => {
	for (const fragment of fragments) {
		fragment.ariaHidden = fragment.ariaHidden === 'false';
	}
};

deck.addEventListener('p-slides.fragmenttoggle', event => {
	const { fragments } = event.detail;
	for (const fragment of fragments) {
		const isHidden = fragment.ariaHidden === 'true';
		if (fragment instanceof HTMLDialogElement) {
			if (isHidden) fragment.close();
			else {
				const isModal = fragment.ariaModal !== 'false';
				fragment[isModal ? 'showModal' : 'show']()
			}
		} else if (fragment.hasAttribute('popover')) {
			fragment[isHidden ? 'hidePopover' : 'showPopover']();
		}
	}
	const viewTransitionedFragments = fragments.filter(fragment => fragment.getAttribute('p-effect') === 'vt');
	if (viewTransitionedFragments.length) {
		toggleFragments(viewTransitionedFragments);
		document.startViewTransition(() => toggleFragments(viewTransitionedFragments));
	}
});

deck.addEventListener('p-slides.slidechange', event => {
	for (const popover of event.detail.previous.querySelectorAll(':popover-open')) {
		popover.hidePopover();
	}
});

deck.addEventListener(
	"pointerdown",
	(event) => {
		const dialog = event.target.closest('dialog.window');
		if (dialog) {
			setActiveWindow(dialog);
		}
	},
	{ capture: true },
);

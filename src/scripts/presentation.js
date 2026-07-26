document.body.addEventListener(
  "command",
  /** @param {CommandEvent} event  */
  (event) => {
    if (event.command === "--show") {
      if (event.target instanceof HTMLDialogElement) event.target.show();
    }
  },
  { capture: true },
);

document.body.addEventListener(
  "toggle",
  (event) => {
    if (
      event.target instanceof HTMLDialogElement &&
      event.target.classList.contains("window")
    ) {
      const taskbar = event.target.closest("p-slide").querySelector(".taskbar");
      if (event.newState === "open") {
        const btn = document.createElement("button");
        btn.type = "button";
				btn.className = 'btn'
				btn.setAttribute('aria-expanded', "true");
				btn.setAttribute('aria-controls', event.target.id);
				const icon = event.target.querySelector('header img.icon');
				if (icon) btn.appendChild(icon.cloneNode());
				const title = event.target.querySelector('header .title');
				if (title) btn.appendChild(title.cloneNode(true));
				taskbar.appendChild(btn)
      } else {
				const btn = taskbar.querySelector(`button[aria-controls="${event.target.id}"]`);
				btn?.remove();
			}
    }
  },
  { capture: true },
);

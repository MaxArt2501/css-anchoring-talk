declare namespace astroHTML.JSX {
  interface HTMLAttributes {
		/** Slide transition effect */
		effect?: string;
		/** Fragment transition effect */
		'p-effect'?: string;
		/** Fragment transition duration multiplier (default: 1) */
		'p-duration'?: string;
		/** Fragment transition delay multiplier (default: 0) */
		'p-delay'?: string;
		/** Sets the element as a flex container with the given flow specifier (default: row) */
		flex?: string | boolean;
		/** Sets the element as a grid container with the given equally wide columns */
		grid?: string | boolean;
		w?: string;
		h?: string;
		top?: string;
		right?: string;
		bottom?: string;
		left?: string;
	}
  interface SVGAttributes {
		effect?: string;
	}
}

const a: astroHTML.JSX.HTMLAttributes = {
	'p-effect': 43
}
import React from "react";

export default function Favourites({ faves, runSearch }) {
	return (
		<nav className="faves">
			{faves.length > 0 && <span className="text-light">Favourites</span>}
			{faves.length > 0 &&
				faves.map((item) => {
					return (
						<button
							key={item}
							className="tag"
							onClick={(e) => { e.preventDefault(); runSearch(item); }}
						>
							{item}
						</button>
					);
				})}
		</nav>
	);
}

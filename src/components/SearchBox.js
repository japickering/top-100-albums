import React, { useState } from "react";
import SearchIcon from "./SearchIcon";

export default function SearchBox({ mode, runSearch }) {
	const [search, setSearch] = useState("");

	return (
		<form className="search-form" tabIndex="-1" role="search">
			<SearchIcon />
			<input
				type="search"
				className="search corners"
				placeholder={"Search by " + mode}
				aria-autocomplete="none"
				aria-multiline="false"
				autoComplete="off"
				autoCorrect="off"
				spellCheck="false"
				value={search}
				onChange={(e) => setSearch(e.target.value) }
			/>
			<button
				type="submit"
				className="btn-success p-2"
				onClick={(e) => {
					e.preventDefault();
					runSearch(search);
				}}
			>
				Search
			</button>
		</form>
	);
}

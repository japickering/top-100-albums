import { render } from "@testing-library/react";
import App from "./App";
import { API_URL } from "./config";

// Mock API data
const results = [
	{ title: { label: "aliyah" } },
	{ title: { label: "fun lovin criminals" } },
	{ title: { label: "metallica live" } },
];

function searchResults(str, results) {
	return results.filter((r) => r.title.label.includes(str));
}

test("renders app", () => {
	render(<App />);
});

test("can call API with a successful response data", () => {
	fetch(API_URL).then((res) => {
		expect(res).toBeDefined();
	});
});

test("can run a search by title", () => {
	const res = searchResults("aliyah", results);
	expect(res).toBeDefined();
});

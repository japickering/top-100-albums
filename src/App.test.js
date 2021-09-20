import { render } from "@testing-library/react";
// import { API_URL } from "./config";
import data from "./data.json";
import App from "./App";
import formatResults from "./formatResults";

test("renders app", () => {
	render(<App />);
});

// test("API returns response data", () => {
// 	fetch(API_URL).then((res) => {
// 		expect(res).toBeDefined();
// 	});
// });

test("formatResults returns album metadata", () => {
	const res = formatResults(data);
	expect(res[0].artist).toBeDefined();
	expect(res[0].link).toBeDefined();
	expect(res[0].title).toBeDefined();
	expect(res[0].name).toBeDefined();
	expect(res[0].category).toBeDefined();
	expect(res[0].releaseDate).toBeDefined();
	expect(res[0].image).toBeDefined();
});

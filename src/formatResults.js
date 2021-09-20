export default function formatResults(entry) {
	const results = [];

	for (const key in entry) {
		const el = entry[key];

		// check artist link exists
		let link =
			el["im:artist"].hasOwnProperty("attributes") === true
				? el["im:artist"].attributes["href"]
				: "./";

		results.push({
			id: el.id.attributes["im:id"],
			link: el.id.label,
			title: el.title.label,
			name: el["im:name"].label,
			artist: { label: el["im:artist"].label, link: link },
			category: el.category.attributes.label,
			rights: el.rights.label,
			releaseDate: el["im:releaseDate"].attributes.label,
			datestamp: el["im:releaseDate"].label,
			image: el["im:image"][0].label,
			image1: el["im:image"][1].label,
			image2: el["im:image"][2].label,
			// amount: el["im:price"].attributes.amount,
			// currency: el["im:price"].attributes.currency,
		});
	}
	return results;
}

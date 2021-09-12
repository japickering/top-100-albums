import React, { Component } from "react";
import { API_URL } from "./config";
import "./App.css";
import "./styles/layout.css";
import "./styles/card.css";
import "./styles/colours.css";

import SearchBox from "./components/SearchBox";
import Spinner from "./components/Spinner";

function formatAlbumResults(obj) {
	const entries = [];

	for (const key in obj) {
		const el = obj[key];
		// check artist link exists
		let link =
			el["im:artist"].hasOwnProperty("attributes") === true
				? el["im:artist"].attributes["href"]
				: "./";

		entries.push({
			id: el.id.attributes["im:id"],
			link: el.id.label,
			title: el.title.label,
			name: el["im:name"].label,
			artist: { label: el["im:artist"].label, link: link },
			category: el.category.attributes.label,
			rel: el.link.attributes.rel,
			rights: el.rights.label,
			releaseDate: el["im:releaseDate"].attributes.label,
			datestamp: el["im:releaseDate"].label,
			image: el["im:image"][0].label,
			image1: el["im:image"][1].label,
			image2: el["im:image"][2].label,
			amount: el["im:price"].attributes.amount,
			currency: el["im:price"].attributes.currency,
		});
	}
	return entries;
}

async function loadAlbums(context) {
	const response = await fetch(API_URL);
	const json = await response.json();
	let entry = {};

	for (const key in json) {
		// if (Object.hasOwnProperty.call(json, key)) {
		const outer = json[key];
		entry = outer.entry;
		console.log(entry);
		const results = formatAlbumResults(entry);

		context.setState({
			results: results,
			filtered: results,
			loading: false,
		});
		break;
	}
	// }
}

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: [],
			filtered: [],
			loading: true,
		};
		this.searchResults = this.searchResults.bind(this);
	}

	componentDidMount() {
		loadAlbums(this);
	}

	searchResults(str) {
		const { results } = this.state;
		if (results.length > 0) {
			if (str === "" || str.length < 2) {
				this.setState({ filtered: results });
				return;
			} else {
				const arr = results.filter((r) =>
					r.title.toLowerCase().includes(str.toLowerCase())
				);
				arr.length > 0
					? this.setState({ filtered: arr })
					: this.setState({ filtered: [] });
			}
		} else {
			console.log("no search data available");
		}
	}

	render() {
		const { loading, filtered } = this.state;
		return (
			<div className="container bg-light">
				<header className="header flex p-3">
					<a href="./" className="home">
						<h1 className="text-light">Music</h1>
					</a>
					<SearchBox searchResults={this.searchResults} />
				</header>

				{/* <div className="trending pb-2 pl-2">
					<span className="text-light">Trending:</span>
					<button className="tag"
						onClick={(e) => {
							e.preventDefault();
							this.searchResults('Aliyah');
						}}>
						Aliyah
					</button>
				</div> */}

				{loading && <Spinner />}
				{filtered.length > 0 && (
					<div className="content flex">
						{filtered.map((item) => {
							return (
								<div
									key={item.id}
									className="card border-light bg-light mt-2 mb-2 ml-3 p-3"
								>
									<a href={item.link} rel={item.rel}>
										<img
											src={item.image2}
											alt=""
											className="thumbnail rounded"
										/>
									</a>
									<div className="card-header m-2 pb-2">
										<h3 className="text-dark">{item.name}</h3>
									</div>
									<div className="m-2 pb-2">
										<a href={item.artist.link} rel="noreferrer" target="_blank">
											<h3 className="text-success">{item.artist.label}</h3>
										</a>
									</div>
									<div className="card-footer mt-2 pb-2">
										<div className="m-2">
											<span className="text-midgrey">{item.category}</span>
										</div>
										<div className="m-2">
											<span className="text-midgrey">{item.releaseDate}</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
				<footer className="footer p-3">
					<h4 className="text-lightgrey">&copy;ACME Co 2021</h4>
				</footer>
			</div>
		);
	}
}

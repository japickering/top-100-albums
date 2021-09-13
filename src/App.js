import React, { Component } from "react";
import { API_URL } from "./config";
import "./App.css";
import "./styles/layout.css";
import "./styles/card.css";
import "./styles/colours.css";

import externalIcon from "./icons/external.svg";

// components
import SearchBox from "./components/SearchBox";
import Spinner from "./components/Spinner";
import LikeIcon from "./components/LikeIcon";

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
			faves: [],
			loading: true,
		};
		this.searchResults = this.searchResults.bind(this);
		this.onClickLike = this.onClickLike.bind(this);
	}

	componentDidMount() {
		loadAlbums(this);
	}

	componentWillUnmount() {
		this.searchResults = null;
		this.onClickLike = null;
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

	onClickLike(e, label) {
		e.preventDefault();
		const tmp = this.state.faves;
		if(!this.state.faves.includes(label)) {
			tmp.push(label);
			tmp.sort();
			this.setState({ faves: tmp })
		} else {
			return;
		}
	}

	render() {
		const { loading, filtered, faves } = this.state;
		return (
			<div id="top" className="container bg-light">
				<header className="header flex p-3">
					<a href="./" className="home">
						<h1 className="text-light">Music</h1>
					</a>
					<SearchBox searchResults={this.searchResults} />
					<div className="trending">
						{faves.length > 0 && (
							<span className="text-light">Favourites</span>
						)}
						{faves.length > 0 && (
							faves.map((item) => {
								return (
									<button key={item} className="tag"
										onClick={(e) => {
											e.preventDefault();
											this.searchResults(item);
										}}>
										{item}
									</button>
								);
							})
						)}
					</div>
				</header>

				{loading && <Spinner />}
				{filtered.length === 0 && (<div className="content"></div>)}
				{filtered.length > 0 && (
					<div className="content flex">
						{filtered.map((item) => {
							return (
								<div
									key={item.id}
									className="card border-light bg-light mt-2 mb-2 ml-3 p-3"
								>
									<a href={item.link} className="external" rel="noreferrer" target="_blank">
										<img
											src={item.image2}
											className="thumbnail rounded"
											alt={item.name}
										/>
										<img
											src={externalIcon}
											className="icon-external"
											alt="View on Apple Music store"
										/>
									</a>
									<div className="card-header m-2 pb-2">
										<h3 className="text-dark">{item.name}</h3>
									</div>
									<div className="m-2 pb-2">
										<a href={item.artist.link} className="external" rel="noreferrer" target="_blank">
											<h3 className="text-success">
												{item.artist.label}
												<img
													src={externalIcon}
													className="icon-external"
													alt="View on Apple Music store"
														/>
											</h3>
										</a>
									</div>
									<div className="card-footer mt-2 pb-2">
										<div className="m-2">
											<span className="text-midgrey">{item.category}</span>
										</div>
										<div className="m-2">
											<span className="text-midgrey">{item.releaseDate}</span>
										</div>

										<div className="m-2">
											<button
												key={item}
												className={this.state.faves.includes(item.artist.label) ? "like active" : "like" }
												onClick={(e) => this.onClickLike(e, item.artist.label)}
											>
												<LikeIcon />
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}

				<footer className="footer p-2">
					<a href="#top">
						<h4 className="text-light text-center">back to top</h4>
					</a>
				</footer>
			</div>
		);
	}
}

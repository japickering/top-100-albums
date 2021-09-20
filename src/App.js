import React, { Component } from "react";
import { API_URL } from "./config";
import formatResults from "./formatResults";

import "./globals.css";
import "./styles/layout.css";
import "./styles/card.css";
import "./styles/colours.css";

// components
import Spinner from "./components/Spinner";
import SearchBox from "./components/SearchBox";
import ExternalIcon from "./components/ExternalIcon";
import LikeIcon from "./components/LikeIcon";
import Favourites from "./components/Favourites";

async function loadAlbums(self) {
	const response = await fetch(API_URL);
	const json = await response.json();
	let entry = {};

	for (const key in json) {
		// if (Object.hasOwnProperty.call(json, key)) {
		const outer = json[key];
		entry = outer.entry;
		// console.log('entry: ', entry);
		const results = formatResults(entry);

		self.setState({
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
			mode: "artist",
			loading: true,
		};

		this.runSearch = this.runSearch.bind(this);
		this.searchArtist = this.searchArtist.bind(this);
		this.searchTitle = this.searchTitle.bind(this);
		this.searchGenre = this.searchGenre.bind(this);
		this.onClickLike = this.onClickLike.bind(this);
	}

	componentDidMount() {
		loadAlbums(this);
	}

	runSearch(str) {
		const { results } = this.state;
		if (str === "" || str.length < 2) {
			this.setState({ filtered: results });
			return;
		}
		switch (this.state.mode) {
			case "artist":
				this.searchArtist(str);
				return;
			case "title":
				this.searchTitle(str);
				return;
			case "genre":
				this.searchGenre(str);
				return;
			default:
				break;
		}
	}

	searchArtist(str) {
		const { results } = this.state;
		if (results.length > 0) {
			const arr = results.filter((r) =>
				r.artist.label.toLowerCase().includes(str.toLowerCase())
			);
			arr.length > 0
				? this.setState({ filtered: arr })
				: this.setState({ filtered: [] });
		}
	}

	searchTitle(str) {
		const { results } = this.state;
		if (results.length > 0) {
			const arr = results.filter((r) =>
				r.title.toLowerCase().includes(str.toLowerCase())
			);
			arr.length > 0
				? this.setState({ filtered: arr })
				: this.setState({ filtered: [] });
		}
	}

	searchGenre(str) {
		const { results } = this.state;
		if (results.length > 0) {
			const arr = results.filter((r) =>
				r.category.toLowerCase().includes(str.toLowerCase())
			);
			arr.length > 0
				? this.setState({ filtered: arr })
				: this.setState({ filtered: [] });
		}
	}

	onClickLike(e, label) {
		e.preventDefault();
		const tmp = this.state.faves;
		if(!tmp.includes(label)) {
			tmp.push(label);
			tmp.sort();
			this.setState({ faves: tmp })
		} else {
			return;
		}
	}

	render() {
		const { loading, mode, filtered, faves } = this.state;
		return (
			<div id="top" className="container bg-light">
				<header className="header flex p-3">
					<a href="./" className="home">
						<h1 className="text-light">Music</h1>
					</a>
					<SearchBox mode={mode} runSearch={this.runSearch} />
					<Favourites faves={faves} runSearch={this.runSearch} />
					{process.env.NODE_ENV === 'development' && (
						<div className="debug text-midgrey">
							{process.env.REACT_APP_DEV_MODE}
						</div>
					)}
				</header>

				{loading && <Spinner />}
				{filtered.length === 0 && loading && (<div className="content"></div>)}
				{filtered.length === 0 && !loading && (<div className="content">No matches found</div>)}
				{filtered.length > 0 && (
					<div className="content flex">
						{filtered.map((item) => {
							return (
								<div
									key={item.id}
									className="card border-light bg-light mt-2 mb-2 ml-3 p-3"
								>
									<a href={item.link} className="external" rel="noreferrer" title="View on Apple Music" target="_blank">
										<img src={item.image2} className="thumbnail rounded" alt={item.name} />
										<ExternalIcon />
									</a>
									<div className="card-header m-2 pb-2">
										<h3 className="text-dark">{item.name}</h3>
									</div>
									<div className="m-2">
										<a href={item.artist.link} className="external" rel="noreferrer" title="View on Apple Music" target="_blank">
											<h3 className="text-success">
												{item.artist.label}
												<ExternalIcon />
											</h3>
										</a>
									</div>
									<div className="card-footer mt-1 pb-2">
										<div className="m-2">
											<span className="text-midgrey">{item.category}</span>
										</div>
										<div className="m-2">
											<span className="text-midgrey">{item.releaseDate}</span>
										</div>

										<div className="m-2">
											<button
												key={item}
												className={faves.includes(item.artist.label) ? "like active" : "like" }
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
					{filtered.length > 0 && (
					<a href="#top">
						<h4 className="text-light text-center">back to top</h4>
					</a>
					)}
				</footer>
			</div>
		);
	}
}

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

// capture window scrolling
const scrollMin = 300;
let scrollY = 0;

function onWindowScroll() {
	scrollY = window.scrollY;
	console.log("scrollY:", scrollY);

	if (scrollY >= scrollMin) {
		document.querySelector('#footer').classList.remove('hide');
	} else {
		document.querySelector('#footer').classList.add('hide');
	}
}
window.addEventListener('scroll', onWindowScroll, false);

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
			scrollMin: 200
		};

		this.runSearch = this.runSearch.bind(this);
		this.onClickLike = this.onClickLike.bind(this);
	}

	componentDidMount() {
		loadAlbums(this);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', onWindowScroll);
	}

	runSearch(str) {
		const { results, mode } = this.state;

		// if search query is invalid then reset search results
		if (str === "" || str.length < 2) {
			this.setState({ filtered: results });
			return;
		}

		if (results.length > 0) {
			// filter results based on mode
			let arr = [];
			switch (mode) {
				case "artist":
					arr = results.filter((r) =>
						r.artist.label.toLowerCase().includes(str.toLowerCase())
					);
					break;
				case "title":
					arr = results.filter((r) =>
						r.title.toLowerCase().includes(str.toLowerCase())
					);
					break;
				case "genre":
					arr = results.filter((r) =>
						r.category.toLowerCase().includes(str.toLowerCase())
					);
					break;
				default:
					break;
			}
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
					{/* {process.env.NODE_ENV === 'development' && (
						<div className="debug text-midgrey">
							{process.env.REACT_APP_DEV_MODE}
						</div>
					)} */}
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

				<footer id="footer" className="footer sticky-footer text-right p-1">
					<a href="#top">
						<h4 className="inline-block text-light">back to top</h4>
						<span className="inline-block m-1 arrow-up"></span>
					</a>
				</footer>
			</div>
		);
	}
}

import React, { Component } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { SearchBox } from 'react-instantsearch-dom';
import { Hits } from 'react-instantsearch-dom';
import { Highlight } from 'react-instantsearch-dom';
import { resultService } from '../../service/resultService';
import swal from 'sweetalert';
import jwt from 'jsonwebtoken';

const token = localStorage.getItem("jwtToken");

class SearchPart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            results: '',
            recommend: 0
        }
    }

    componentWillMount() {
        if (token) {
            const authUser = jwt.decode(token).username;
            resultService.allResult(authUser)
                .then((res) => {
                    this.setState({
                        results: res.results
                    })
                })
        }
    }

    search = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    select = (hit, e) => {
        this.setState({
            selectSearchItem: hit
        })
    }

    selectResult = (keyword, recommend, hit, e) => {
        this.setState({
            search: keyword,
            recommend: recommend,
            selectResult: hit
        })
    }

    recommend = () => {
        swal({
            title: "Are you sure?",
            text: "If you recommend this Item, please click OK!",
            icon: "success",
            buttons: true,
            dangerMode: true,
        })
            .then((confirm) => {
                if (confirm) {
                    swal({
                        text: 'Please Write Comment Here!',
                        content: "input",
                        button: {
                            text: "OK",
                            closeModal: true,
                        },
                    })
                        .then((value) => {
                            if (token) {
                                const authUser = jwt.decode(token).username;
                                resultService.recommend(authUser, value, this.state.search, this.state.selectSearchItem)
                                    .then((res) => {
                                        this.setState({
                                            results: res.results
                                        })
                                    })
                            }
                        });
                } else {
                    swal("You clicked the Cancel!");
                }
            });
    }

    reject = () => {
        swal({
            title: "Are you sure?",
            text: "If you reject this Item, please click OK!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((confirm) => {
                if (confirm) {
                    swal({
                        text: 'Please Write Comment Here!',
                        content: "input",
                        button: {
                            text: "OK",
                            closeModal: true,
                        },
                    })
                        .then((value) => {
                            if (token) {
                                const authUser = jwt.decode(token).username;
                                resultService.reject(authUser, value, this.state.search, this.state.selectSearchItem)
                                    .then((res) => {
                                        this.setState({
                                            results: res.results
                                        })
                                    })
                            }
                        });
                } else {
                    swal("You clicked the Cancel!");
                }
            });
    }

    render() {
        const Hit = ({ hit }) =>
            <div className="hit row" onClick={this.select.bind(this, hit)} style={{ cursor: "pointer" }}>
                <div className="hitImage col-md-5 col-sm-12">
                    <img src={hit.image} />
                </div>
                <div className="hitName col-md-5 col-sm-12">
                    <Highlight attribute="name" hit={hit} />
                </div>
                {this.state.selectResult !== undefined && this.state.selectResult.objectID === hit.objectID && (
                    <div className="col-md-2 col-sm-12">
                        {this.state.recommend === 1 && (<i className="fa fa-thumbs-o-up"></i>)}
                        {this.state.recommend === 0 && (<i className="fa fa-thumbs-down"></i>)}
                    </div>
                )}
            </div>

        const Content = () =>
            <div className="content">
                <Hits hitComponent={Hit} />
            </div>

        return (
            <div className="col-md-10">
                <div className="row">
                    <div className="col-md-5">
                        <InstantSearch
                            appId="latency"
                            apiKey="3d9875e51fbd20c7754e65422f7ce5e1"
                            indexName="bestbuy"
                        >
                            <header className="mb-3">
                                <SearchBox translations={{ placeholder: 'Google Search' }} defaultRefinement={this.state.search} onChange={this.search} />
                            </header>
                            <main>
                                <Content />
                            </main>
                        </InstantSearch>
                    </div>
                    <div className="col-md-7">
                        <div className="recommend_room">
                            {this.state.results !== '' && this.state.results.map((row, index) => (
                                <div class="result" key={index} onClick={this.selectResult.bind(this, row.keyword, row.recommend, row.details[0])}>
                                    <span>{row.recommender}(</span>
                                    {row.recommend === 1 && (<span><i className="fa fa-thumbs-o-up"></i> {row.resultID}</span>)}
                                    {row.recommend === 0 && (<span><i className="fa fa-thumbs-down"></i> {row.resultID}</span>)}
                                    <span>):{row.comment}</span>
                                </div>
                            ))}
                        </div>
                        <div className="search_result mt-3">
                            {this.state.selectSearchItem !== undefined && (
                                <div className="row">
                                    <div className="col-md-5" style={{ textAlign: "center" }}>
                                        <a href={this.state.selectSearchItem.url}>
                                            <img src={this.state.selectSearchItem.image} width="100%" height="100%" alt="Image" title={this.state.selectSearchItem.name} />
                                        </a>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <span>Name : </span>
                                            </div>
                                            <div className="col-md-7">
                                                <span>{this.state.selectSearchItem.name}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <span>Type : </span>
                                            </div>
                                            <div className="col-md-7">
                                                <span>{this.state.selectSearchItem.type}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <span>Category : </span>
                                            </div>
                                            <div className="col-md-7">
                                                <span>{this.state.selectSearchItem.category}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <span>Manufacturer : </span>
                                            </div>
                                            <div className="col-md-7">
                                                <span>{this.state.selectSearchItem.manufacturer}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <span>Description : </span>
                                            </div>
                                            <div className="col-md-7">
                                                <span>{this.state.selectSearchItem.shortDescription}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <span>Shipping : </span>
                                            </div>
                                            <div className="col-md-7">
                                                <span>{this.state.selectSearchItem.shipping}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <span>SalePrice : </span>
                                            </div>
                                            <div className="col-md-7">
                                                <span>{this.state.selectSearchItem.salePrice}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <span>SalePrice_range : </span>
                                            </div>
                                            <div className="col-md-7">
                                                <span>{this.state.selectSearchItem.salePrice_range}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {this.state.selectSearchItem !== undefined && (
                                <div className="button_group">
                                    <button className="btn btn-success mr-2" onClick={this.recommend}><i className="fa fa-thumbs-up"> Recommend</i></button>
                                    <button className="btn btn-danger" onClick={this.reject}><i className="fa fa-thumbs-o-down"> Reject</i></button>
                                </div>
                            )}
                            {this.state.selectSearchItem === undefined && (
                                <div className="blank">
                                    <label className="control-label">
                                        No Result to show you.
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchPart;

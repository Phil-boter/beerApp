import { Component } from "react";
import { connect } from "react-redux";
import { getBeers } from "../../redux/actions/beerAction";
import PropTypes from "prop-types";

import { Spinner } from "reactstrap";

class Beer extends Component {
    componentDidMount() {
        this.props.getBeers();
    }

    render() {
        let { beers } = this.props.beers;
        return (
            <div
                style={{
                    marginTop: "5rem",
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <h1 style={{}}>BeerComponent</h1>
                <ul>
                    {this.props.beers === [] ? (
                        <div style={{ textAlign: "center" }}>
                            <Spinner
                                size="sm"
                                color="warning"
                                style={{
                                    width: "2rem",
                                    height: "2rem",
                                }}
                            >
                                {""}
                            </Spinner>
                        </div>
                    ) : (
                        beers.map((beer, index) => (
                            <li key={index}>{beer.name}</li>
                        ))
                    )}
                </ul>
            </div>
        );
    }
}

Beer.protoTypes = {
    getBeers: PropTypes.func.isRequired,
    beers: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    beers: state.beer,
});
export default connect(mapStateToProps, { getBeers })(Beer);

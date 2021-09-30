import { Component } from "react";
import { connect } from "react-redux";
import { getHops } from "../../redux/actions/hopAction";
import PropTypes from "prop-types";

import { Table, Spinner } from "reactstrap";

class Hop extends Component {
    componentDidMount() {
        this.props.getHops();
        console.log(this.props.hops.hops);
    }

    renderBitterHops() {
        let bitterHops = [];
        for (let item of this.props.hops.hops) {
            if (item.class === "bitter") {
                bitterHops.push(item);
            }
        }

        return bitterHops.map((hop, index) => (
            <tr key={hop._id}>
                <td>{hop.sort}</td>
                <td>{hop.origin}</td>
                <td>
                    {hop.aroma.map((aroma, index) => (
                        <p key={index}>{aroma}</p>
                    ))}
                </td>
                <td>{hop.alpha} %</td>
                <td>
                    {hop.fitsToBeer.map((style, index) => (
                        <p key={index}>{style}</p>
                    ))}
                </td>
            </tr>
        ));
    }
    renderAromaHops() {
        let aromaHops = [];
        for (let item of this.props.hops.hops) {
            if (item.class === "aroma") {
                aromaHops.push(item);
            }
        }

        return aromaHops.map((hop, index) => (
            <tr key={hop._id}>
                <td>{hop.sort}</td>
                <td>{hop.origin}</td>

                <td>
                    {hop.aroma.map((aroma, index) => (
                        <p key={index}>{aroma}</p>
                    ))}
                </td>
                <td>{hop.alpha} %</td>
                <td>
                    {hop.fitsToBeer.map((style, index) => (
                        <p key={index}>{style}</p>
                    ))}
                </td>
            </tr>
        ));
    }

    renderTableHeader() {
        let tableHeader = [
            "Sort",
            "Origin",
            "Key Flavors",
            "Alpha Acid",
            "Fits to Beerstyle",
        ];
        return tableHeader.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>;
        });
    }

    render() {
        return (
            <div className="hopTable">
                {this.props.hops !== [] ? (
                    <div className="hopTable__container">
                        <div className="hopTable__bitter-hops">
                            <h2>Bitterhops</h2>
                            <Table hover size="sm" responsive bordered>
                                <thead>
                                    <tr>{this.renderTableHeader()}</tr>
                                </thead>
                                <tbody>{this.renderBitterHops()}</tbody>
                            </Table>
                        </div>
                        <div className="hopTable__aroma-hops">
                            <h2>Aromahops</h2>
                            <Table hover size="sm" responsive bordered>
                                <thead>
                                    <tr>{this.renderTableHeader()}</tr>
                                </thead>
                                <tbody>{this.renderAromaHops()}</tbody>
                            </Table>
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: "center" }}>
                        <Spinner
                            size="sm"
                            color="warning"
                            className="hopTable__spinner"
                            style={{
                                width: "2rem",
                                height: "2rem",
                            }}
                        ></Spinner>
                    </div>
                )}
            </div>
        );
    }
}

Hop.protoTypes = {
    getHops: PropTypes.func.isRequired,
    hops: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    hops: state.hop,
});
export default connect(mapStateToProps, { getHops })(Hop);

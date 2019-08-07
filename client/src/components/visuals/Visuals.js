import React from "react";
import Plot from "react-plotly.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Visuals = ({ prices: { historicalPrices } }) => {
  return (
    <div className="container">
      <table className="table table-bordered">
        <tbody>
          <tr key = {"hi"}><td>Hi</td></tr>
          {/* {Object.keys(historicalPrices).forEach(key => {
            return (
              <tr key={key}>
                <td className="text-right">{key}</td>
                <td>{historicalPrices[key]["1. open"]}</td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </div>
    // <Plot
    //   data={[
    //     {
    //       x: Object.keys(historicalPrices),
    //       y: Object.keys(historicalPrices).map(k => {
    //         return historicalPrices[k]["1. open"]
    //       }),
    //       type: 'scatter',
    //       mode: 'lines+points',
    //       marker: {color: 'navy'},
    //     }
    //   ]}
    //   layout={ {width: 320, height: 240} }
    // />
  );
};

Visuals.propTypes = {
  prices: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  prices: state.prices
});

export default connect(
  mapStateToProps,
  {}
)(Visuals);

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Visuals = ({ value }) => {
  return (
      <h1 className="card-text text-primary text-center m-1">{`$${value}`}</h1>
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

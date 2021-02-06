import React, { useState } from "react";

const SearchBar = ({ onFormSubmit }) => {
  const [inputs, setInputs] = useState({ searchTerm: "", unitsSelected: "M" });
  const onChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(inputs);
  };

  return (
    <div className="search-bar ui segment">
      <form onSubmit={onSubmit} className="ui form">
        <div className="field input-group">
          <label className="input-label">Enter a Location</label>
          <input
            type="text"
            name="searchTerm"
            className="search-input"
            value={inputs.searchTerm}
            onChange={onChange}
          />
          <select
            name="unitsSelected"
            className="units-selector"
            value={inputs.unitsSelected}
            onChange={onChange}
          >
            <option value="M">°C</option>
            <option value="S">°K</option>
            <option value="I">°F</option>
          </select>
          <button
            name="search button"
            className="ui search-icon button"
            type="submit"
          >
            <i className="search icon" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

import React from 'react';

const CriterionFilter = (props) => {
  const data = props.data;
  const handleCurrencyClick = () => {
    props.setCurrentСurrency(data);
  };

  return (
    <>
      <span onClick={handleCurrencyClick}>{data.name}</span>
    </>
  );
};

export default CriterionFilter;

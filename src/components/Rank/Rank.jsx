const Rank = ({ name, entries }) => {
  return (
    <div className="text-center text-white">
      <div className="fs-5">{`${name}, your current entry count is...`}</div>
      <div className="fs-2">{entries}</div>
    </div>
  );
};

export default Rank;

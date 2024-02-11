const Rank = ({ name, entries }) => {
  // Accesați valoarea direct din obiect
  const entryValue = entries && entries.entries; // înlocuiți "entries" cu numele exact al cheii din obiectul entries

  return (
    <div className="text-center text-white">
      <div className="fs-5">{`${name}, your current entry count is...`}</div>
      <div className="fs-2">{entryValue}</div>
    </div>
  );
};

export default Rank;

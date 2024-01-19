const Searchbar = ({ searchCard, setSearchCard }) => {
  return (
    <div>
      <h3>Search</h3>
      <input
        type="text"
        placeholder="Search cards..."
        value={searchCard}
        onChange={(e) => setSearchCard(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;

const Searchbar = ({ searchCard, setSearchCard }) => {
  return (
    <div>
      <span>Search</span>
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

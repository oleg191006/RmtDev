type SearchFormProps = {
  searchText: string;
  onSearchText: (text: string) => void;
};

export default function SearchForm({
  searchText,
  onSearchText,
}: SearchFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        spellCheck="false"
        type="text"
        required
        onChange={(e) => onSearchText(e.target.value)}
        value={searchText}
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}

export default function Filters({ filters, setFilters }) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search mission"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <select
        value={filters.year}
        onChange={(e) => setFilters({ ...filters, year: e.target.value })}
      >
        <option value="">All Years</option>
        {[...Array(20)].map((_, i) => {
          const year = 2006 + i;
          return <option key={year} value={year}>{year}</option>;
        })}
      </select>
      <label>
        <input
          type="checkbox"
          checked={filters.successOnly}
          onChange={(e) => setFilters({ ...filters, successOnly: e.target.checked })}
        />
        Successful Only
      </label>
    </div>
  );
}
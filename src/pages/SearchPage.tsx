import { useState } from 'react';
import { searchUsers } from '../api/usersApi';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = () => {
    searchUsers(query)
      .then((response) => setResults(response.data))
      .catch((error) => console.error('Error searching users:', error));
  };

  return (
    <div>
      <h1>Search Users</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;

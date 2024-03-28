// SearchContext.tsx
import React from "react";

export const SearchContext = React.createContext({
  searchTerm: "",
  setSearchTerm: (term) => {},
});

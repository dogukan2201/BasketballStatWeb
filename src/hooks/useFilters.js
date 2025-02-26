import { useState } from "react";

export const useFilters = (initialFilters, storageKey) => {
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem(storageKey);
    return savedFilters ? JSON.parse(savedFilters) : initialFilters;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    localStorage.setItem(storageKey, JSON.stringify(newFilters));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    localStorage.removeItem(storageKey);
  };

  return {
    filters,
    handleFilterChange,
    clearFilters,
  };
};

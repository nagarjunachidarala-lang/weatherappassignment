import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, X, Navigation, Compass } from 'lucide-react';
import { GeocodingResult, SelectedLocation } from '../types';
import { searchCities, POPULAR_CITIES, getCurrentCoordinates } from '../services/weatherService';

interface SearchBarProps {
  onSelectLocation: (location: SelectedLocation) => void;
  selectedLocation: SelectedLocation | null;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectLocation,
  selectedLocation,
  isLoading,
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search logic
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setSearchError(null);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!val.trim() || val.trim().length < 2) {
      setSearchResults([]);
      setIsOpen(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await searchCities(val, 6);
        setSearchResults(results);
        setIsOpen(true);
        if (results.length === 0) {
          setSearchError(`No city found matching "${val}". Please check the spelling.`);
        } else {
          setSearchError(null);
        }
      } catch {
        setSearchError('Unable to search cities at this moment. Please try again.');
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 350);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setSearchError('Please enter a city name to search.');
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setIsSearching(true);
    setSearchError(null);
    try {
      const results = await searchCities(trimmed, 5);
      if (results && results.length > 0) {
        const top = results[0];
        handleSelectCity(top);
      } else {
        setSearchError(`City "${trimmed}" not found. Try searching for a major nearby city.`);
        setIsOpen(false);
      }
    } catch {
      setSearchError('Network error while searching for city. Check your connection.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectCity = (result: GeocodingResult) => {
    onSelectLocation({
      name: result.name,
      region: result.admin1,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude,
    });
    setQuery(`${result.name}${result.country ? `, ${result.country}` : ''}`);
    setIsOpen(false);
    setSearchError(null);
  };

  const handleClear = () => {
    setQuery('');
    setSearchResults([]);
    setIsOpen(false);
    setSearchError(null);
  };

  const handleUseMyLocation = async () => {
    setIsLocating(true);
    setSearchError(null);
    try {
      const coords = await getCurrentCoordinates();
      onSelectLocation({
        name: 'Current Location',
        region: 'Local Area',
        country: 'GPS Detected',
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      setQuery('Current Location');
      setIsOpen(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to access location.';
      setSearchError(message);
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="w-full space-y-3" ref={containerRef}>
      {/* Search Input Box */}
      <form onSubmit={handleFormSubmit} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
            ) : (
              <Search className="w-4 h-4 text-slate-400" />
            )}
          </div>
          <input
            id="city-search-input"
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => {
              if (searchResults.length > 0) setIsOpen(true);
            }}
            placeholder="Search city (e.g., Tokyo, London, New York)..."
            disabled={isLoading}
            className="w-full pl-10 pr-10 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-xs"
          />
          {query && (
            <button
              id="clear-search-btn"
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Submit Button */}
        <button
          id="search-submit-btn"
          type="submit"
          disabled={isLoading || isSearching || !query.trim()}
          className="px-4 py-3 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-sm font-medium rounded-xl shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 whitespace-nowrap"
        >
          <span>Search</span>
        </button>

        {/* Location Detection Button */}
        <button
          id="use-my-location-btn"
          type="button"
          onClick={handleUseMyLocation}
          disabled={isLocating || isLoading}
          className="p-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-sky-600 rounded-xl shadow-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
          title="Use my current GPS coordinates"
        >
          {isLocating ? (
            <Loader2 className="w-5 h-5 animate-spin text-sky-600" />
          ) : (
            <Navigation className="w-5 h-5" />
          )}
        </button>

        {/* Results Dropdown */}
        {isOpen && searchResults.length > 0 && (
          <div
            id="search-results-dropdown"
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden divide-y divide-slate-100 max-h-72 overflow-y-auto"
          >
            {searchResults.map((result) => {
              const locationSub = [result.admin1, result.country]
                .filter(Boolean)
                .join(', ');

              return (
                <button
                  key={`${result.id}-${result.latitude}-${result.longitude}`}
                  type="button"
                  onClick={() => handleSelectCity(result)}
                  className="w-full px-4 py-3 text-left hover:bg-sky-50/60 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <MapPin className="w-4 h-4 text-slate-400 group-hover:text-sky-600 shrink-0 transition-colors" />
                    <div className="truncate">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {result.name}
                      </p>
                      {locationSub && (
                        <p className="text-xs text-slate-500 truncate">
                          {locationSub}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono shrink-0 ml-2">
                    {result.latitude.toFixed(2)}°, {result.longitude.toFixed(2)}°
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </form>

      {/* Inline Search / Geolocation Error Message */}
      {searchError && (
        <div
          id="search-error-banner"
          className="px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 shrink-0 text-red-500" />
            <span>{searchError}</span>
          </div>
          <button
            onClick={() => setSearchError(null)}
            className="text-red-500 hover:text-red-700 text-xs font-semibold underline ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Popular City Quick-Select Badges */}
      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
        <span className="text-xs font-medium text-slate-500 mr-1 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-slate-400" /> Quick select:
        </span>
        {POPULAR_CITIES.map((city) => {
          const isSelected =
            selectedLocation?.name === city.name &&
            Math.abs(selectedLocation.latitude - city.latitude) < 0.1;

          return (
            <button
              key={city.name}
              id={`quick-city-${city.name.toLowerCase().replace(/\s+/g, '-')}`}
              type="button"
              onClick={() => {
                onSelectLocation(city);
                setQuery(`${city.name}, ${city.country}`);
                setSearchError(null);
              }}
              className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {city.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// search-pub.tsx
import { Search } from "lucide-react";
import React from "react";
import { Input } from "@repo/ui/components/input";

interface SearchPubProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchPub: React.FC<SearchPubProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center rounded-lg border border-gray-300 w-full">
      <Search className="ml-2 h-5 w-5 text-gray-400" />
      <Input
        type="text"
        placeholder="Buscar publicaciones..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-0 focus:ring-0"
      />
    </div>
  );
};

export default SearchPub;

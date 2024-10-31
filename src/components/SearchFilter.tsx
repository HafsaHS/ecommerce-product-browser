import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SearchFilter() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Search query: ", query);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  return (
    <div className="flex justify-center w-full mb-4 ">
      <Input
        className="w-48 h-10"
        type="text"
        placeholder="Search here"
        value={query}
        onChange={handleChange}
      />
      <Button type="submit" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}

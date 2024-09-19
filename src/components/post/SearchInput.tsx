import { Input } from "../ui/input";

type Props = {
  handleSearch: (text: string) => void;
  searchValue: string;
}

const SearchInput = ({ searchValue, handleSearch }: Props) => {

  return (
		<>
			<Input
        className="mt-5"
				placeholder='Search...'
				value={searchValue}
				onChange={(e) => handleSearch(e.target.value)}
			/>
		</>
  );
}

export default SearchInput
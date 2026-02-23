import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function GuestTableOperations() {
  const sortOptions = [
    { value: "created_at-desc", label: "Sort by Newest" },
    { value: "created_at-asc", label: "Sort by Oldest" },
    { value: "fullName-asc", label: "Sort by Name (A-Z)" },
    { value: "fullName-desc", label: "Sort by Name (Z-A)" },
    { value: "id-asc", label: "Sort by ID (Ascending)" },
    { value: "id-desc", label: "Sort by ID (Descending)" },
  ];

  return (
    <TableOperations>
      <SortBy options={sortOptions} />
    </TableOperations>
  );
}

export default GuestTableOperations;

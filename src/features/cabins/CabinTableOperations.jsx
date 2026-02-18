import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  const optionsDiscount = [
    { value: "all", label: "All" },
    { value: "no-discount", label: "No discount" },
    { value: "with-discount", label: "With discount" },
  ];

  const SortbyOptions = [
    { value: "name-asc", label: "Sort by Name (A-Z)" },
    { value: "name-desc", label: "Sort by Name (Z-A)" },
    { value: "regularPrice-asc", label: "Sort by Price (Low to High)" },
    { value: "regularPrice-desc", label: "Sort by Price (High to Low)" },
    { value: "maxCapacity-asc", label: "Sort by Max Capacity (Low to High)" },
    { value: "maxCapacity-desc", label: "Sort by Max Capacity (High to Low)" },
  ];

  return (
    <TableOperations>
      <Filter filterField="discount" options={optionsDiscount} />
      <SortBy options={SortbyOptions} />
    </TableOperations>
  );
}

export default CabinTableOperations;

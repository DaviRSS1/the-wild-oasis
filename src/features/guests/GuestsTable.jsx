import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useGuests } from "./useGuests";
import GuestRow from "./GuestRow";
import Pagination from "../../ui/Pagination";

function GuestsTable() {
  const { isPendingGuests, guests, count } = useGuests();

  if (isPendingGuests) return <Spinner />;

  if (!guests) return <Spinner />;

  if (guests.length === 0) return <Empty resourceName="guests" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr .6fr;">
        <Table.Header>
          <div>Id</div>
          <div>FullName</div>
          <div>Email</div>
          <div>NationalId</div>
          <div>Nationality</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={guests}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestsTable;

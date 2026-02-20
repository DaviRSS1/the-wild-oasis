import { useState, useMemo } from "react";
import styled from "styled-components";
import { useGuests } from "../guests/useGuests";
import Spinner from "../../ui/Spinner";
import { Flag } from "../../ui/Flag";

const Wrapper = styled.div`
  position: relative;
`;

const Trigger = styled.button`
  width: 100%;
  padding: 1.2rem 1.4rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background: var(--color-grey-0);
  text-align: left;
  cursor: pointer;
  font-size: 1.4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: var(--color-grey-50);
  }
`;

const Menu = styled.div`
  position: absolute;
  width: 100%;
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  margin-top: 0.8rem;
  z-index: 20;

  max-height: 26rem;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  border-bottom: 1px solid var(--color-grey-200);
  font-size: 1.3rem;
  outline: none;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.2rem;
  cursor: pointer;
  font-size: 1.3rem;

  &:hover {
    background: var(--color-grey-100);
  }
`;

const GuestInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Empty = styled.div`
  padding: 1.2rem;
  font-size: 1.3rem;
  color: var(--color-grey-500);
`;

function GuestDropdown({ selectedGuest, onSelect }) {
  const { guests, isPendingGuests } = useGuests();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredGuests = useMemo(() => {
    if (!guests) return [];
    return guests.filter((guest) =>
      guest.fullName.toLowerCase().includes(search.toLowerCase()),
    );
  }, [guests, search]);

  function handleSelect(guest) {
    onSelect(guest);
    setIsOpen(false);
    setSearch("");
  }

  if (isPendingGuests) return <Spinner />;

  return (
    <Wrapper>
      <Trigger type="button" onClick={() => setIsOpen((s) => !s)}>
        {selectedGuest ? (
          <>
            <span>{selectedGuest.fullName}</span>
            <Flag
              src={selectedGuest.countryFlag}
              alt={`Flag of ${selectedGuest.nationality}`}
            />
          </>
        ) : (
          "Select guest"
        )}
      </Trigger>

      {isOpen && (
        <Menu>
          <SearchInput
            placeholder="Search guest..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filteredGuests.length === 0 && <Empty>No guests found</Empty>}

          {filteredGuests.map((guest) => (
            <Item key={guest.id} onClick={() => handleSelect(guest)}>
              <Flag
                src={guest.countryFlag}
                alt={`Flag of ${guest.nationality}`}
              />

              <GuestInfo>
                <span>{guest.fullName}</span>
                <small>{guest.email}</small>
              </GuestInfo>
            </Item>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
}

export default GuestDropdown;

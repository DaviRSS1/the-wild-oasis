import { useState } from "react";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";
import { useCabins } from "../cabins/useCabins";

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

  max-height: 20rem;
  overflow-y: auto;

  box-shadow: var(--shadow-md);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 50px 50px 1fr auto;
  gap: 1.2rem;
  align-items: center;
  padding: 1rem 1.2rem;
  cursor: pointer;
  font-size: 1.3rem;

  &:hover {
    background: var(--color-grey-100);
  }

  img {
    width: 48px;
    height: 36px;
    object-fit: cover;
    border-radius: 6px;
  }
`;

const CabinCode = styled.span`
  font-weight: 600;
  color: var(--color-grey-800);
`;

const Capacity = styled.span`
  color: var(--color-grey-600);
  font-size: 1.2rem;
`;

const Price = styled.span`
  font-weight: 600;
`;

const DiscountBadge = styled.span`
  background: var(--color-green-100);
  color: var(--color-green-700);
  font-size: 1.1rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
`;

function CabinDropdown({ selectedCabin, onSelect, numGuests = 1 }) {
  const { cabins, isPending } = useCabins();
  const [isOpen, setIsOpen] = useState(false);

  function handleSelect(cabin) {
    onSelect(cabin);
    setIsOpen(false);
  }

  if (isPending) return <Spinner />;

  const accessableCabins = cabins.filter(
    (cabin) => cabin.maxCapacity > numGuests,
  );

  return (
    <Wrapper>
      <Trigger type="button" onClick={() => setIsOpen((s) => !s)}>
        {selectedCabin
          ? `${selectedCabin.name} - ${formatCurrency(selectedCabin.regularPrice - selectedCabin.discount)}`
          : "Select cabin"}
      </Trigger>

      {isOpen && (
        <Menu>
          {accessableCabins.map((cabin) => (
            <Item key={cabin.id} onClick={() => handleSelect(cabin)}>
              <img src={cabin.image} alt={cabin.name} />

              <CabinCode>{cabin.name}</CabinCode>

              <div>
                <Capacity>Fits up to {cabin.maxCapacity}</Capacity>
              </div>

              <div style={{ textAlign: "right" }}>
                <Price>{formatCurrency(cabin.regularPrice)}</Price>
                {cabin.discount > 0 && (
                  <DiscountBadge>
                    - {formatCurrency(cabin.discount)}
                  </DiscountBadge>
                )}
              </div>
            </Item>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
}

export default CabinDropdown;

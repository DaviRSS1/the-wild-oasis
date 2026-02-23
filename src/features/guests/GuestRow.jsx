import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateGuest } from "./useCreateGuest";
import { useDeleteGuest } from "./useDeleteGuest";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import CreateGuestForm from "./CreateGuestForm";

const Flag = styled.img`
  display: block;
  width: 2.4rem;
  height: 1.6rem;
  object-fit: cover;
  border-radius: 3px;
`;

const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Email = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

const Nationality = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

function GuestRow({ guest }) {
  const { createGuest } = useCreateGuest();
  const { deleteGuest, isDeleting } = useDeleteGuest();

  const {
    fullName,
    email,
    nationalID,
    nationality,
    countryFlag,
    id: guestId,
  } = guest;

  function handleDuplicate() {
    createGuest({
      fullName: fullName + " Copy",
      email,
      nationalID,
      nationality,
      countryFlag,
    });
  }

  return (
    <Table.Row>
      <div>{guestId}</div>

      <Name>{fullName}</Name>

      <Email>{email}</Email>

      <div>{nationalID}</div>

      <Nationality>
        {countryFlag && (
          <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
        )}
        <span>{nationality}</span>
      </Nationality>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={`guest-${guestId}`} />

            <Menus.List id={`guest-${guestId}`}>
              <Modal.Open opens={`guest-form-${guestId}`}>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens={`delete-guest-${guestId}`}>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name={`delete-guest-${guestId}`}>
              <ConfirmDelete
                resourceName="guests"
                disabled={isDeleting}
                onConfirm={() => deleteGuest(guestId)}
              />
            </Modal.Window>
            <Modal.Window name={`guest-form-${guestId}`}>
              <CreateGuestForm guestToEdit={guest} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default GuestRow;

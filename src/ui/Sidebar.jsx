import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
import { Link } from "react-router-dom";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Link to="/">
        <Logo />
      </Link>
      <MainNav />
      <Uploader />
    </StyledSidebar>
  );
}

export default Sidebar;

import NavDropdown from "react-bootstrap/NavDropdown";

function NavSubItem({ subcategorydata }) {
const {category_name} = subcategorydata
  return <NavDropdown.Item>{category_name}</NavDropdown.Item>;
}

export default NavSubItem;

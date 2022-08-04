import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavSubItem from "./NavSubItem";

function NavItem({ categorydata, allcategories }) {
  const { id, category_name } = categorydata;

  const subCategories = allcategories.filter((subcategory) => {
    return subcategory.primary_category_id === id;
  });

  return (
    <>
      {subCategories.length > 0 ? (
        <NavDropdown title={category_name} id="nav-dropdown">
          {subCategories.map((subcategory) => (
            <NavSubItem subcategorydata={subcategory} key={subcategory.id} />
          ))}
        </NavDropdown>
      ) : (
        <Nav.Item>
          <Nav.Link>{category_name}</Nav.Link>
        </Nav.Item>
      )}
    </>
  );
}

export default NavItem;

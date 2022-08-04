import Nav from 'react-bootstrap/Nav';
import NavItem from './NavItem';
import { useQuery, gql } from "@apollo/client";

const CATEGORIES_QUERY = gql`
  {
    categories{
        id
        category_name
        primary_category_id
        description
    }
  }
`;

function NavBar() {

    const { data, loading, error } = useQuery(CATEGORIES_QUERY);
    
    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    const categories = data.categories;
    const mainCategory = categories.filter((category) => {
        return category.primary_category_id === 0
    })

    return (
      <Nav variant="pills" activeKey="1">
        {mainCategory.map((category) => (
          <NavItem key={category.id} categorydata={category} allcategories={categories}/>
        ))}
      </Nav>
    );
  }

  export default NavBar;
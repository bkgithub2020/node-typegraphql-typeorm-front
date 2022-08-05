import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Table from "react-bootstrap/Table";
import Category from "./Category";

const CATEGORIES_QUERY = gql`
  {
    categories {
      id
      category_name
      primary_category_id
      description
    }
  }
`;

function CategoryList() {
  const { data, loading, error,refetch } = useQuery(CATEGORIES_QUERY);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const categories = data.categories;

  return (
    <>
      <div className="category-list-heading">
        <h3>Category List</h3>
        <Link to="/category/add" className="btn btn-outline-primary">
          Add Category
        </Link>
      </div>

      <Table striped bordered hover className="category-list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Sub Category</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <Category category={category} key={category.id} refetch={refetch}/>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default CategoryList;

import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Table from "react-bootstrap/Table";
import Category from "./Category";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastObjects } from "../LoadingError/toastObject";

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
  const [categories, setCategories] = useState([]);
  const { data, loading, error, refetch } = useQuery(CATEGORIES_QUERY, {
    onCompleted: (data) => {
      setCategories(data.categories);
    },
    onError: (error) => {
      toast.error(error.message, ToastObjects);
    },
  });

  useEffect(()=>{
    refetch();
    console.log("Called useeffect")
  },[])

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

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
          {categories && categories.map((category) => (
            <Category category={category} key={category.id} refetch={refetch} />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default CategoryList;

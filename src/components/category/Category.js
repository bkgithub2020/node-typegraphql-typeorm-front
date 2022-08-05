import {Link} from 'react-router-dom';
import { useQuery, gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import {ToastObjects} from "../LoadingError/toastObject";

const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: String!){
    deleteCategory(id: $id)
  }
`;

const Category = (props) => {
	let {id, category_name,primary_category_id} = props.category;
	const [deleteCategory] = useMutation(DELETE_CATEGORY, {
		onCompleted: (data) => {
		  toast.success("Category Deleted Successfully", ToastObjects);
		  props.refetch()
		},
		onError: (error) => {
		  toast.error(error.message, ToastObjects);
		},
	  });
	

	  const deletehandler = (id) => {
		id = id.toString();
	    if (window.confirm("Are you sure want to delete product?")) {
			deleteCategory({ variables: { id }});
	    }
	  };
	return(
		<>
		    <tr>
              <td>{id}</td>
              <td>{category_name}</td>
              <td>{primary_category_id}</td>
              <td className='text-center'><Link
	                to={`/category/edit/${id}`}	                
	              >
	              	<i className="fa fa-edit action-icon action-icon-edit"></i>
	              </Link>
	              <Link
	                to="#"
	                onClick={() => deletehandler(id)}	                
	              >
	              	<i className="fa fa-trash danger action-icon action-icon-delete"></i>
	              </Link>
	           </td>
            </tr>
		</>
		)
}

export default Category;
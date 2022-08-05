import {Link} from 'react-router-dom';

const Category = (props) => {
	let {id, category_name,primary_category_id} = props.category;
	

	  const deletehandler = (id) => {
	    if (window.confirm("Are you sure want to delete product?")) {
	      
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
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {ToastObjects} from "../LoadingError/toastObject";

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

const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $category_name: String!
    $primary_category_id: Float!
    $description: String!
  ) {
    createCategory(
      data: {
        category_name: $category_name
        primary_category_id: $primary_category_id
        description: $description
      }
    ) {
      id
      category_name
      primary_category_id
      description
    }
  }
`;

function AddCategory(props) {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    values: {},
  });
  const [message, setMesasge] = useState("");
  const [errmessage, setErrmesasge] = useState("");
  const [addCategory, ...addResponse] = useMutation(CREATE_CATEGORY ,{
    onCompleted: (data) => {
        toast.success("Category Added Successfully", ToastObjects);
    },
    onError: (error) => {
        toast.error(error.message, ToastObjects); 
    },
  });
  const addStatusError = addResponse.error;

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const categories = data.categories;

  const handleChange = (event) => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); 
    const { category_name, primary_category_id } = formState.values;
    if (category_name) {
      addCategory({
        variables: {
          ...formState.values,
          primary_category_id: (formState.values.primary_category_id ? parseInt(formState.values.primary_category_id) : 0),
        },
      });
      setFormState({ values: {} });
      setSubmitted(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={6}>
          <div className="category-list-heading">
            <h3>Add Category</h3>
            <Link to="/" className="btn btn-outline-primary">
              Go Back
            </Link>
          </div>
          {message && (
            <Alert key="success" variant="success">
              Test
            </Alert>
          )}
          {errmessage && (
            <Alert key="danger" variant="danger">
              danger
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="category_name">
              <Form.Control
                type="text"
                name="category_name"
                placeholder="Category Name"
                className={
                  submitted && !formState.values.category_name
                    ? " is-invalid"
                    : ""
                }
                onChange={handleChange}
                value={formState.values.category_name || ""}
              />
              {submitted && !formState.values.category_name && (
                <div className="inline-errormsg">Category name is required</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Control
                as="textarea"
                name="description"
                aria-label="With textarea"
                placeholder="Description"
                onChange={handleChange}
                value={formState.values.description || ""}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Select
                aria-label=""
                className="form-control"
                name="primary_category_id"
                onChange={handleChange}
                value={formState.values.primary_category_id || "0"}
              >
                <option value="0">Under Category</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.category_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddCategory;

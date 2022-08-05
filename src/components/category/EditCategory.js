import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
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

const GET_CATEGORY_DETAIL = gql`
  query GetCategory($id: String!) {
    category(id: $id) {
      id
      category_name
      primary_category_id
      description
    }
  }
`;

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $category_name: String!
    $primary_category_id: Float!
    $description: String!
    $id: String!
  ) {
    updateCategory(
      id: $id
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

function EditCategory({ match }) {
  const categoryId = match.params.id.toString();
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);
  const categoryDetailsResponse = useQuery(GET_CATEGORY_DETAIL, {
    variables: { id: categoryId },
  });
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    values: {},
  });

  useEffect(() => {
    if (categoryDetailsResponse.data) {
      const categoryDetail = categoryDetailsResponse.data.category;
      setFormState({ values: categoryDetail });
    }
  }, [categoryDetailsResponse]);

  const [message, setMesasge] = useState("");
  const [errmessage, setErrmesasge] = useState("");
  const [updateCategory, ...updateResponse] = useMutation(UPDATE_CATEGORY, {
    onCompleted: (data) => {
      toast.success("Category Updated Successfully", ToastObjects);
    },
    onError: (error) => {
      toast.error(error.message, ToastObjects);
    },
  });

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
    const { category_name } = formState.values;

    if (category_name) {
      updateCategory({
        variables: {
          ...formState.values,
          primary_category_id: parseInt(formState.values.primary_category_id),
          id: formState.values.id.toString(),
        },
      });

      setSubmitted(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={6}>
          <div className="category-list-heading">
            <h3>Update Category</h3>
            <Link to="/" className="btn btn-outline-primary">
              Go Back
            </Link>
          </div>
          {message && <Alert key="success" variant="success"></Alert>}
          {errmessage && <Alert key="danger" variant="danger"></Alert>}
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
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditCategory;

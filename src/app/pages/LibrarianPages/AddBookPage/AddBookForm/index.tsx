import { CustomImageInput } from 'app/components/CustomImageInput';
import {
  selectErrorMessage,
  selectIsError,
  selectIsSuccess,
} from 'app/pages/LibrarianPages/AddBookPage/AddBookForm/slice/selectors';
import { useYupValidationResolver } from 'app/services/validation/resolvers/Resolver';
import { ValidationSchema } from 'app/services/validation/schemes/AddBook';
import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { FormProvider, KeepStateOptions, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthorsAutoComplete } from '../components/AuthorsAutoComplete';
import { CustomInputField } from '../components/CustomInputField';
import { AddBookForm } from './AddBookForm';
import { useAddBookSlice } from './slice';
import { selectSuccessMessage } from './slice/selectors';

interface IProps {}

export function AddBook(props: IProps) {
  const [showAlert, setShowAlert] = useState(true);

  const { actions } = useAddBookSlice();
  const dispatch = useDispatch();

  const successMessage = useSelector(selectSuccessMessage);
  const errorMessage = useSelector(selectErrorMessage);
  const isError = useSelector(selectIsError);
  const isSuccess = useSelector(selectIsSuccess);

  const resolver = useYupValidationResolver(ValidationSchema);
  const methods = useForm({
    resolver,
  });

  const keepStateOptions: KeepStateOptions = {
    keepErrors: true,
    keepDirty: true,
    keepIsSubmitted: false,
    keepTouched: false,
    keepIsValid: false,
    keepSubmitCount: false,
  };

  const onSubmit = (data: AddBookForm, event): void => {
    let publicationDate = new Date(data.publicationDate).toISOString();
    dispatch(
      actions.requestAddBook({
        ...data,
        image: data.image[0],
        publicationDate,
      }),
    );
    setShowAlert(true);
    methods.reset(keepStateOptions);
  };

  function AlertDismissible() {
    if (isError && showAlert) {
      return (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>{errorMessage}</Alert.Heading>
        </Alert>
      );
    } else if (isSuccess && showAlert) {
      return (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>{successMessage}</Alert.Heading>
        </Alert>
      );
    }
    return null;
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <AlertDismissible />
        <Row>
          <Col xs={6} md={6}>
            <CustomInputField
              required
              title="ISBN"
              id="isbn"
              type="text"
              htmlFor="isbn"
              ariaLabel="isbn"
            />

            <CustomInputField
              required
              title="Title"
              id="title"
              type="text"
              htmlFor="title"
              ariaLabel="title"
            />

            <AuthorsAutoComplete required />

            <CustomInputField
              title="Subtitle"
              id="subtitle"
              type="text"
              htmlFor="subtitle"
              ariaLabel="subtitle"
            />

            <CustomInputField
              title="Original Title"
              id="originalTitle"
              type="text"
              htmlFor="originalTitle"
              ariaLabel="originalTitle"
            />

            <CustomInputField
              required
              title="Number of Pages"
              id="pageCount"
              type="text"
              htmlFor="pageCount"
              ariaLabel="pageCount"
            />

            <CustomInputField
              required
              title="Publisher"
              id="publisher"
              type="text"
              htmlFor="publisher"
              ariaLabel="publisher"
            />

            <CustomInputField
              required
              title="Publication Date"
              id="publicationDate"
              type="text"
              htmlFor="publicationDate"
              ariaLabel="publicationDate"
            />

            <CustomInputField
              required
              title="Number Of Copies"
              id="copieCount"
              type="text"
              htmlFor="copieCount"
              ariaLabel="copieCount"
            />
          </Col>
          <Col xs={6} md={4}>
            <CustomImageInput
              required
              label="Book Cover"
              title="Select a file"
              id="image"
              preview={{ id: 'image-preview', width: '100%' }}
            ></CustomImageInput>
            <Button
              className="float-right"
              type="submit"
              data-testid="addBook-button"
            >
              Add Book
            </Button>
            <Link to="/dashboard/books">
              <Button
                className="float-right mr-2"
                type="submit"
                data-testid="addBook-button"
              >
                {' '}
                Check Inventory
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </FormProvider>
  );
}

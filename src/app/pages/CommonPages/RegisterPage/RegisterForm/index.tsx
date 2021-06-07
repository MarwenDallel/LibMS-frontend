import { useYupValidationResolver } from 'app/services/validation/resolvers/Resolver';
import { RegisterValidationScheme } from 'app/services/validation/schemes/Register';
import * as React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { RegistrationForm } from './RegistrationForm';
import { useRegistrationSlice } from './slice';

export function RegisterForm() {
  const validEmailDomains = ['smu.tn', 'msb.tn', 'medtech.tn', 'lci.tn'];

  const { actions } = useRegistrationSlice();
  const dispatch = useDispatch();

  const onSubmit = (data: RegistrationForm): void => {
    data = { ...data, email: data.emailName + '' + data.emailDomain };
    dispatch(actions.requestRegister(data));
  };

  const resolver = useYupValidationResolver(RegisterValidationScheme);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver,
  });

  return (
    <Form
      className="mb-5"
      data-testid="registration-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Group>
        <Form.Label htmlFor="firstName">First name</Form.Label>
        <Form.Control
          type="text"
          className="w-75"
          id="firstName"
          aria-label="firstName"
          {...register('firstName')}
          aria-describedby="firstNameHelp"
          isInvalid={!!errors.firstName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.firstName?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="lastName">Last name</Form.Label>
        <Form.Control
          type="text"
          className="w-75"
          id="lastName"
          aria-label="lastName"
          aria-describedby="lastNameHelp"
          {...register('lastName')}
          isInvalid={!!errors.lastName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.lastName?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label htmlFor="emailName">Email name</Form.Label>
          <Form.Control
            type="text"
            id="emailName"
            className="w-100"
            {...register('emailName')}
            aria-describedby="emailNameHelp"
            aria-label="emailName"
            isInvalid={!!errors.emailName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.emailName?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label htmlFor="emailDomain">Email domain</Form.Label>
          <Form.Control
            as="select"
            id="emailDomain"
            className="w-50"
            {...register('emailDomain')}
            aria-describedby="emailDomainHelp"
            aria-label="emailDomain"
            isInvalid={!!errors.emailDomain}
          >
            {validEmailDomains.map(emailDomain => {
              let emailAddress = '@' + emailDomain;
              return (
                <option key={emailDomain} value={emailAddress}>
                  {emailAddress}
                </option>
              );
            })}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.emailDomain?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Group>
        <Form.Label htmlFor="universityID">University ID</Form.Label>
        <Form.Control
          type="text"
          className="w-75"
          id="universityID"
          {...register('universityID')}
          aria-describedby="universityIDHelp"
          aria-label="universityID"
          isInvalid={!!errors.universityID}
        />
        <Form.Control.Feedback type="invalid">
          {errors.universityID?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          className="w-75"
          id="password"
          {...register('password')}
          isInvalid={!!errors.password}
          aria-label="password"
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="confirmPassword">Confirm password</Form.Label>
        <Form.Control
          type="password"
          className="w-75"
          id="confirmPassword"
          aria-label="confirmPassword"
          {...register('confirmPassword')}
          isInvalid={!!errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {errors.confirmPassword?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="w-75" data-testid="submit-button">
        Submit
      </Button>
    </Form>
  );
}

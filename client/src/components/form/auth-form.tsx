'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { apiRequest } from '@lib/request';
import { UserProps } from '@app-types/user';

type AuthFormProps = {
  page?: 'register' | 'login' | 'forgot-password' | 'reset-password';
};

export default function AuthForm({ page = 'register' }: AuthFormProps) {
  const router = useRouter();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const { mutate, isLoading, isError } = useMutation((user: UserProps) =>
    apiRequest('post', `/auth/${page}`, user),
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.password && values.password.length < 8) {
      toast.error('Password must be 8 characters long');
    }

    if (
      values.password &&
      values.confirm_password &&
      values.password !== values.confirm_password
    ) {
      toast.error('Password and confirm password must match');
    }

    mutate(values);

    if (!isError && page === 'forgot-password') {
      toast.success(
        'An email has been sent to your address to reset your password',
      );
      return;
    }

    router.push('/');
  };

  return (
    <div className="card mt-5">
      <div className="card-header text-capitalize font-weight-bold">
        {page?.split('-').join(' ')}
      </div>
      <div className="card-body">
        <form action="#" method="POST" onSubmit={onSubmit}>
          {page === 'register' && (
            <div className="form-group mb-2">
              <label htmlFor="name-field" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name-field"
                value={values.name}
                onChange={onChange}
                required
              />
            </div>
          )}
          {page !== 'reset-password' && (
            <div className="form-group mb-2">
              <label htmlFor="email-field" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email-field"
                value={values.email}
                onChange={onChange}
                required
              />
            </div>
          )}
          {page !== 'forgot-password' && (
            <div className="form-group mb-2">
              <label htmlFor="password-field" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password-field"
                value={values.password}
                onChange={onChange}
                required
              />
            </div>
          )}
          {page === 'reset-password' && (
            <div className="form-group mb-2">
              <label htmlFor="password-field" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                name="confirm_password"
                id="password-field"
                value={values.confirm_password}
                onChange={onChange}
                required
              />
            </div>
          )}
          <div className="mb-2 d-flex justify-content-between">
            {page === 'login' && (
              <>
                <small className="text-secondary">
                  Not a member? <Link href="/register">Register</Link>
                </small>
                <small className="text-secondary">
                  <Link href="/forgot-password">Forgot Password?</Link>
                </small>
              </>
            )}

            {page === 'register' && (
              <small className="text-secondary">
                Already a member? <Link href="/login">Login</Link>
              </small>
            )}
          </div>
          <button
            className="btn btn-primary text-capitalize"
            disabled={isLoading}
          >
            <span>{page?.split('-').join(' ')}</span>
            {isLoading && (
              <span
                style={{ marginLeft: 5 }}
                className="spinner-border spinner-border-sm"
              />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

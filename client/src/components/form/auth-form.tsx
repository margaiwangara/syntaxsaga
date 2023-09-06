'use client';
import { useState } from 'react';
import Link from 'next/link';

type AuthFormProps = {
  page?: 'register' | 'login' | 'forgot-password' | 'reset-password';
};

export default function AuthForm({ page = 'register' }: AuthFormProps) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <div className="card mt-5">
      <div className="card-header text-capitalize font-weight-bold">
        {page?.split('-').join(' ')}
      </div>
      <div className="card-body">
        <form action="#" method="POST">
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
          <button className="btn btn-primary text-capitalize">
            {page?.split('-').join(' ')}
          </button>
        </form>
      </div>
    </div>
  );
}

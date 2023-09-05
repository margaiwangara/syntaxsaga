import { useState } from 'react';

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
    <div className="card">
      <div className="card-body">
        <form action="#" method="POST">
          {page === 'register' && (
            <div className="form-group">
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
            <div className="form-group">
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
          <div className="form-group">
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
          {page === 'reset-password' && (
            <div className="form-group">
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
          <button className="btn btn-primary mt-2 text-capitalize">
            {page?.split('-').join(' ')}
          </button>
        </form>
      </div>
    </div>
  );
}

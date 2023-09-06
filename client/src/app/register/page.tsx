import { AuthForm } from '@components/form';

export default function Register() {
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3 py-4">
        <AuthForm page="register" />
      </div>
    </div>
  );
}

import { AuthForm } from '@/app/components/form';

export default function ResetPassword() {
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3 py-4">
        <AuthForm page="reset-password" />
      </div>
    </div>
  );
}

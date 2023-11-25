'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Button, Input } from '@molecules';

import { loginModel } from '@models';
import { useAuth, useForm, usePostData } from '@hooks';
import { endpoints } from '@services';
import { Login } from '@types';

const login = loginModel();

interface Token {
  access_token: string;
  refresh_token: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { handleToken, authData } = useAuth();
  const { values, handleChangeInput } = useForm<Login>(login);
  const { email, password } = values;

  const authLogin = usePostData<Token>({
    url: endpoints.auth.login,
    onSuccess: ({ access_token }) => {
      if (access_token) {
        handleToken(access_token);
      }
    },
  });

  const isInvalidUser = authLogin.error?.response?.status === 401;

  const handleSubmit = (event: EventSubmit) => {
    event.preventDefault();
    const data = { email, password };
    authLogin.mutate(data);
  };

  if (authData.data) {
    router.push('/dashboard');
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Image
              className="mx-auto w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
              width={48}
              height={48}
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          {isInvalidUser && (
            <section className="mt-4 text-red-600">
              <span>Invalid email or password</span>
            </section>
          )}

          {authLogin.isError && !isInvalidUser && (
            <section className="mt-4 text-red-600">
              <span>An error has ocurred</span>
            </section>
          )}

          <form className="mt-4 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <Input
                label="Email"
                attrInput={{
                  value: email,
                  name: 'email',
                  type: 'email',
                  onChange: handleChangeInput,
                  disabled: authLogin.isLoading,
                  autoComplete: 'email',
                  required: true,
                }}
              />

              <Input
                label="Password"
                attrInput={{
                  value: password,
                  name: 'password',
                  type: 'password',
                  onChange: handleChangeInput,
                  disabled: authLogin.isLoading,
                  autoComplete: 'password',
                  required: true,
                }}
              />
            </div>

            <div>
              <Button value="Sign in" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

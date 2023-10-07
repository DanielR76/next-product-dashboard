'use client';

import Link from 'next/link';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

import { Input } from '@molecules';

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
    router.push('/');
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
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
                label="email"
                value={email}
                inputtype="email"
                onChange={handleChangeInput}
                isDisabled={authLogin.isLoading}
                autoComplete="email"
                required
              />

              <Input
                label="password"
                value={password}
                inputtype="password"
                onChange={handleChangeInput}
                isDisabled={authLogin.isLoading}
                autoComplete="password"
                required
              />
            </div>

            <div>
              <button
                disabled={authLogin.isLoading}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

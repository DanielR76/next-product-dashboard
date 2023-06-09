'use client';

import Link from 'next/link';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

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
            <input type="hidden" name="remember" defaultValue="true" />

            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>

                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChangeInput}
                  disabled={authLogin.isLoading}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleChangeInput}
                  disabled={authLogin.isLoading}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />

                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </Link>
              </div>
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

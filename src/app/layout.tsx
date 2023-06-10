import { ProviderTanstack } from '@providers';
import { Header } from '@common';

import { ProviderAuth } from '@hooks';
import '../styles/global.css';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body>
        <ProviderTanstack>
          <ProviderAuth>
            <div className="min-h-full">
              <Header />
              <main className="max-w-7xl mx-auto py-6 sm:px-6 xl:px-8">{children}</main>
            </div>
          </ProviderAuth>
        </ProviderTanstack>
      </body>
    </html>
  );
}

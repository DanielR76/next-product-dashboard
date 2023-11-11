import { ProviderModal } from '@providers';

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <>
      <ProviderModal>{children}</ProviderModal>
    </>
  );
}

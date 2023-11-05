import { ProviderModal } from '@providers';

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <div>
      <ProviderModal>{children}</ProviderModal>
    </div>
  );
}

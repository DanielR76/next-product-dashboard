import { Header } from './components/Header';

export default function HeaderLayout({ children }: ChildrenProps) {
  return (
    <>
      <Header />
      <main className="w-full max-w-7xl mx-auto pt-4 sm:px-2 xl:px-6">
        <section className="max-h-[calc(100vh-100px)] pt-2 overflow-y-auto ">{children}</section>
      </main>
    </>
  );
}

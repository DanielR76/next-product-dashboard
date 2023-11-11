// import { Form } from '@productsComponents/Form';

interface EditProps {
  params: { id: string };
}

export default function Edit({ params }: EditProps) {
  const { id } = params;

  return <div>{id}</div>;
}

import { FC } from 'react';
import { XCircleIcon } from '@heroicons/react/20/solid';

type TypeAlert = 'Warning' | 'Error';
interface Alert {
  readonly message: string;
  readonly active: boolean;
  readonly type: TypeAlert;
  readonly autoclose: boolean;
  onClose: () => void;
}

export const Alert: FC<Alert> = ({
  message = '',
  active,
  type = 'Warning',
  autoclose = true,
  onClose,
}) => {
  if (autoclose) {
    setTimeout(() => {
      onClose();
    }, 5000);
  }

  return (
    <div x-data className="bg-indigo-100 p-5 w-full rounded mb-8">
      <div className="flex space-x-3">
        <div className="flex-1 leading-tight text-sm text-black font-medium">{message}</div>
        <button type="button">
          <XCircleIcon className="w-6 h-6 text-gray-600" onClick={onClose} />
        </button>
      </div>
    </div>
  );
};

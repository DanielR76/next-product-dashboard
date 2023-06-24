import Link from 'next/link';

import { navigation } from '@constants';
import { classNames } from '@utils';

export const NavigationItems = () => {
  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.path}
          className={classNames(
            item.isCurrent
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'px-3 py-2 rounded-md text-sm font-medium',
          )}
          aria-current={item.isCurrent ? 'page' : undefined}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};

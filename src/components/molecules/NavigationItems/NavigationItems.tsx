import Link from 'next/link';

import { navigation } from '@constants';
import { mergeClasses } from '@utils';

export const NavigationItems = () => {
  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.path}
          className={mergeClasses(
            'px-3 py-2 rounded-md text-sm font-medium',
            { 'bg-gray-900 text-white': item.isCurrent },
            { 'text-gray-300 hover:bg-gray-700 hover:text-white': !item.isCurrent },
          )}
          aria-current={item.isCurrent ? 'page' : undefined}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};

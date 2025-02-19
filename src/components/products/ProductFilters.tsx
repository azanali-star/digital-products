'use client';

import { useState } from 'react';
import { Dialog, Disclosure } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const filters = [
  {
    id: 'price',
    name: 'Price',
    options: [
      { value: 'under-50', label: 'Under $50' },
      { value: '50-100', label: '$50 to $100' },
      { value: '100-200', label: '$100 to $200' },
      { value: 'over-200', label: 'Over $200' },
    ],
  },
  {
    id: 'material',
    name: 'Material',
    options: [
      { value: 'cotton', label: 'Cotton' },
      { value: 'silk', label: 'Silk' },
      { value: 'wool', label: 'Wool' },
      { value: 'metal', label: 'Metal' },
      { value: 'wood', label: 'Wood' },
    ],
  },
  {
    id: 'artisan',
    name: 'Artisan',
    options: [
      { value: 'maria-rodriguez', label: 'Maria Rodriguez' },
      { value: 'ahmed-hassan', label: 'Ahmed Hassan' },
      { value: 'liu-wei', label: 'Liu Wei' },
    ],
  },
];

export default function ProductFilters() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Mobile filter dialog */}
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4">
              {filters.map((section) => (
                <Disclosure as="div" key={section.name} className="border-t border-gray-200 px-4 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <ChevronDownIcon
                              className={\`h-5 w-5 \${open ? '-rotate-180' : 'rotate-0'}\`}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={\`filter-mobile-\${section.id}-\${optionIdx}\`}
                                name={\`\${section.id}[]\`}
                                value={option.value}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                              />
                              <label
                                htmlFor={\`filter-mobile-\${section.id}-\${optionIdx}\`}
                                className="ml-3 text-sm text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Desktop filters */}
      <form className="hidden lg:block">
        <h3 className="sr-only">Categories</h3>

        {filters.map((section) => (
          <Disclosure as="div" key={section.name} className="border-b border-gray-200 py-6">
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">{section.name}</span>
                    <span className="ml-6 flex items-center">
                      <ChevronDownIcon
                        className={\`h-5 w-5 \${open ? '-rotate-180' : 'rotate-0'}\`}
                        aria-hidden="true"
                      />
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={\`filter-\${section.id}-\${optionIdx}\`}
                          name={\`\${section.id}[]\`}
                          value={option.value}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <label
                          htmlFor={\`filter-\${section.id}-\${optionIdx}\`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>

      {/* Mobile filter button */}
      <div className="flex items-center lg:hidden">
        <button
          type="button"
          className="text-gray-700 hover:text-gray-900"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>
    </div>
  );
}

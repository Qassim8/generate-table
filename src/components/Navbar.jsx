import { Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router'
import Logo from '../assets/logo.svg'
import { SignIn, SignOut } from '@phosphor-icons/react/dist/ssr'

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Teachers", href: "/teacher/list", current: false },
  { name: "Classrooms", href: "/classroom/list", current: false },
  { name: "Courses", href: "/course/list", current: false },
  { name: "Departments", href: "/department/list", current: false },
  { name: "Table", href: "/table", current: false },
];

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // حذف التوكن
    localStorage.removeItem("userRole")
    window.location.href = "/login"; // إعادة توجيه المستخدم لصفحة تسجيل الدخول
};
const token = localStorage.getItem("userToken");
  
const userNavigation = [
    { name: 'Your Profile', href: '#' },
  { name: 'Log out', href: '#', action:  handleLogout   },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Navbar({ pageName, children }) {
  const location = useLocation();

    return (
      <>
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between items-center">
                <div className="h-[30px] w-[30px]">
                  <img src={Logo} width={100} height={100} />
                </div>
                <div className="flex">
                  <div className="hidden sm:-my-px sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.href === location.pathname
                            ? "text-indigo-500 !font-bold"
                            : "border-transparent text-gray-500",
                          "inline-flex items-center px-1 py-2 pt-1 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {/* Profile dropdown */}
                  {token ? (
                    <button
                      className="flex justify-center items-center gap-2 text-white bg-indigo-500 py-2 px-5 rounded-lg cursor-pointer duration-300 hover:bg-indigo-600"
                      onClick={handleLogout}
                    >
                      <span>Logout</span>{" "}
                      <SignOut className="text-white text-lg" />
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="flex justify-center items-center gap-2 text-white bg-indigo-500 py-2 px-5 rounded-lg cursor-pointer duration-300 hover:bg-indigo-600"
                    >
                      <span>Login</span>
                      <SignIn className="text-white text-lg" />
                    </Link>
                  )}
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon
                      aria-hidden="true"
                      className="block size-6 group-data-[open]:hidden"
                    />
                    <XMarkIcon
                      aria-hidden="true"
                      className="hidden size-6 group-data-[open]:block"
                    />
                  </DisclosureButton>
                </div>
              </div>
            </div>

            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.href === location.pathname
                        ? " bg-indigo-50 text-indigo-700"
                        : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                      "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="shrink-0">
                    <img
                      alt=""
                      src={user.imageUrl}
                      className="size-10 rounded-full"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  {userNavigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>

          <div className="py-10">
            <header>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {pageName}
                </h1>
              </div>
            </header>
            <main>
              <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </>
    );
}

Navbar.propTypes = {
    pageName: PropTypes.string.isRequired, // Ensures pageName is a required string
    children: PropTypes.node.isRequired, // Ensures children is a required node
};

export default Navbar;

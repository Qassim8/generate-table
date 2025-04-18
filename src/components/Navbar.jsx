import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router";
import Logo from "../assets/logo.svg";
import { NotePencil, SignIn, SignOut } from "@phosphor-icons/react/dist/ssr";

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Teachers", href: "/teacher/list", current: false },
  { name: "Classrooms", href: "/classroom/list", current: false },
  { name: "Courses", href: "/course/list", current: false },
  { name: "Batches", href: "/department/list", current: false },
  { name: "Table", href: "/table", current: false },
];

const teacherNavigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Teachers", href: "/teacher/list", current: false },
  { name: "Classrooms", href: "/classroom/list", current: false },
  { name: "Courses", href: "/course/list", current: false },
  { name: "Batches", href: "/department/list", current: false },
];

const handleLogout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userRole");
  window.location.href = "/login";
};
const token = localStorage.getItem("userToken");
const role = localStorage.getItem("userRole");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ pageName, children }) {
  const location = useLocation();

  return (
    <>
      <div className="min-h-full">
        {role !== "teacher" ? <Disclosure as="nav" className="bg-white shadow-sm">
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
                  <div className="flex items-center gap-3">
                    <Link
                      to="/register"
                      className="flex justify-center items-center gap-2 text-white bg-indigo-500 py-2 px-5 rounded-lg cursor-pointer duration-300 hover:bg-indigo-600"
                    >
                      <span>Add User</span>
                      <NotePencil className="text-white text-lg" />
                    </Link>
                    <button
                      className="flex justify-center items-center gap-2 text-white bg-indigo-500 py-2 px-5 rounded-lg cursor-pointer duration-300 hover:bg-indigo-600"
                      onClick={handleLogout}
                    >
                      <span>Logout</span>{" "}
                      <SignOut className="text-white text-lg" />
                    </button>
                  </div>
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
                <Link
                  key={item.name}
                  as="a"
                  to={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.href === location.pathname
                      ? " bg-indigo-50 text-indigo-700"
                      : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                    "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              {token ? (
                <div className="px-3 flex items-center gap-3">
                  <Link
                    to="/register"
                    className="flex justify-center items-center gap-2 text-white bg-indigo-500 py-2 px-5 rounded-lg cursor-pointer duration-300 hover:bg-indigo-600"
                  >
                    <span>Add User</span>
                    <NotePencil className="text-white text-lg" />
                  </Link>
                  <button
                    className="flex justify-center items-center gap-2 text-white bg-indigo-500 py-2 px-5 rounded-lg cursor-pointer duration-300 hover:bg-indigo-600"
                    onClick={handleLogout}
                  >
                    <span>Logout</span>{" "}
                    <SignOut className="text-white text-lg" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="mx-3 flex justify-center items-center gap-2 text-white bg-indigo-500 py-2 px-5 rounded-lg cursor-pointer duration-300 hover:bg-indigo-600"
                >
                  <span>Login</span>
                  <SignIn className="text-white text-lg" />
                </Link>
              )}
            </div>
          </DisclosurePanel>
        </Disclosure> : <Disclosure as="nav" className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="h-[30px] w-[30px]">
                <img src={Logo} width={100} height={100} />
              </div>
              <div className="flex">
                <div className="hidden sm:-my-px sm:flex sm:space-x-8">
                  {teacherNavigation.map((item) => (
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
                  <div className="flex items-center gap-3">
                    <Link
                      to="/register"
                      className="flex justify-center items-center gap-2 text-white bg-indigo-500 py-2 px-5 rounded-lg cursor-pointer duration-300 hover:bg-indigo-600"
                    >
                      <span>Add User</span>
                      <NotePencil className="text-white text-lg" />
                    </Link>
                    <button
                      className="flex justify-center items-center gap-2 text-white bg-indigo-500 py-2 px-5 rounded-lg cursor-pointer duration-300 hover:bg-indigo-600"
                      onClick={handleLogout}
                    >
                      <span>Logout</span>{" "}
                      <SignOut className="text-white text-lg" />
                    </button>
                  </div>
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
              {teacherNavigation.map((item) => (
                <Link
                  key={item.name}
                  as="a"
                  to={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.href === location.pathname
                      ? " bg-indigo-50 text-indigo-700"
                      : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                    "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              {token ? (
                <div className="px-3 flex items-center gap-3">
                  <Link
                    to="/register"
                    className="flex justify-center items-center gap-2 text-white bg-indigo-500 py-2 px-5 rounded-lg cursor-pointer duration-300 hover:bg-indigo-600"
                  >
                    <span>Add User</span>
                    <NotePencil className="text-white text-lg" />
                  </Link>
                  <button
                    className="flex justify-center items-center gap-2 text-white bg-indigo-500 py-2 px-5 rounded-lg cursor-pointer duration-300 hover:bg-indigo-600"
                    onClick={handleLogout}
                  >
                    <span>Logout</span>{" "}
                    <SignOut className="text-white text-lg" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="mx-3 flex justify-center items-center gap-2 text-white bg-indigo-500 py-2 px-5 rounded-lg cursor-pointer duration-300 hover:bg-indigo-600"
                >
                  <span>Login</span>
                  <SignIn className="text-white text-lg" />
                </Link>
              )}
            </div>
          </DisclosurePanel>
        </Disclosure>}

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

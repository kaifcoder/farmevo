import { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import "@/index.css";

import { Input } from "../ui/input";
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import AuthContext from "@/provider/authProvider";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { SearchContext } from "@/provider/searchProvider";

import axios from "@/api/axios";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { user, setUser } = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { setSearchTerm: any } = useContext(SearchContext);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const [currentPath, setCurrentPath] = useState(location.pathname);
  const navigation = [
    {
      name: "Products",
      href: "/home/product",
      current: currentPath === "/home/product",
    },
    {
      name: "By Products",
      href: "/home/byproduct",
      current: currentPath === "/home/byproduct",
    },
    {
      name: "Orders",
      href: "/home/order",
      current: currentPath === "/home/order",
    },
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("logout");
      setUser({});
      try {
        await axios.post(
          "users/logout",
          {},
          {
            withCredentials: true,
          }
        );
      } catch (err) {
        console.error(err);
      }
      navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const farmernavigation = [
    {
      name: "Products",
      href: "/home/product",
      current: currentPath === "/home/product",
    },
    {
      name: "By Products",
      href: "/home/byproduct",
      current: currentPath === "/home/byproduct",
    },
    {
      name: "Orders",
      href: "/home/order",
      current: currentPath === "/home/order",
    },
    {
      name: "add product",
      href: "/home/add-product",
      current: currentPath === "/home/add-product",
    },
    {
      name: "Manage Categories",
      href: "/home/categories-crud",
      current: currentPath === "/home/categories-crud",
    },
  ];

  const [navItems, setNavItems] = useState(navigation);

  useEffect(() => {
    if (user.role === "farmer") {
      setNavItems(farmernavigation);
    }
  }, [user.role]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
        <div className="flex items-center justify-end w-full bg-black">
          <div className="" id="google_translate_element" />
        </div>

        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block w-6 h-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block w-6 h-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                    <div className="flex items-center flex-shrink-0 rounded-full">
                      <img
                        className="w-auto h-10 rounded-lg"
                        src="/Farmevo.png"
                        alt="Farmevo"
                      />
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex items-center space-x-2">
                        {navItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                        <Input
                          type="text"
                          className="w-[250px] p-2  text-gray-700 rounded-md "
                          placeholder="Search"
                          onChange={handleSearchChange}
                        />
                      </div>
                    </div>
                    {/* search bar */}
                  </div>
                  <p className="flex-1 font-semibold text-end">
                    <span className="text-white">
                      Welcome {user?.user?.fullName}
                    </span>
                  </p>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="w-8 h-8 rounded-full"
                            src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={handleLogout}
                                className={classNames(
                                  active ? "bg-gray-100 cursor-pointer" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </div>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navItems.map((item) => (
                    <Link key={item.name} to={item.href}>
                      <Disclosure.Button
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Outlet />
      </SearchContext.Provider>
    </>
  );
}

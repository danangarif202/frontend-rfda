import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBell, faCartShopping, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "next/router";
class Navbar extends Component {
  state = {
    active: "Dashboard",
    activeSearch: false,
    menu: [
      {
        name: "Dashboard",
        route: "/",
      },
      {
        name: "Product",
        route: "/product",
      },
      {
        name: "Category",
        route: "/category",
      },
    ]
  };

  componentDidMount() {
    this.pageURL();
  }

  pageURL() {
    if (window.location.pathname.includes("/product")) {
      this.setState({ active: "Product" });
    } else if (window.location.pathname.includes("/category")) {
      this.setState({ active: "Category" });
    }
  }

  render() {
    const { router, callback } = this.props;
    const { active, menu, activeSearch } = this.state;

    return (
      <div className="relative">
        <nav className="fixed top-0 left-0 right-0 shadow bg-white z-10">
          <div className="container mx-auto px-2">
            <div className="relative flex items-center justify-between h-16 my-2">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>

                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>

                  <svg
                    className="hidden h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <nav className="text-orange-700 text-2xl font-bold">
                  <div>RF|DA</div>
                </nav>
                <div className="hidden sm:block sm:ml-6 w-full">
                  <div className="flex space-x-4">
                    {menu.map((menu, idx) => (
                      <div key={idx}>
                        <div
                          className={
                            active == menu.name
                              ? "border-b-4 border-orange-700 text-orange-700 px-3 py-2 text-sm font-bold cursor-pointer"
                              : "text-gray-800 hover:text-gray-500 hover:border-gray-500 hover:border-b-4 px-3 py-2 text-sm font-medium cursor-pointer"
                          }
                          onClick={() => {
                            router.push(menu.route);
                            this.setState({ active: menu.name });
                          }}
                        >
                          {menu.name}
                        </div>
                      </div>
                    ))}
                    <div className="mx-3 w-full my-auto">
                      <div>
                        <div className="input-group relative flex mx-4">
                          <input
                            type="text"
                            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-200 rounded-l-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-400 focus:outline-none"
                            placeholder="Search"
                            onFocus={() => {
                              this.setState({ activeSearch: !activeSearch });
                              callback(true)
                            }}
                            onBlur={() => {
                              this.setState({ activeSearch: !activeSearch });
                              callback(false)
                            }}
                          />
                          <button
                            className="btn inline-block px-2 py-2 bg-gray-200 text-gray-400 font-medium text-xs leading-tight uppercase rounded-r-lg hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                            type="button"
                          >
                            <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                          </button>
                        </div>
                        {activeSearch &&
                          <div style={{ width: "54%" }} className="border mx-4 absolute h-80 bg-white rounded-lg p-3 overflow-y-scroll">
                            <div>search data</div>
                          </div>
                        }
                      </div>

                      <div className="flex text-sm ml-3">
                        {["Baju Muslim Pria", "Iphone 12 Mini", "Casing Pc", "Botol Minum", "Toples Kue Kering"].map((kategori, idx) => (
                          <div key={idx} className="mx-2 mt-1 text-gray-500">{kategori}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="p-1 mx-2 rounded-full text-gray-500 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">shopping card</span>
                  <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                </button>
                <button
                  type="button"
                  className="p-1 mx-2 rounded-full text-gray-500 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">notification</span>
                  <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                </button>
                <button
                  type="button"
                  className="p-1 mx-2 rounded-full text-gray-500 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">Message</span>

                  <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                </button>

                <div className="ml-3 relative">
                  <div className="flex">
                    <button
                      type="button"
                      className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://avatars.githubusercontent.com/u/35194643?v=4"
                        alt=""
                      />
                    </button>
                    <div className="ml-3 text-sm inline-flex items-center">

                      Danang Arif</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menu.map((menu, idx) => (
                <div
                  key={idx}
                  className={
                    active == menu.name
                      ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  }
                >
                  {menu.name}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);

import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagramSquare,
  faTwitter,
  faFacebook,
  faPinterest
} from "@fortawesome/free-brands-svg-icons";
import { withRouter } from "next/router";
class Footer extends Component {
  state = {
    active: "Dashboard",
    activeSearch: false,
    listFooter: [
      {
        label: "Tentang Kami",
        icon: false,
        desc: [
          "Hak Kekayaan Intelektual",
          "Karir",
          "Blog",
          "Bridestory",
          "Parents",
          "Mitra Blog",
          "Affiliate Program",
          "B2B Digital",
        ],
      },
      {
        label: "Beli",
        icon: false,
        desc: [
          "Tagihan & Top Up",
          "Tukar Tambah Handphone",
          "COD",
        ],
      },
      {
        label: "Jual",
        icon: false,
        desc: [
          "Pusat Edukasi Seller",
          "Mitra Toppers",
          "Daftar Official Store",
        ],
      },
      {
        label: "Bantuan dan Panduan",
        icon: false,
        desc: [
          "Care",
          "Syarat dan Ketentuan",
          "Kebijakan Privasi",
          "Mitra",
        ],
      },
      {
        label: "Ikuti Kami",
        icon: true,
        desc: [
          faInstagramSquare,
          faTwitter,
          faFacebook,
          faPinterest,
        ],
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
    const { router } = this.props;
    const { listFooter } = this.state;

    return (
      <div className="border-t">
        <div className="container mx-auto px-2 py-8">
          <div className="mx-28 flex flex-wrap overflow-hidden">

            <div className="w-full overflow-hidden lg:w-2/12">
              {listFooter.map((value, idx) => {
                if (idx == 0) {
                  return (
                    <div key={idx}>
                      <div className="font-bold px-4 text-gray-700">{value.label}</div>
                      <ul className="py-1 text-sm text-gray-600">
                        {value.desc.map((list, i) => (
                          <li
                            key={i}
                          >
                            <div className={'block py-2 px-4 hover:text-orange-700 hover:font-medium'}>{list}</div>
                          </li>
                        ))}

                      </ul>
                    </div>
                  )
                }
              }
              )}
            </div>

            <div className="w-full overflow-hidden lg:w-2/12">
              {listFooter.map((value, idx) => {
                if (idx == 1 || idx == 2) {

                  return (
                    <div key={idx}>
                      <div className="font-bold px-4 text-gray-700">{value.label}</div>
                      <ul className="py-1 text-sm text-gray-600">
                        {value.desc.map((list, i) => (
                          <li
                            key={i}
                          >
                            <div className={'block py-2 px-4 hover:text-orange-700 hover:font-medium'}>{list}</div>
                          </li>
                        ))}

                      </ul>
                    </div>
                  )
                }
              }
              )}
            </div>

            <div className="w-full overflow-hidden lg:w-3/12">
              {listFooter.map((value, idx) => {
                if (idx == 3 || idx == 4) {
                  return (
                    <div key={idx}>
                      <div className="font-bold px-4 text-gray-700">{value.label}</div>
                      {value.icon == true ?
                        <div className="flex">
                          {value.desc.map((list, i) => (
                            <FontAwesomeIcon key={i} icon={list} className="m-4 text-xl text-gray-600 hover:text-orange-600"></FontAwesomeIcon>
                            // <div>{list}</div>
                          ))}
                        </div>
                        :
                        <ul className="py-1 text-sm text-gray-600">
                          {value.desc.map((list, i) => (
                            <li
                              key={i}
                            >
                              <div className={'block py-2 px-4 hover:text-orange-700 hover:font-medium'}>{list}</div>
                            </li>
                          ))}

                        </ul>
                      }

                    </div>
                  )
                }
              }
              )}
            </div>

            <div className="w-full overflow-hidden lg:w-5/12 flex justify-end">
              <div className="w-12/12">
                <img src="https://imgur.com/UcNJhtw.jpg" />
              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Footer);

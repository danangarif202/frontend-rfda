import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faStar, faEllipsis, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../src/components/navbar";
import Footer from "../../src/components/footer";
import axios from "axios";
import CurrencyFormat from "react-currency-format";
import { withRouter } from "next/router";

class Product extends Component {
  constructor(props) {
    super(props);
    this.priceMin = React.createRef();
    this.priceMax = React.createRef();
  }
  state = {
    product: [],
    category: [],
    delivery: [],
    dataFilter: {
      page: 1,
      pageCategory: 1,
      pageDelivery: 1,
      min: null,
      max: null,
      category: [],
      paramCategory: [],
      delivery: {},
      order: "Paling Sesuai",
      paramOrder: null
    },
    pagination: 0,
    paginationCategory: 0,
    paginationDelivery: 0,
    totalData: 0,
    masterOrder: [
      {
        id: 1,
        name: "Terbaru",
        code: "new",
      },
      {
        id: 2,
        name: "Harga Tertinggi",
        code: "higt",
      },
      {
        id: 3,
        name: "Harga Terendah",
        code: "low",
      },
      {
        id: 4,
        name: "Ulasan",
        code: "review",
      },
      {
        id: 5,
        name: "Paling Sesuai",
        code: "releate",
      },
    ],
    activeDwopdown: false,
    activeFilterCategory: false,
    activeFilterDelivery: false,
    activeFilterPrice: false,
    activeSearch: false,
    isLoading: false,
    buttonBackToTop: false,
  };

  componentDidMount() { }

  componentWillUnmount() {
    this.getProduct();
    this.getCategory();
    this.getDelivery();
    document.addEventListener("scroll", this.onScroll);
    document
      .querySelector("#scrollerCategory")
      .addEventListener("scroll", this.onScrollFilter);
    document
      .querySelector("#scrollerDelivery")
      .addEventListener("scroll", this.onScrollFilter);
  }

  onScroll = (event) => {

    // console.log("window", window)
    // console.log("target", event.target.body)
    // console.log("pageYOffset", window.pageYOffset)
    // console.log("scrollHeight", document.body.scrollHeight)
    // console.log("scrollY", window.scrollY)
    // console.log("height", window.screen.height)
    // console.log("height", document.body.offsetHeight)
    // console.log("clientHeight", document.body.clientHeight)

    // =========================
    // ====== BACK TO TOP ======
    // =========================
    if (window.pageYOffset > 300) {
      this.setState({ buttonBackToTop: true });
    } else {
      this.setState({ buttonBackToTop: false });
    }


    // ====== Param Category ======
    let paramCategory = []
    this.state.dataFilter.category.map((e) => { paramCategory.push(e.id) })
    if (paramCategory.length < 1) {
      paramCategory = null
    }

    // ====== Param Order ======
    const valOrder = this.state.dataFilter.order
    let orderValue = null
    if (valOrder == "Terbaru") {
      orderValue = "new"
    } else if (valOrder == "Harga Tertinggi") {
      orderValue = "high"
    } else if (valOrder == "Harga Terendah") {
      orderValue = "low"
    }

    // ====== Param Delivery ======
    const delivery = this.state.dataFilter.delivery
    let paramDelivery = null
    if (delivery == {}) {
      paramDelivery = delivery.id
    }


    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;

    // if ((window.innerHeight + window.scrollY) >= window.screen.height) {
    // if (clientHeight - window.scrollY == 1181) {
    // if (clientHeight - window.scrollY < 1182 && clientHeight - window.scrollY > 1000) {

    if (userScrollHeight >= windowBottomHeight) {
      console.log("page", this.state.dataFilter.page)
      console.log("pagination", this.state.pagination.length)

      if (this.state.dataFilter.page < this.state.pagination.length) {

        this.setState({
          dataFilter: {
            ...this.state.dataFilter,
            page: this.state.dataFilter.page + 1
          },
        })

        const payload = {
          category: this.state.dataFilter.paramCategory,
          delivery: paramDelivery,
          order: orderValue,
          min: this.state.dataFilter.min,
          max: this.state.dataFilter.max,
          page: this.state.dataFilter.page + 1,
        }
        this.getProduct(payload)
      }

    }
  };

  onScrollFilter = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {

      if (e.target.id === "scrollerCategory") {
        if (this.state.dataFilter.pageCategory < this.state.paginationCategory.length) {
          this.setState({
            dataFilter: {
              ...this.state.dataFilter,
              pageCategory: this.state.dataFilter.pageCategory + 1
            },
          })
          this.getCategory(this.state.dataFilter.pageCategory + 1);
        }
      } else if (e.target.id === "scrollerDelivery") {
        if (this.state.dataFilter.pageDelivery < this.state.paginationDelivery.length) {
          this.setState({
            dataFilter: {
              ...this.state.dataFilter,
              pageDelivery: this.state.dataFilter.pageDelivery + 1
            },
          })
          this.getDelivery(this.state.dataFilter.pageDelivery + 1);
        }
      }
    }
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  getCategory = async (page = 1) => {
    const paramPage = page > 1 ? `&page=${page}` : "";
    axios
      .get(`${process.env.NEXT_PUBLIC_MY_BASE_URL}/category?perPage=8${paramPage}`)
      .then((res) => {
        this.setState({
          category: [...this.state.category, ...res.data.data],
        });

        const countData = Math.ceil(res.data.total_data / 8);
        let dataPagination = [];

        for (let i = 0; i < countData; i++) {
          dataPagination.push(i);
        }
        this.setState({
          paginationCategory: dataPagination,
        })
      })
      .catch((error) => {
        alert(error);
      });
  };

  getDelivery = async (page = 1) => {
    const paramPage = page > 1 ? `&page=${page}` : "";
    axios
      .get(`${process.env.NEXT_PUBLIC_MY_BASE_URL}/delivery?perPage=8${paramPage}`)
      .then((res) => {
        this.setState({
          delivery: [...this.state.delivery, ...res.data.data],
        });

        const countData = Math.ceil(res.data.total_data / 8);
        let dataPagination = [];

        for (let i = 0; i < countData; i++) {
          dataPagination.push(i);
        }
        this.setState({
          paginationDelivery: dataPagination,
        })
      })
      .catch((error) => {
        alert(error);
      });
  };

  // getProduct(category = null, delivery = null, order = null, page = null) {
  getProduct(payload) {

    const paramCategory = payload?.category != undefined && this.state.dataFilter.category.length > 0 ? `&category=[${payload.category}]` : "";
    const paramDelivery = payload?.delivery != undefined ? `&delivery=${payload.delivery}` : "";
    const paramPage = payload?.page != undefined ? `&page=${payload.page}` : "";
    const paramOrder = payload?.order != undefined && payload?.order != null ? `&order=${payload.order}` : "";
    const paramMin = payload?.min != undefined && payload?.min != null ? `&priceMin=${payload.min}` : "";
    const paramMax = payload?.max != undefined && payload?.max != null ? `&priceMax=${payload.max}` : "";

    // const paramCategory = category != null ? `&category=[${category}]` : "";
    // const paramDelivery = delivery != null ? `&delivery=${delivery}` : "";
    // const paramPage = page != null ? `page=${page}` : "";
    // const paramOrder = order != null ? `&order=${order}` : "";

    this.setState({ isLoading: true })
    axios
      .get(
        `${process.env.NEXT_PUBLIC_MY_BASE_URL}/products?perPage=15${paramPage}${paramCategory}${paramDelivery}${paramOrder}${paramMin}${paramMax}`
      )
      .then((res) => {
        this.setState({
          product: [...this.state.product, ...res.data.data],
        })

        const countData = Math.ceil(res.data.total_data / 15);
        let dataPagination = [];

        for (let i = 0; i < countData; i++) {
          dataPagination.push(i);
        }
        this.setState({
          pagination: dataPagination,
          totalData: res.data.total_data
        })
        this.setState({ isLoading: false })
      })
      .catch((error) => {
        alert(error);
      });
  }

  setOrderProduct = (val) => {


    let orderValue = null
    if (val == "Terbaru") {
      orderValue = "new"
    } else if (val == "Harga Tertinggi") {
      orderValue = "high"
    } else if (val == "Harga Terendah") {
      orderValue = "low"
    }


    this.setState({
      dataFilter: {
        ...this.state.dataFilter,
        order: val,
        paramOrder: orderValue
      },
      product: [],
      activeDwopdown: !this.state.activeDwopdown
    })

    const payload = {
      category: this.state.dataFilter.paramCategory,
      delivery: this.state.dataFilter.delivery.id,
      order: orderValue,
      min: this.state.dataFilter.min,
      max: this.state.dataFilter.max,
      page: this.state.dataFilter.page,
    }

    this.getProduct(payload);
  }

  setFilterCategory = (val) => {

    let dataFilter = this.state.dataFilter.category
    let indexValue = dataFilter.map((e) => { return e.name }).indexOf(val.name);

    if (indexValue !== -1) {
      dataFilter.splice(indexValue, 1);
    } else {
      dataFilter.push(val)
    }

    this.setState({
      dataFilter: {
        ...this.state.dataFilter,
        category: dataFilter,
      },
    });

    // reset data Product and page
    this.setState({
      dataFilter: {
        ...this.state.dataFilter,
        page: 1,
      },
      product: [],
    });

    let paramCategory = []
    dataFilter.map((e) => { paramCategory.push(e.id) })

    if (paramCategory.length < 1) {
      paramCategory = null
    }

    this.setState({
      dataFilter: {
        ...this.state.dataFilter,
        paramCategory: paramCategory
      }
    })

    const payload = {
      category: paramCategory,
      delivery: this.state.dataFilter.delivery.id,
      order: this.state.dataFilter.paramOrder,
      min: this.state.dataFilter.min,
      max: this.state.dataFilter.max,
    }

    this.getProduct(payload);

  }

  render() {
    const { router } = this.props;
    const {
      product,
      category,
      dataFilter,
      delivery,
      activeDwopdown,
      activeFilterCategory,
      activeFilterDelivery,
      activeFilterPrice,
      activeSearch,
      isLoading,
      buttonBackToTop
    } = this.state;

    return (
      <>
        <div>
          {activeSearch && <div style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} className="w-full h-screen fixed"></div>}
          <Navbar callback={(e) => { this.setState({ activeSearch: e }) }} />
          <div className="container mx-auto mt-20 py-4 md:py-8">
            <div className="mx-28 flex justify-between pl-2">
              <div className="w-2/12">
                <div className="text-black text-lg text-center font-bold inline-flex items-end">
                  Filter
                </div>
              </div>
              <div className="w-10/12">
                <div className="flex justify-between pl-6">

                  <div className="text-sm text-gray-600 inline-flex items-center">
                    Menampilkan 1 - 15 produk dari total {this.state.totalData}
                  </div>
                  <div>
                    <div className="mr-2 py-auto inline-flex items-center">Urutkan:</div>
                    <div
                      className={`${activeDwopdown ? 'rounded-t-lg' : 'rounded-lg'} cursor-pointer border w-44 justify-between text-gray-600 bg-white hover:bg-gray-100 hover:border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm px-4 py-2.5 text-center inline-flex items-center`}
                      onClick={() => {
                        this.setState({ activeDwopdown: !activeDwopdown })
                      }}
                    >
                      {dataFilter.order}
                      <FontAwesomeIcon icon={!activeDwopdown ? faChevronDown : faChevronUp}></FontAwesomeIcon>
                    </div>
                    <div className="flex justify-end">
                      <div className={`${!activeDwopdown ? 'hidden' : ''} border cursor-pointer z-10 w-44 bg-white rounded-b-lg divide-y divide-gray-100 shadow absolute`}>
                        <ul className="py-1 text-sm text-gray-600">
                          {["Terbaru", "Harga Tertinggi", "Harga Terendah", "Ulasan", "Paling Sesuai"].map((value, idx) => (
                            <li
                              key={idx}
                              onClick={() => {
                                this.setOrderProduct(value);
                              }}
                            >
                              <div className={`${dataFilter.order == value ? 'border-l-4 border-x-orange-700' : ''} block py-2 px-4 hover:bg-gray-100`}>{value}</div>
                            </li>
                          ))}

                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-28 flex flex-wrap">
              <div className="w-full lg:w-2/12 xl:w-2/12 pl-2 pt-2">

                <div className="shadow-md rounded-lg">
                  <div className="p-4 pr-3 border-b" >
                    <div className={`${!activeFilterCategory ? 'mb-2' : ''} font-bold text-left flex justify-between`}>
                      <div className="text-gray-600 text-sm">Kategory</div>
                      <div
                        onClick={() => {
                          this.setState({ activeFilterCategory: !activeFilterCategory })
                        }}
                        className="text-gray-600 text-sm"
                      >
                        <FontAwesomeIcon className="mr-1" icon={activeFilterCategory ? faChevronDown : faChevronUp}></FontAwesomeIcon>
                      </div>
                    </div>
                    <div className="max-h-36 overflow-y-auto" id="scrollerCategory">
                      {!activeFilterCategory && category.map((val, index) => {
                        const status = dataFilter.category.map((e) => { return e.name }).indexOf(val.name) > -1
                        return (
                          <div
                            className="text-black text-left cursor-pointer"
                            key={index}
                            onClick={() => this.setFilterCategory(val)}
                          >
                            <input
                              type="checkbox"
                              className="mr-2 accent-orange-600 w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 cursor-pointer"
                              checked={status}
                              onChange={() => { }}
                            />
                            <span
                              className={
                                status
                                  ? "text-orange-500 font-bold"
                                  : null
                              }
                            >
                              {val.name}
                            </span>
                          </div>
                        )
                      })
                      }
                    </div>
                  </div>

                  <div className="p-4 pr-3 border-b">
                    <div className={`${!activeFilterDelivery ? 'mb-2' : ''} font-bold text-left flex justify-between`}>
                      <div className="text-gray-600 text-sm">Pengiriman</div>
                      <div
                        onClick={() => {
                          this.setState({ activeFilterDelivery: !activeFilterDelivery })
                        }}
                        className="text-gray-600 text-sm"
                      >
                        <FontAwesomeIcon className="mr-1" icon={activeFilterDelivery ? faChevronDown : faChevronUp}></FontAwesomeIcon>
                      </div>
                    </div>
                    <div className="max-h-36 overflow-y-auto" id="scrollerDelivery">
                      {!activeFilterDelivery && delivery.map((valueDelivery, index) => {
                        return (
                          <div
                            className="text-black text-left cursor-pointer"
                            key={index}
                            onClick={() => {

                              let initValueDelivery = {}
                              if (this.state.dataFilter.delivery != {}) {
                                if (this.state.dataFilter.delivery.name != valueDelivery.name) {
                                  initValueDelivery = valueDelivery
                                }
                              }

                              this.setState({
                                dataFilter: {
                                  ...this.state.dataFilter,
                                  delivery: initValueDelivery,
                                  page: 1
                                },
                                product: []
                              });

                              if (initValueDelivery.id == undefined) {
                                initValueDelivery = null
                              } else {
                                initValueDelivery = initValueDelivery.id
                              }

                              const payload = {
                                category: this.state.dataFilter.paramCategory,
                                delivery: initValueDelivery,
                                order: this.state.dataFilter.paramOrder,
                                min: this.state.dataFilter.min,
                                max: this.state.dataFilter.max,
                              }

                              this.getProduct(payload)

                            }}
                          >
                            <input
                              type="checkbox"
                              className="mr-2 accent-orange-600 w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 cursor-pointer"
                              checked={
                                dataFilter.delivery.name === valueDelivery.name
                                  ? true
                                  : false
                              }
                              onChange={() => { }}
                            />
                            <span
                              className={
                                dataFilter.delivery.name === valueDelivery.name
                                  ? "text-orange-500 font-bold"
                                  : null
                              }
                            >
                              {valueDelivery.name}
                            </span>
                          </div>
                        )
                      })
                      }
                    </div>
                  </div>
                  <div className="p-4">
                    <div className={`${!activeFilterPrice ? 'mb-2' : ''} font-bold text-left flex justify-between`}>
                      <div className="text-gray-600 text-sm">Harga</div>
                      <div
                        onClick={() => {
                          this.setState({ activeFilterPrice: !activeFilterPrice })
                        }}
                        className="text-gray-600 text-sm"
                      >
                        <FontAwesomeIcon icon={activeFilterPrice ? faChevronDown : faChevronUp}></FontAwesomeIcon>
                      </div>
                    </div>
                    {!activeFilterPrice &&
                      <>
                        <div className="flex mt-3">
                          <span className="inline-flex items-center px-3 text-sm text-gray-500 font-bold bg-gray-100 rounded-l-md border border-r-0 border-gray-300">
                            Rp
                          </span>
                          <input
                            type="text"
                            ref={this.priceMin}
                            className="rounded-none rounded-r-lg bg-white border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 focus:border-orange-400 focus:outline-none"
                            placeholder="Harga Minimum"
                            onBlur={(e) => {
                              // if (e.key == "Enter") {}
                              if (parseInt(e.target.value) > 0) {
                                this.setState({
                                  dataFilter: {
                                    ...this.state.dataFilter,
                                    min: parseInt(e.target.value)
                                  },
                                  product: []
                                });

                                const payload = {
                                  category: this.state.dataFilter.paramCategory,
                                  delivery: this.state.dataFilter.delivery.id,
                                  order: this.state.dataFilter.paramOrder,
                                  min: parseInt(e.target.value),
                                  max: this.state.dataFilter.max,
                                }

                                this.getProduct(payload)
                              }
                            }}
                          />
                        </div>
                        <div className="flex mt-3">
                          <span className="inline-flex items-center px-3 text-sm text-gray-500 font-bold bg-gray-100 rounded-l-md border border-r-0 border-gray-300">
                            Rp
                          </span>
                          <input
                            type="text"
                            ref={this.priceMax}
                            className="rounded-none rounded-r-lg bg-white border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 focus:border-orange-400 focus:outline-none"
                            placeholder="Harga Maksimum"
                            onBlur={(e) => {
                              if (parseInt(e.target.value) > 0) {
                                this.setState({
                                  dataFilter: {
                                    ...this.state.dataFilter,
                                    max: parseInt(e.target.value)
                                  },
                                  product: []
                                });

                                const payload = {
                                  category: this.state.dataFilter.paramCategory,
                                  delivery: this.state.dataFilter.delivery.id,
                                  order: this.state.dataFilter.paramOrder,
                                  min: this.state.dataFilter.min,
                                  max: parseInt(e.target.value),
                                }

                                this.getProduct(payload)
                              }
                            }}
                          />
                        </div>
                        <div className="mt-3 w-full">
                          {[
                            "Rp38 rb - Rp99 rb",
                            "Rp120 rb - Rp250 rb",
                            "Rp350 rb - Rp400 rb",
                          ].map((list, i) => (
                            <div
                              key={i}
                              className="w-fit"
                            >
                              <div className="p-2 px-4 mb-3 border rounded-full text-sm text-gray-500">{list}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    }
                  </div>

                </div>
                <div
                  className="p-3 border text-gray-600 font-semibold mt-5 rounded-lg text-center hover:bg-orange-700 hover:text-white"
                  onClick={() => {
                    this.setState({
                      dataFilter: {
                        page: 1,
                        min: null,
                        max: null,
                        category: [],
                        paramCategory: [],
                        delivery: {},
                        order: "Paling Sesuai"
                      },
                      product: [],
                      pagination: 0
                    })

                    this.priceMin.current.value = null
                    this.priceMax.current.value = null

                    this.getProduct()
                  }}
                >Reset Filter</div>
              </div>

              <div className="w-full lg:w-10/12 xl:w-10/12 pl-6">

                <div className="flex flex-wrap lg:-mx-2 xl:-mx-2">
                  {product.map((product, index) => (
                    <div
                      key={index}
                      className="justify-center w-full lg:my-2 lg:px-2 lg:w-1/5 xl:my-2 xl:px-2 xl:w-1/5"
                    >
                      <div
                        className="rounded-lg shadow-lg bg-white max-w-sm h-full cursor-pointer"
                        onClick={() => {
                          router.push(`/product/${product.code}`);
                        }}
                      >
                        <div>
                          <img
                            className="rounded-t-lg w-full"
                            src={
                              `${process.env.NEXT_PUBLIC_MY_BASE_URL}/` +
                              product.image
                            }
                            alt={product.name}
                          />
                        </div>
                        <div className="p-4">
                          <h5 className="text-gray-900 text-sm font-medium mb-2">
                            {product.title}
                          </h5>

                          {product.selling_price > 0 ? (
                            <>
                              <div className="flex mb-1">
                                <div style={{ color: "#F94D63", backgroundColor: "#FFDBE2" }} className="text-sm font-bold px-2 mr-2 rounded-lg text-center">
                                  {(
                                    (product.selling_price / product.price) *
                                    100
                                  ).toFixed(0)}
                                  %
                                </div>
                                <div className="text-gray-500 text-sm font-medium line-through">
                                  <CurrencyFormat
                                    value={product.price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"Rp. "}
                                  />
                                </div>
                              </div>
                              <div className="text-orange-600 font-bold text-base ">
                                <CurrencyFormat
                                  value={product.selling_price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"Rp. "}
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex">
                                <div className="text-orange-600 font-bold text-base">
                                  <CurrencyFormat
                                    value={product.price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"Rp. "}
                                  />
                                </div>
                              </div>
                            </>
                          )}
                          <div className="flex">
                            <div className="mr-1"><FontAwesomeIcon icon={faStar} className="text-yellow-400"></FontAwesomeIcon></div>
                            <div className="text-sm inline-flex items-center">5.0 | Terjual 40+</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && <div className="text-center text-3xl text-gray-500 flex justify-center items-center w-full mt-3">
                    <div className=" inline-flex items-center animate-spin">
                      <FontAwesomeIcon icon={faCircleNotch}></FontAwesomeIcon>
                    </div>
                  </div>}
                  {/* <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> */}
                </div>
              </div>
            </div>
          </div>
          {buttonBackToTop && (
            <button onClick={this.scrollToTop} className="w-12 h-12 fixed bottom-8 right-8 bg-orange-700 text-white cursor-pointer rounded-full">
              <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
            </button>
          )}
          <Footer></Footer>
        </div>
      </>
    );
  }
}

export default withRouter(Product);
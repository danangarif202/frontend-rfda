import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faStar, faEllipsis, faCircleNotch, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../src/components/navbar";
import Footer from "../src/components/footer";
import CurrencyFormat from "react-currency-format";

class Home extends Component {
  state = {
    activeBanner: 1,
    activeSearch: false,
    listBanner: [
      "https://images.tokopedia.net/img/cache/1208/NsjrJu/2022/4/25/cdb402b2-f132-4f78-9566-d2c34176dee3.jpg.webp?ect=3g",
      "https://images.tokopedia.net/img/cache/1208/NsjrJu/2022/4/22/905c70b8-7e16-4b99-96e9-e9e335f41e3e.jpg.webp?ect=3g",
      "https://images.tokopedia.net/img/cache/1208/NsjrJu/2022/4/21/4580f75a-8b69-46c4-9cea-fbd75d03edd5.jpg.webp?ect=3g",
    ],
  };
  render() {
    const { activeSearch, activeBanner, listBanner } = this.state;

    const dummyData = [
      {
        "id": 1,
        "title": "2022 Outerwear Unisex Erigo Coach Jacket",
        "code": "2022-Outerwear-Unisex-Erigo-Coach-Jacket",
        "price": 83000,
        "selling_price": 45000,
        "sales": 55,
        "image": "uploads/1647958199896-product(1).jpg",
        "category_id": 3,
        "delivery_id": 1,
        "createdAt": "2022-03-17",
        "updatedAt": "2022-03-17",
        "category": {
          "id": 3,
          "name": "T-Shirt"
        },
        "delivery": {
          "id": 1,
          "name": "JNE"
        }
      },
      {
        "id": 2,
        "title": "Kaos Unisex Erigo T-Shirt",
        "code": "Kaos-Unisex-Erigo-T-Shirt",
        "price": 56000,
        "selling_price": 32000,
        "sales": 345,
        "image": "uploads/1647958199896-product(2).jpg",
        "category_id": 3,
        "delivery_id": 3,
        "createdAt": "2022-03-22",
        "updatedAt": "2022-03-22",
        "category": {
          "id": 3,
          "name": "T-Shirt"
        },
        "delivery": {
          "id": 3,
          "name": "SiCepat"
        }
      },
      {
        "id": 3,
        "title": "Kaos Unisex Erigo T",
        "code": "Kaos-Unisex-Erigo-T",
        "price": 56000,
        "selling_price": 32000,
        "sales": 43,
        "image": "uploads/1647958199896-product(3).jpg",
        "category_id": 3,
        "delivery_id": 3,
        "createdAt": "2022-03-22",
        "updatedAt": "2022-03-22",
        "category": {
          "id": 3,
          "name": "T-Shirt"
        },
        "delivery": {
          "id": 3,
          "name": "SiCepat"
        }
      },
      {
        "id": 4,
        "title": "Kaos Erigo Pria Terbaru",
        "code": "Kaos-Erigo-Pria-Terbaru",
        "price": 76000,
        "selling_price": 55000,
        "sales": 63,
        "image": "uploads/1647958199896-product(4).jpg",
        "category_id": 3,
        "delivery_id": 5,
        "createdAt": "2022-03-22",
        "updatedAt": "2022-03-22",
        "category": {
          "id": 3,
          "name": "T-Shirt"
        },
        "delivery": {
          "id": 5,
          "name": "J&T"
        }
      },
      {
        "id": 14,
        "title": "Kaos Erigo Pria/T",
        "code": "Kaos-Erigo-Pria-T",
        "price": 56000,
        "selling_price": 35000,
        "sales": 6,
        "image": "uploads/1647958199896-product(14).jpg",
        "category_id": 3,
        "delivery_id": 3,
        "createdAt": "2022-03-22",
        "updatedAt": "2022-03-22",
        "category": {
          "id": 3,
          "name": "T-Shirt"
        },
        "delivery": {
          "id": 3,
          "name": "SiCepat"
        }
      },
    ]

    const countDummy = dummyData.concat(dummyData, dummyData)

    return (
      <>
        <div>
          {activeSearch && <div style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} className="w-full h-screen fixed"></div>}
          <Navbar callback={(e) => { this.setState({ activeSearch: e }) }} />
          <div className="container mx-auto mt-20 py-4 md:py-8">
            <div className="mx-28">

              <div id="indicators-carousel" className="relative" data-carousel="static">
                <div className="overflow-hidden relative rounded-lg h-48 sm:h-64 xl:h-80 2xl:h-80">

                  {listBanner.map((value, idx) => (
                    <div
                      key={idx}
                      className="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0" data-carousel-item="3"
                    >
                      {
                        activeBanner == idx + 1 &&
                        <img src={value} className="block absolute top-1/2 left-1/2 w-full h-auto -translate-x-1/2 -translate-y-1/2" alt={idx} />
                      }
                    </div>
                  ))}

                </div>

                <div className="flex absolute bottom-5 left-5 z-30 space-x-3">
                  {listBanner.map((value, idx) => (
                    <div key={idx} className={`${activeBanner == idx + 1 ? 'bg-white' : 'bg-white/50 hover:bg-white'} w-3 h-3 rounded-full`}></div>
                  ))}
                </div>

                <div
                  className="flex absolute top-0 left-0 z-10 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                  onClick={() => {
                    if (activeBanner > 1) {
                      this.setState({ activeBanner: activeBanner - 1 })
                    } else {
                      this.setState({ activeBanner: listBanner.length })
                    }
                  }}
                >
                  <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50  group-focus:ring-2 group-focus:ring-white group-focus:outline-none">
                    <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                    <span className="hidden">Previous</span>
                  </span>
                </div>
                <div
                  className="flex absolute top-0 right-0 z-10 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                  onClick={() => {
                    if (activeBanner < listBanner.length) {
                      this.setState({ activeBanner: activeBanner + 1 })
                    } else {
                      this.setState({ activeBanner: 1 })
                    }
                  }}
                >
                  <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50  group-focus:ring-2 group-focus:ring-white group-focus:outline-none">
                    <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                    <span className="hidden">Next</span>
                  </span>
                </div>
              </div>

              <div style={{ boxShadow: "0 1px 6px 0 rgb(49 53 59 / 12%)" }} className="rounded-lg my-5 p-5">
                <div className="flex">
                  <div className="w-6/12">
                    <div className="mb-4 text-2xl font-bold">Kategori Pilihan</div>
                    <div className="flex">
                      <div className="h-28 w-28 mr-3 border p-4 rounded-lg">kategori 1</div>
                      <div className="h-28 w-28 mr-3 border p-4 rounded-lg">kategori 2</div>
                      <div className="h-28 w-28 mr-3 border p-4 rounded-lg">kategori 3</div>
                      <div className="h-28 w-28 mr-3 border p-4 rounded-lg">kategori 3</div>
                    </div>
                  </div>
                  <div className="w-6/12">
                    <div className="mb-4 text-2xl font-bold">Delivery Pilihan</div>
                    <div className="border rounded-lg w-full h-28">

                    </div>
                  </div>
                </div>

                <div className="flex mt-4">
                  {[
                    "Kategori",
                    "Handphone & Tablet",
                    "Top-Up & Tagihan",
                    "Travel & Entertainment",
                    "Perawatan Hewan",
                    "Keuangan",
                    "Komputer & Laptop"
                  ].map((value, idx) => (
                    <div key={idx} className="border mr-3 py-2 rounded-lg px-3">{value}</div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex border-t pt-5">
                  <div className="font-bold text-2xl">Spesial warga Surabaya</div>
                  <div className="mx-3 inline-flex items-end">Berakhir dalam </div>
                  <div className="px-2 py-1 text-white font-bold rounded bg-red-600 mr-2">02</div>:
                  <div className="px-2 py-1 text-white font-bold rounded bg-red-600 mx-2">14</div>:
                  <div className="px-2 py-1 text-white font-bold rounded bg-red-600 mx-2">15</div>
                  <div className="text-orange-600 font-bold inline-flex items-end">Lihat Semua</div>
                </div>

                <div className="mt-5 flex justify-end">
                  <div className="w-3/12 h-auto bg-green-400 rounded-lg text-green-400">banner</div>
                  <div className="w-9/12 flex p-3">
                    {dummyData.map((product, index) => (
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
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex border-t pt-5">
                  <div className="font-bold text-2xl mr-3">Berdasarkan pencarianmu</div>
                  <div className="text-orange-600 font-bold inline-flex items-end">Lihat Semua</div>
                </div>

                <div className="w-full flex">
                  {dummyData.map((product, index) => (
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
                </div>

              </div>

              <div className="mt-5">
                <div className="flex border-t pt-5">
                  {[
                    {
                      name: "For danang",
                      background: "bg-red-500",
                    },
                    {
                      name: "Handphone & Tablet",
                      background: "bg-green-500",
                    },
                    {
                      name: "Festival Distro Lokal",
                      background: "bg-blue-500",
                    },
                    {
                      name: "Travel & Entertainment",
                      background: "bg-yellow-500",
                    },
                    {
                      name: "Perawatan Hewan",
                      background: "bg-pink-500",
                    },
                    {
                      name: "Special Discount",
                      background: "bg-teal-500",
                    },
                  ].map((value, idx) => (
                    <div key={idx} className={`border mr-3 py-2 rounded-lg pl-3 pr-10 h-16 ${value.background} text-white font-bold`}>{value.name}</div>
                  ))}
                </div>

                <div className="w-full flex flex-wrap mt-3">
                  {countDummy.map((product, index) => (
                    <div
                      key={index}
                      className="justify-center w-full lg:my-2 lg:px-2 lg:w-1/6 xl:my-2 xl:px-2 xl:w-1/6"
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
                </div>

              </div>

            </div>
          </div>
          <Footer></Footer>
        </div>
      </>
    );
  }
}

export default Home;

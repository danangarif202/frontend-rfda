import { Component } from "react";
import Navbar from "../../src/components/navbar";
import Footer from "../../src/components/footer";
import { withRouter } from "next/router";
import axios from "axios";
import CurrencyFormat from "react-currency-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faChevronRight, faStar, faEllipsis, faCircleNotch, faPlus, faMinus, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";

class DetailProduct extends Component {
  state = {
    detail: {},
    activeSearch: false,
    activeVarian: false,
    activeCount: false,
    activeNote: false,
    modalAddToCard: false,
    tabMenu: "Detail",
    totalBelanja: 1,
    variant: null,
    note: null,
  };

  componentDidMount() {
    const { router } = this.props;
    const code = router.query.name;
    const pathname = window.location.pathname.replace("/product/", "");

    if (code !== undefined) {
      this.getDetail(code);
      console.log("by code")
    } else {
      this.getDetail(pathname);
      console.log("by pathname")
    }
  }

  getDetail(code) {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_MY_BASE_URL}/products/detail/${code}`
      )
      .then((res) => {
        this.setState({
          detail: res.data.data,
        })
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    const { detail, activeSearch, activeVarian, activeCount, activeNote, totalBelanja, modalAddToCard } = this.state;
    return (
      <>
        <div>
          {activeSearch && <div style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} className="w-full h-screen fixed"></div>}
          <Navbar callback={(e) => { this.setState({ activeSearch: e }) }} />

          {detail.title !== undefined &&
            <div className="container mx-auto mt-20 py-4 md:py-8 px-28">
              <div className="flex ml-12">

                <div className="text-orange-600">Home</div>
                <div className="mx-2 text-gray-500"><FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon></div>
                <div className="text-orange-600">{detail.category?.name}</div>
                <div className="mx-2 text-gray-500"><FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon></div>
                <div className="">{detail.title}</div>
              </div>
              <div className="flex">
                <div className="w-4/12">
                  <div className="py-4 px-12">
                    <img
                      className="rounded-lg w-full"
                      src={
                        `${process.env.NEXT_PUBLIC_MY_BASE_URL}/` +
                        detail.image
                      }
                      alt={detail.title}
                    />
                    <div className="flex mt-2">
                      {[1, 2, 3].map((val, idx) => (
                        <div key={idx} className="w-4/12 px-1">
                          <img
                            className="rounded-lg"
                            src={
                              `${process.env.NEXT_PUBLIC_MY_BASE_URL}/` +
                              detail.image
                            }
                            alt={detail.title}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-5/12">
                  <div className="py-4">
                    <div className="mb-1 text-xl font-bold text-gray-700">{detail.title}</div>
                    <div className="mb-3">Terjual <span className="text-gray-400">2 rb+</span> <FontAwesomeIcon icon={faStar} className="text-yellow-400"></FontAwesomeIcon> 4.8 <span className="text-gray-400">(1.247 ulasan)</span> Diskusi <span className="text-gray-400">(17)</span></div>
                    <div className={`${detail.selling_price > 0 ? "mb-2" : "mb-8"} text-3xl font-bold text-gray-700`}>
                      <CurrencyFormat
                        value={(detail.selling_price > 0) ? detail.selling_price : detail.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp "}
                      />
                    </div>

                    {
                      detail.selling_price > 0 &&
                      <div className="mb-8 flex">
                        <div style={{ color: "#F94D63", backgroundColor: "#FFDBE2" }} className="text-sm font-bold px-2 mr-2 rounded-lg inline-flex items-center">
                          {(
                            (detail.selling_price / detail.price) *
                            100
                          ).toFixed(0)}
                          %
                        </div>
                        <div className="line-through text-gray-500"><CurrencyFormat
                          value={detail.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp "}
                        /></div>
                      </div>
                    }

                    <div className="text-sm font-medium text-center text-gray-500 border-y border-gray-200 mb-3">
                      <ul className="flex flex-wrap -mb-px font-bold">
                        {["Detail", "Spesifikasi", "Info Penting"].map((menu, idx) => (
                          <li
                            key={idx}
                            className="mr-2"
                            onClick={() => {
                              this.setState({ tabMenu: menu })
                            }}
                          >
                            <div className={`cursor-pointer inline-block px-4 py-2 ${this.state.tabMenu === menu ? "text-orange-600 border-b-2 border-orange-600" : "border-b-2 border-transparent hover:text-gray-800"}`}>{menu}</div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {this.state.tabMenu === "Detail" ?
                      <>
                        <div>Kondisi: Baru</div>
                        <div>Berat: 200 Gram</div>
                        <div>Kategori: {detail.category?.name}</div>
                        <div className="mb-5">Etalase: {detail.category?.name}</div>
                        <div dangerouslySetInnerHTML={{ __html: detail.description }}></div>
                      </>
                      : this.state.tabMenu === "Spesifikasi" ?
                        <>
                          <div>Info Produk</div>
                          <div>Acara	:	Acara Kasual</div>
                          <div>Bahan	:	Katun</div>
                          <div>Gaya Pakaian	:	Acara Kasual</div>
                          <div>Kerah	:	Kerah Bulat</div>
                          <div>Model Penutup	:	Tanpa Kancing</div>
                          <div>Panjang Lengan	:	Lengan Pendek</div>
                        </>
                        :
                        <>
                          <div>
                            <div>Kebijakan Pengembalian Produk</div>
                            Syarat :1. Pembeli Wajib menyertakan foto tag product dengan jelas 2. Pembeli wajib menyertakan Foto struk yang tertempel pada kemasan paket yang di terima
                          </div>
                          <div>
                            <div>Prosedur Return</div>
                            Syarat :1. Pembeli Wajib menyertakan foto tag product dengan jelas 2. Pembeli wajib menyertakan Foto struk yang tertempel pada kemasan paket yang di terima
                          </div>
                        </>
                    }
                  </div>
                </div>
                <div className="w-3/12">
                  <div className="border rounded-lg ml-6 my-4">
                    <div className="p-4 border-b">
                      <div className={`${!activeVarian ? 'mb-2' : ''} font-bold text-left flex justify-between`}>
                        <div className="text-gray-600 text-sm">Pilih Varian</div>
                        <div
                          onClick={() => {
                            this.setState({ activeVarian: !activeVarian })
                          }}
                          className="text-gray-600 text-sm"
                        >
                          <FontAwesomeIcon icon={activeVarian ? faChevronDown : faChevronUp}></FontAwesomeIcon>
                        </div>
                      </div>
                      <div className="flex">

                        {!activeVarian &&
                          ["S", "M", "L", "XL"].map((val, idx) => (
                            <div
                              key={idx}
                              className={this.state.variant === val ?
                                "border rounded-full font-bold mx-1 w-8 h-8 grid place-items-center cursor-pointer text-orange-600 border-orange-500"
                                :
                                "border border-gray-400 text-gray-500 rounded-full mx-1 w-8 h-8 grid place-items-center cursor-pointer hover:text-orange-600 hover:border-orange-500"
                              }
                              onClick={() => {
                                this.setState({ variant: val })
                              }}
                            >
                              {val}
                            </div>
                          ))
                        }
                      </div>
                    </div>

                    <div className="p-4">
                      <div className={`${!activeCount ? 'mb-2' : ''} font-bold text-left flex justify-between`}>
                        <div className="text-gray-600 text-sm">Atur jumlah dan catatan</div>
                        <div
                          onClick={() => {
                            this.setState({ activeCount: !activeCount })
                          }}
                          className="text-gray-600 text-sm"
                        >
                          <FontAwesomeIcon icon={activeCount ? faChevronDown : faChevronUp}></FontAwesomeIcon>
                        </div>
                      </div>
                      {!activeCount &&
                        <div>

                          <div className="flex">

                            <div className="flex text-gray-500">
                              <div
                                className="cursor-pointer hover:text-orange-600 border-l border-y px-3 rounded-l py-0.5"
                                onClick={() => {
                                  if (totalBelanja > 1) {
                                    this.setState({ totalBelanja: parseInt(totalBelanja) - 1 })
                                  }
                                }}
                              ><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></div>
                              <div className="border-y px-4 py-0.5">{totalBelanja}</div>
                              <div
                                className="cursor-pointer hover:text-orange-600 border-r border-y px-3 rounded-r py-0.5"
                                onClick={() => (
                                  this.setState({ totalBelanja: parseInt(totalBelanja) + 1 })
                                )}
                              ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></div>
                            </div>
                            <div className="ml-4">Stok <span className="font-bold">17</span></div>
                          </div>


                          <div className="text-sm text-gray-500 mt-2 mb-3">Max. pembelian 2 pcs</div>

                          {
                            activeNote ?
                              <>
                                <input
                                  className="border w-full p-2 mb-1 rounded-lg focus:border-orange-500 focus:outline-none"
                                  placeholder="Contoh: Warna Putih, Size M"
                                  onChange={(e) => {
                                    this.setState({ note: e.target.value })
                                  }}
                                />
                                <div
                                  className="font-bold text-orange-600 mb-3"

                                ><span
                                  className="cursor-pointer"
                                  onClick={() => {
                                    this.setState({ activeNote: !activeNote })
                                  }}
                                >Batalkan Catatan</span></div>
                              </>
                              :
                              <div
                                className="font-bold text-orange-600 mb-3"
                                onClick={() => {
                                  this.setState({ activeNote: !activeNote })
                                }}
                              ><span
                                className="cursor-pointer"
                                onClick={() => {
                                  this.setState({ activeNote: !activeNote })
                                }}
                              ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon> Tambah Catatan</span></div>
                          }

                          <div className="flex justify-between mb-5">
                            <div className="inline-flex items-end text-gray-500">Subtotal</div>
                            <div>
                              <div className="text-sm line-through text-gray-500 text-right">
                                <CurrencyFormat
                                  value={detail.price * totalBelanja}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"Rp "}
                                />
                              </div>
                              <div className="font-bold text-lg">
                                <CurrencyFormat
                                  value={detail.selling_price * totalBelanja}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"Rp "}
                                />
                              </div>
                            </div>
                          </div>

                          <div
                            style={{ backgroundColor: "#03AC0E" }}
                            className="cursor-pointer py-2 font-bold text-white border text-center rounded-lg my-2"
                            onClick={() => {
                              this.setState({ modalAddToCard: !modalAddToCard })
                            }}
                          >
                            <FontAwesomeIcon className="text-sm font-bold" icon={faPlus}></FontAwesomeIcon> Keranjang</div>
                          <div style={{ color: "#03AC0E", borderColor: "#03AC0E" }} className="cursor-pointer py-2 font-bold border text-center rounded-lg">Beli Langsung</div>


                        </div>
                      }
                    </div>


                  </div>
                </div>
              </div>
            </div>
          }

          {modalAddToCard &&
            <div style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 justify-center items-center flex">
              <div className="relative p-4 w-7/12 h-full h-auto">
                <div className="relative bg-white rounded-lg shadow p-5">
                  <div
                    className="absolute right-3 top-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    onClick={() => {
                      this.setState({ modalAddToCard: !modalAddToCard })
                    }}
                  >
                    <div className="mx-2 text-gray-500"><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></div>
                  </div>
                  <div className="text-xl font-bold text-gray-600 lg:text-2xl text-center p-5">
                    Berhasil Ditambahkan
                  </div>

                  <div className="">
                    <div style={{ boxShadow: "0 1px 6px 0 var(--color-shadow,rgba(49,53,59,0.12))" }} className="flex rounded-lg mx-12 p-3 justify-between">
                      <div className="flex">
                        <div className="w-20 h-20"><img
                          className="rounded-lg"
                          src={
                            `${process.env.NEXT_PUBLIC_MY_BASE_URL}/` +
                            detail.image
                          }
                          alt={detail.code}
                        /></div>
                        <div className="ml-3 inline-flex items-center text-gray-500">{detail.title} - S</div>
                      </div>
                      <div style={{ backgroundColor: "#03AC0E" }} className="cursor-pointer py-2 px-3 font-bold text-white border text-center rounded-lg my-auto h-fit">Lihat Keranjang</div>
                    </div>
                  </div>

                  <div className="text-xl font-bold text-gray-600 lg:text-2xl py-5 mx-12">
                    Produk Lainnya
                  </div>

                  <div className="flex mx-12 mb-5 gap-x-3">
                    <div className="shadow-md h-52 border rounded-lg w-2/12"></div>
                    <div className="shadow-md h-52 border rounded-lg w-2/12"></div>
                    <div className="shadow-md h-52 border rounded-lg w-2/12"></div>
                    <div className="shadow-md h-52 border rounded-lg w-2/12"></div>
                    <div className="shadow-md h-52 border rounded-lg w-2/12"></div>
                  </div>

                </div>
              </div>
            </div>
          }
          <Footer></Footer>
        </div>
      </>

    );
  }
}

export default withRouter(DetailProduct);

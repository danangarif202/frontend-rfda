import { Component } from "react";
import Navbar from "../../src/components/navbar";

class Category extends Component {
  state = {
    activeSearch: false
  };

  // componentDidMount() {
  //   this.scrollToBottom();
  // }

  // componentDidUpdate() {
  //   this.scrollToBottom();
  // }

  // scrollToBottom() {
  //   this.el.scrollIntoView({ behavior: 'smooth' });
  // }

  render() {
    const { activeSearch } = this.state;
    return (
      <>
        <div>
          {activeSearch && <div style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} className="w-full h-screen fixed"></div>}
          <Navbar callback={(e) => { this.setState({ activeSearch: e }) }} />
          <div className="container mx-auto mt-20 py-4 md:py-8">
            <div>category</div>
          </div>
        </div>
      </>
    );
  }
}

export default Category;

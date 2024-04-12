import "../../index.css";

import Navbar from "../../ui/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      {/* <div className="background-image">TEXT</div> */}
      <div className="image-container">
        <div className="svg-father"></div>
        <div className="svg-mother"></div>
      </div>
    </>
  );
};

export default Home;

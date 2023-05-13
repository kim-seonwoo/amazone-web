import React from "react";
import "./Home.css";
import Product from "./Product";
import Header from "./Header";

function Home() {
  return (
    <div>
      <Header />

      <div classsName="home">
        <div className="home-container">
          <img
            className="home_image"
            src="https://ilyo.co.kr/contents/article/images/2021/0129/1611901862130680.jpg"
            alt="이미지"
          />

          <div className="home_row">
            <Product
              id="1"
              title="제품1"
              price={10000}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRncbHm3TpgaDAGHGctXzqWqb7CAfIrRIQc2SVyn-PMkcs_dIZpBD7zbdv2ZqYcR8wsMPo&usqp=CAU"
              rating={5}
            />
          </div>
          <div className="home_row">
            <Product
              id="2"
              title="제품2"
              price={10000}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRncbHm3TpgaDAGHGctXzqWqb7CAfIrRIQc2SVyn-PMkcs_dIZpBD7zbdv2ZqYcR8wsMPo&usqp=CAU"
              rating={3}
            />
          </div>
          <div className="home_row">
            <Product
              id="3"
              title="제품3"
              price={30000}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRncbHm3TpgaDAGHGctXzqWqb7CAfIrRIQc2SVyn-PMkcs_dIZpBD7zbdv2ZqYcR8wsMPo&usqp=CAU"
              rating={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Sporting Goods"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about_us.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Welcome to Sporting Goods, the premier source for high-quality sporting goods. We provide athletes and enthusiasts with top-tier sports equipment and apparel. Our mission is to enhance your performance and passion for sports through innovative products and a commitment to excellence. Join us in celebrating every victory, big or small. Explore our products online or visit us in-store for expert advice and a personalized shopping experience.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
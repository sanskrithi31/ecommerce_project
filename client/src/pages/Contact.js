import React from "react";
import Layout from "./../components/Layout/Layout";
import { IoIosMail } from "react-icons/io";
import { PiPhoneCall } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus1.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT FOR HELP</h1>
          <p className="text-justify mt-2">
            All your queries answered here
          </p>
          <p className="mt-3">
            <IoIosMail /> : sportinggoods@gmail.com
          </p>
          <p className="mt-3">
            <PiPhoneCall /> : 012-45637829
          </p>
          <p className="mt-3">
            <BiSupport /> : 1600-1500-1400
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
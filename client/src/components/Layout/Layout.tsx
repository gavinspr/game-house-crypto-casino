import React from "react";
import styles from "./Layout.module.scss";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { PINNED_ASSETS } from "@/constants";

type PropTypes = {
  children: JSX.Element;
};

const Layout = ({ children }: PropTypes) => {
  return (
    <div className={styles.wrap}>
      <Head>
        <meta name="description" content="Peer 2 Peer Crypto Gaming" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={PINNED_ASSETS.favicon} />
      </Head>
      <Navbar />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

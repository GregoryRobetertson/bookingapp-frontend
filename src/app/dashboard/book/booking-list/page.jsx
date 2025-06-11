"use client";
import React from "react";
import BookingList from "../../components/BookingList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function page() {
  return (
    <>
      <Header />
      <BookingList />
      <Footer />
    </>
  );
}

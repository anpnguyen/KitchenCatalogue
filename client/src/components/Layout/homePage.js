import React, { useState, useEffect } from "react";
import ContentSelect from "./contentSelect";
import PageNavigation from "./pageNavigation";
import ContentCards from "./contentCards";
import "./content.css";

function HomePage(props) {
  const { title, searchParams, arr, option } = props;

  // Page Limit
  const [pageLimit, setPageLimit] = useState(12);
  // Navigation
  const [navigation, setNavigation] = useState({
    start: 0,
    end: pageLimit,
    current: 1
  });

  //   Total items
  const totalItems = arr.length;
  const totalPages = Math.floor(arr.length / pageLimit) + 1;

  useEffect(() => {
    setNavigation({ start: 0, end: pageLimit, current: 1 });
  }, [setNavigation, pageLimit]);

  return (
    // <Content>
    <>
      <main className="content">
        <div className="contentContainer">
          <h1>{title}</h1>

          <hr className="width80" />

          <ContentSelect
            totalItems={totalItems}
            searchParams={searchParams}
            setPageLimit={setPageLimit}
            pageLimit={pageLimit}
            option={option}
            
          />

          <hr className="width80" />

          {props.children}

          <ContentCards
            navigation={navigation}
            totalPages={totalPages}
            pageLimit={pageLimit}
            data={arr}
            option={option}
            totalItems={totalItems}
          />

          <PageNavigation
            navigation={navigation}
            setNavigation={setNavigation}
            totalPages={totalPages}
            pageLimit={pageLimit}
          />
        </div>
      </main>
    </>
  );
}

export default HomePage;

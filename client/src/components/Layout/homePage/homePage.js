import React, { useState, useEffect } from "react";
import ContentSelect from "./contentSelect/contentSelect";
import PageNavigation from "./pageNavigation/pageNavigation";
import ContentCards from "./contentCards/contentCards";
import "./homepage.css";

function HomePage(props) {
  const { title, searchParams, arr, option, match } = props;

  const [pageLimit, setPageLimit] = useState(24);
    const [navigation, setNavigation] = useState({
    start: 0,
    end: pageLimit,
    current: 1
  });
 
  const totalItems = arr.length;
  const totalPages = Math.floor(arr.length / pageLimit) + 1;


  useEffect(() => {
    setNavigation({ start: 0, end: pageLimit, current: 1 });
  }, [setNavigation, pageLimit]);

  useEffect(() => {
    if (match.params.page_number) {
      let currentPage = parseInt(match.params.page_number);
      setNavigation({
        start: (currentPage - 1) * pageLimit,
        end: (currentPage - 1) * pageLimit + pageLimit,
        current: currentPage
      });
    } else {
      setNavigation({ start: 0, end: pageLimit, current: 1 });
    }
  }, [match.params, pageLimit]);

  return (
  
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
            title={title}
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

          {totalItems > pageLimit && (
            <PageNavigation
              navigation={navigation}
              setNavigation={setNavigation}
              totalPages={totalPages}
              pageLimit={pageLimit}
              option={option}
              match={match}
            />
          )}
        </div>
      </main>
    </>
  );
}

export default HomePage;

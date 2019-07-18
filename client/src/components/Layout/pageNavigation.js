import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./pageNavigation.css";

function PageNavigation(props) {
  const {
    navigation,
    setNavigation,
    totalPages,
    pageLimit,
    history,
    option,
    match
  } = props;

  // var router= ""
  // console.log(option)
  // var router = []
  // useEffect(()=>{

  //   const

  // },[])

  const router = () => {
    switch (option) {
      case "recipe":
        return "/recipe/page/";

      case "search":
        return "/recipe/search/page/";

      case "cookbook":
        return "/cookbook/page/";

      case "cookbookRecipe":
        return `/cookbook/${match.params.cookbook_id}/page/`;

      default:
        return "";
    }
  };

  console.log(router());

  //  console.log(router)

  const navigationNumbers = () => {
    let navItems = [];

    for (let i = 0; i < totalPages; i++) {
      if (i < totalPages && i >= 0)
        navItems.push(
          <div
            className={` arrows ${navigation.current === i + 1 &&
              "navigationActive"}`}
            key={i + "navButton"}
            onClick={e => handleNavigationClick(e, i)}
            value={i + 1}
          >
            {" "}
            {i + 1}{" "}
          </div>
        );
    }

    const handleNavigationClick = (e, i) => {
      if (e.target.value !== navigation.current) {
        let newNavigation = {
          start: i * pageLimit,
          end: (i + 1) * pageLimit,
          current: i + 1
        };

        setNavigation(newNavigation);
        history.push(`${router()}${newNavigation.current}`);
      }
    };
    return navItems;
  };

  const setFirst = () => {
    if (navigation.current !== 1) {
      setNavigation({ start: 0, end: pageLimit, current: 1 });
      history.push(`${router()}1`);
    }
  };

  const setNext = () => {
    if (navigation.current !== totalPages) {
      let newNavigation = {
        start: navigation.start + pageLimit,
        end: navigation.end + pageLimit,
        current: navigation.current + 1
      };
      setNavigation(newNavigation);
      history.push(`${router()}${newNavigation.current}`);
    }
  };

  const setBack = () => {
    if (navigation.current !== 1) {
      let newNavigation = {
        start: navigation.start - pageLimit,
        end: navigation.end - pageLimit,
        current: navigation.current - 1
      };
      setNavigation(newNavigation);
      history.push(`${router()}${newNavigation.current}`);
    }
  };

  const setLast = () => {
    if (navigation.current !== totalPages) {
      let newNavigation = {
        start: (totalPages - 1) * pageLimit,
        end: totalPages * pageLimit,
        current: totalPages
      };
      setNavigation(newNavigation);
      history.push(`${router()}${newNavigation.current}`);
    }
  };

  return (
    <div className="contentBoxNavigation">
      <div
        className={` arrows  ${navigation.current === 1 &&
          "navigationDisable"}`}
        onClick={setFirst}
      >
        {" "}
        {"<<"}{" "}
      </div>
      <div
        className={` arrows mr2 ${navigation.current === 1 &&
          "navigationDisable"}`}
        onClick={setBack}
      >
        {" "}
        {"<"}{" "}
      </div>
      {navigationNumbers()}
      <div
        className={` arrows ml2 ${navigation.current === totalPages &&
          "navigationDisable"}`}
        onClick={setNext}
      >
        {" "}
        >{" "}
      </div>
      <div
        className={` arrows  ${navigation.current === totalPages &&
          "navigationDisable"}`}
        onClick={setLast}
      >
        {" "}
        >>{" "}
      </div>
    </div>
  );
}

export default withRouter(PageNavigation);

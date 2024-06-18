import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Header,
  Icon,
} from "semantic-ui-react";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";
import CardsView from "../../../ui/CardsView/CardsView";
import styles from "./Parents.module.css";
import { userState } from "../../../state/atoms/userAtom";
import { getAllBabysitters } from "./parentServices";
import { filterBabysitters, sortBabysitters } from "./helpers";
import { CardsData } from "../../../ui/CardsView/CardViewProps";

const sortingOptions = [
  {
    key: "name",
    text: "By Name",
    icon: "sort alphabet ascending",
  },
  {
    key: "experience",
    text: "By Experience",
    icon: "chart line",
  },
  {
    key: "rating",
    text: "By Rating",
    icon: "star",
  },
  {
    key: "proximity",
    text: "By Proximity",
    icon: "compass",
  },
];

const filterOptions = [
  {
    key: "experience",
    text: "Experience",
    icon: "chart line",
    optionsArr: [
      { key: "No Experience", text: "No Experience" },
      { key: "1-3 Years", text: "1-3 Years" },
      { key: "3+ years", text: "3+ years" },
    ],
  },
  {
    key: "rating",
    text: "Rating",
    icon: "search",
    optionsArr: [
      { key: "goodRating", text: "More then 3 Stars" },
      { key: "badRating", text: "Less then 3 Stars" },
    ],
  },
];

const ParentsMainView = () => {
  const user = useRecoilValue(userState);
  const [sorter, setSorter] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [babysitters, setBabysitters] = useState<CardsData[] | undefined>(
    undefined
  );

  // const handleSetFilters = ({
  //   newFilterKey,
  //   newFilterValue,
  // }: {
  //   key: string;
  //   value: string;
  // }) => {
  //   // setFilters([...new Set([...filters, newFilter])]);
  // };

  const { data } = useQuery({
    queryKey: ["getAllBabysitters"],
    queryFn: () => getAllBabysitters(user.id),
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    // const array = filterBabysitters(data, filters);

    // setBabysitters(sortBabysitters(array, sorter));
    setBabysitters(data);
  }, [data, sorter, filters]);

  return (
    <>
      <BackgroundSVG />

      <div className={styles.borderedDiv}>
        <div className={styles.iconContainer}>
          <Header as="h2" icon textAlign="center">
            <Icon name="address card outline" circular />
            <Header.Content>Hello, {user?.name}</Header.Content>
          </Header>
          <p>Here you can see the babysitters available in your area</p>
        </div>

        <div className={styles.sortersContainer}>
          <Dropdown
            text="Filter Babysitters"
            icon="filter"
            floating
            labeled
            button
            direction="left"
            className={`icon ${styles.filter}`}
          >
            <DropdownMenu className={styles.widthSetter}>
              <DropdownMenu scrolling className={styles.itemMenu}>
                {filterOptions.map((option) => (
                  <DropdownItem
                    key={option.key}
                    className={styles.itemSelect}
                    onClick={(_e) => console.log(option)}
                  >
                    {option.text}
                    {option.optionsArr && (
                      <DropdownMenu
                        scrolling
                        open={isOpen}
                        className={styles.subMenu}
                      >
                        {option.optionsArr.map((el) => (
                          <DropdownItem
                            {...el}
                            className={styles.optionsArr}
                            onClick={
                              (_e) => console.log(el)
                              //   handleSetFilters(option.key, el.key)
                            }
                          />
                        ))}
                      </DropdownMenu>
                    )}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </DropdownMenu>
          </Dropdown>

          <Dropdown
            text="Sort Babysitters"
            icon="sort amount down"
            floating
            labeled
            button
            className={`icon ${styles.filter}`}
          >
            <DropdownMenu>
              <DropdownMenu scrolling>
                {sortingOptions.map((option) => (
                  <DropdownItem
                    {...option}
                    onClick={() => setSorter(option.key)}
                  />
                ))}
              </DropdownMenu>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <CardsView data={babysitters} />
    </>
  );
};

export default ParentsMainView;

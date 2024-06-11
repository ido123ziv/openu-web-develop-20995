import { Dropdown, DropdownItem, DropdownMenu, Icon } from "semantic-ui-react";
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
    key: "Important",
    text: "Important",
    label: { color: "red", empty: true, circular: true },
  },
  {
    key: "Announcement",
    text: "Announcement",
    icon: "search",
  },
];

const ParentsMainView = () => {
  const user = useRecoilValue(userState);
  const [sorter, setSorter] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);
  const [babysitters, setBabysitters] = useState<CardsData[] | undefined>(
    undefined
  );

  const handleSetFilters = (newFilter: string) => {
    setFilters([...new Set([...filters, newFilter])]);
  };

  const { data } = useQuery({
    queryKey: ["getAllBabysitters"],
    queryFn: getAllBabysitters,
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

      <div className={styles.iconContainer}>
        <Icon name="address card outline" size="huge" className={styles.icon} />
        <p>Here you can see the babysitters available in your area</p>
      </div>
      <div className={styles.headerContainer}>
        <h1 className={styles.h1}>Hello, {user.name}</h1>

        <div className={styles.sortersContainer}>
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
                    {...option}
                    className={styles.itemSelect}
                    onClick={(_e) => handleSetFilters(option.key)}
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

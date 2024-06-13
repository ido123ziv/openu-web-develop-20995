import {Icon, Image, Header} from "semantic-ui-react";
import {useRecoilValue} from "recoil";
import {useQuery} from "react-query";
import {useState} from "react";

import styles from "./Babysitter.module.css";
import {userState} from "../../../state/atoms/userAtom";
import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";
import RecommendationCards from "./RecommendationCards/RecommendationCards";
import {getInteractionsData, getRecommendations} from "./babysitterServices";
import Nodata from "../../../ui/NoData/NoData";
import StatsChart from "./StatsChart/StatsChart";

const BabysitterMainView = () => {
    const [avgRating, setAvgRating] = useState<number>(0);
    const user = useRecoilValue(userState);

    const {data: recommendations} = useQuery({
        queryKey: ["getRecommendations"],
        queryFn: () => getRecommendations(user.id),
        onSuccess: (data) => {
            if (!data.length) {
                return;
            }

            const totalRating = data.reduce((acc, obj) => acc + obj.rating, 0);
            setAvgRating(Number((totalRating / data.length).toFixed(1)));
        },
        onError: (error) => console.log(error),
    });

    const {data} = useQuery({
        queryKey: ["getInteractionsData"],
        queryFn: () => getInteractionsData(user.id),
        onError: (error) => console.log(error),
    });

    const chartData: number[] = data ? Object.values(data) : [];

    return (
        <>
            <BackgroundSVG/>
            <div className={styles.borderedDiv}>
                <div className={styles.iconContainer}>
                    <Header as="h2" icon textAlign="center">
                        <Icon name="address card outline" circular/>
                        <Header.Content>Hello, {user?.name}</Header.Content>
                    </Header>
                    <p>Here you can see your analytics</p>
                </div>

                <div className={styles.container}>
                    <div className={styles.main}>
                        <div className={styles.analytics}>
                            <h2>Analytics</h2>
                            <p>{`${data?.totalCount}` || "0"} People viewed your profile</p>
                            <p>You have {recommendations?.length || "0"} recommendations</p>
                            <p>{avgRating} AVG Rating</p>
                        </div>
                        <Image src="/babysitter.svg" size="small"/>
                    </div>
                    <div className={styles.CardsContainer}>
                        {!recommendations?.length ? (
                            <Nodata role={user.role}/>
                        ) : (
                            <RecommendationCards data={recommendations}/>
                        )}
                    </div>

                    <StatsChart data={chartData}/>
                </div>
            </div>
        </>
    );
};

export default BabysitterMainView;

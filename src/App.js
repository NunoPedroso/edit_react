import { useEffect, useState } from "react";

import BasicCard from "./components/BasicCard";

import errorsApiRest from "./data/errorsApiRest";

import "./styles.css";

export default function App() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    const url = `https://dev.to/api/articles?top=7&per_page=3`;

    const articlesArray = data?.map((article) => (
        <BasicCard
            key={article.id}
            id={article.id}
            title={article.title}
            imgPath={article.cover_image}
            imgSocial={article.social_image}
            date={article.published_at}
            description={article.description}
            link="Read More"
            url={article.url}
        />
    ));

    const getArticles = () => {
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then((result) => {
                setData(result);
                setError(false);
            })
            .catch((err) => {
                const foundError = errorsApiRest.find((e) => e.status === err.status);
                const errorMessage = () => {
                    if (foundError) {
                        return (
                            <>
                                <p>
                                    Oops, something went wrong... error <b>{foundError.status}</b>{" "}
                                    detected!
                                </p>
                                <p>
                                    <b>Reason :</b> {foundError.Reason}
                                </p>
                                <p>
                                    <b>Possible cause :</b> {foundError.description}
                                </p>
                            </>
                        );
                    } else {
                        return (
                            <p>
                                Oops, something went wrong... <b>unknown</b> error detected!
                            </p>
                        );
                    }
                };
                setError(errorMessage);
                setData([]);
            });
    };

    useEffect(() => {
        getArticles();
    }, []);

    return (
        <div className="App">
            <h1>This week top 3 Articles</h1>

            {data && <div className="articles">{articlesArray}</div>}

            {error && <span>{error}</span>}
        </div>
    );
}


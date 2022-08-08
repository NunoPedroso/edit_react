import "./form.css";
import {useEffect, useState} from "react";

import errorsApiRest from "../../data/errorsApiRest";

import BasicCard from "../BasicCard";
import { Oval } from  'react-loader-spinner'

function Form() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)

    const [inputValue, setInputValue] = useState('')
    const [url, setUrl] = useState(`https://dev.to/api/articles?top=7&per_page=3`)
    const [title, setTitle] = useState('This week top 3 Articles')

    const handleSubmit = (event) =>{
        event.preventDefault()
        if (inputValue){
            setTitle(`"${inputValue}" results`)
            setUrl(`https://dev.to/api/articles?tag=${inputValue}`)
        } else {
            setTitle('This week top 3 Articles')
            setUrl(`https://dev.to/api/articles?top=7&per_page=3`)
        }
    }

    const handleChange = (event) => {
        setInputValue(event.target.value)
    }

    useEffect(() => {

        const getArticles = () => {
            setLoading(true)
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
                })
                .finally(() =>{
                    setLoading(false)
                })
        };

        getArticles();
        
    }, [url]);



    const articlesArray = data?.map((article) => (
        <BasicCard
            key={article.id}
            id={article.id}
            title={article.title}
            alt={article.title}
            imgPath={article.cover_image}
            imgSocial={article.social_image}
            date={article.published_at}
            description={article.description}
            link="Read More"
            url={article.url}
        />
    ));

    return (
        <>

            <form className="formData" onSubmit={handleSubmit}>
                <input onChange={handleChange}/>
                <button type="submit">Search</button>
            </form>

            {(!loading) &&
                <>
                    {(data.length>0 && !error) && <h2 >{title}</h2>}

                    {data && <div className="articles">{articlesArray}</div>}

                    {data.length===0 && <h2 className="articles">No results for "{inputValue}"</h2>}

                    {error && <span>{error}</span>}
                </>
            }

            {(loading) &&

                    <div className="spinner">
                        <Oval
                            height = "200"
                            width = "200"
                            radius = "9"
                            color = 'green'
                            ariaLabel = 'three-dots-loading'
                        />
                    </div>

            }
        </>
    );
}

export default Form;

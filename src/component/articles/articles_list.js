import NavigationBar from "../../router";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    addNewItemToBasket,
    addOneQteToBasketItem,
    removeItemFromBasket,
    removeOneQteToBasketItem
} from "../../store/reducer/basket_reducer";
import {useEffect, useState} from "react";
import {GetAllArticles} from "../../api/article";

const ArticlesListPage = () => {
    const navigate = useNavigate()
    const articles = useSelector(state => state.articles.data)
    const dispatch = useDispatch()
    const [basket, setBasket] = useState([])
    const basketState = useSelector(state => state.basket.data)
    //const [error, setError] = useState({})

    useEffect(() => {
        setBasket(basketState)
        if(articles.length < 1) {
            GetAllArticles()
        }

    }, [basketState, articles])

    const AddArticle = (article_id) => {
        let found = false
        let index = 0
        // eslint-disable-next-line array-callback-return
        for(let i=0;i<basket.length;i++){
            if(basket[i].article === article_id) {
                found = true
                index = i
                break;
            }
        }
        if(found) {
            let payload = {
                index: index,
            }
            dispatch(addOneQteToBasketItem(payload))
        }else {
            let newBasketItem = {
                id: "",
                article: article_id,
                quantite: 1
            }
            dispatch(addNewItemToBasket(newBasketItem))
        }
    }


    const RemoveArticle = (article_id) => {
        // eslint-disable-next-line array-callback-return
        basket.map((item, index) => {
            let payload = {
                article_id: article_id,
            }
            if(item.article === article_id){
                if(item.quantite === 1) {
                    dispatch(removeItemFromBasket(payload))
                }else {
                    dispatch(removeOneQteToBasketItem(payload))
                }
            }
        })
    }

    return (<div className="flex flex-row">
            <NavigationBar />
            <div className="flex flex-col items-center w-full">

                <h1 className="text-3xl font-bold py-10 underline">Liste des articles</h1>

                {articles.data.length > 0 ?
                    articles.map((article, index) => {
                        if(article.is_vendable) {
                            return (
                                <div key={index} className="w-1/2 min-w-[800px]">
                                    <div className="w-auto flex flex-row shadow-2xl bg-zinc-100 max-w-5xl space-x-7 p-5 rounded-xl mb-10 h-64">
                                        <img src={article.photo} className="h-56 w-72" alt="" />
                                        <div className="flex flex-col w-2/3">
                                            <h1 className="text-2xl font-bold underline mb-5 hover:cursor-pointer" onClick={() => navigate("/articles/"+index)}>{article.nom}</h1>
                                            <p className="truncate w-auto">{article.description}</p>
                                            <p></p>
                                            <p className="">En stock: {article.stock}</p>
                                            <div className="flex justify-end flex-col pt-10 w-full">
                                                <div className="flex flex-row space-x-7">
                                                    <button className="items-end border p-2 rounded bg-green-500 w-fit" onClick={() => AddArticle(index)}>Ajouter à mon panier</button>
                                                    {basket.map((item, i) => {
                                                        if(item.article === index && item.quantite > 0) {
                                                            return(<button key={i} className="items-end border p-2 rounded bg-red-500 w-fit" onClick={() => RemoveArticle(index)}>Retirer 1 à mon panier</button>)
                                                        }else{
                                                            return (<></>)
                                                        }
                                                    })}
                                                </div>
                                                {basket.map((item, i) => {
                                                    if(item.article === index && item.quantite > 0) {
                                                        return(<div className="flex flex-row font-bold" key={i}> Présent dans votre panier avec une quantité de  {item.quantite}</div>)
                                                    }else{
                                                        return (<></>)
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }else {
                            return(<></>)
                        }
                    })
                    :
                    <></>
                }

            </div>
        </div>)
}

export default ArticlesListPage
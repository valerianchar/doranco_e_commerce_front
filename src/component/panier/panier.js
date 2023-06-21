import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import NavigationBar from "../../router";
import {removeItemFromBasket, removeOneQteToBasketItem} from "../../store/reducer/basket_reducer";

const PanierScreen = () => {
    const basketState = useSelector(state => state.basket.data.basket)
    const [basket, setBasket] = useState([])
    const articles = useSelector(state => state.articles.data.articles)
    const dispatch = useDispatch()

    useEffect(() => {
        setBasket(basketState)
    }, [basketState])

    const RemoveBasketItemQte = (article_id) => {
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
    const RemoveBasketItem = (article_id) => {
        let payload = {
            article_id: article_id,
        }
        dispatch(removeItemFromBasket(payload))
    }

    return(<div className="flex flex-row">
        <NavigationBar />
        <div className="flex flex-col items-center w-full">
            <h1 className="text-2xl mb-10">Mon Panier</h1>
            {basket.map((item, i) => {
                if(item.quantite > 0) {
                    return(
                        <div key={i}>
                            <div className="w-auto flex flex-row shadow-2xl bg-zinc-100 max-w-3xl space-x-7 p-5 rounded-xl mb-10">
                                <img src={articles[item.article].photo} className="h-24" alt="" />
                                <div className="flex flex-col w-2/3">
                                    <h1 className="text-2xl font-bold underline mb-5 hover:cursor-pointer">{articles[item.article].nom}</h1>
                                    <p className="truncate">{articles[item.article].description}</p>
                                    <p className=""> Quantités: {item.quantite}</p>
                                    <div className="flex flex-row">
                                        <button className="items-end border p-2 rounded bg-orange-500 w-fit" onClick={() => RemoveBasketItemQte(item.article)}>Retirer 1 de mon panier</button>
                                        <button className="items-end border p-2 rounded bg-red-500 w-fit" onClick={() => RemoveBasketItem(item.article)}>Retirer de mon panier</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                    return (<></>)
                })
            }
        </div>
    </div>)
}

export default PanierScreen
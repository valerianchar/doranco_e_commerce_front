import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import NavigationBar from "../../router";

const ArticleItem = () => {
    const {id} = useParams()
    const article = useSelector(state => state.articles.data.articles[id])



    return(
        <div className="flex flex-row">
            <NavigationBar />
            <div className="flex flex-row justify-center pt-24 w-full">
                <div className="bg-zinc-100 flex xl:flex-row flex-col xl:w-[50%] space-x-7 h-fit p-5">
                    <img src={article.photo} alt="" className="h-64" />
                    <div className="flex flex-col">
                        <h1 className="text-4xl underline">{article.nom}</h1>
                        <h1 className="text-xl pt-10">{article.description}</h1>
                    </div>
                </div>
            </div>
        </div>

)

}

export default ArticleItem

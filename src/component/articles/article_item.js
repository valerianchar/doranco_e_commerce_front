import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import NavigationBar from "../../router";
import {useState} from "react";
import {addCommentary} from "../../store/reducer/article_reducer";
import {AddCommentaire} from "../../api/article";

const ArticleItem = () => {
    const {id} = useParams()
    const article = useSelector(state => state.articles.data[id])
    const current_user = useSelector(state => state.auth.data)
    const dispatch = useDispatch()

    const [comm, setComm] = useState()

    const handleCommentChange = (e) => setComm(e.target.value)
    const handleSubmit = (e, article_id, user_id) => {
        e.preventDefault()
        let payload = {
            index: id,
            comm: {
                id: 0,
                text: comm,
                note: 0,
                article: article_id,
                utilisateur: user_id,
            }
        }
        dispatch(addCommentary(payload))
        setComm("")
        AddCommentaire(payload.comm)
    }

    return(
        <div className="flex flex-row">
            <NavigationBar />
            <div className="flex flex-col items-center pt-24 w-full">
                <div className="bg-zinc-100 flex xl:flex-row flex-col xl:w-[50%] space-x-7 h-fit p-5">
                    <img src={article.photo} alt="" className="h-64" />
                    <div className="flex flex-col">
                        <h1 className="text-4xl underline">{article.nom}</h1>
                        <h1 className="text-xl pt-10">{article.description}</h1>
                    </div>
                </div>
                <h1 className="flex xl:w-[50%] text-2xl font-bold text-start" >Ajoutez un commentaire</h1>
                <form className="flex flex-col w-full text-2xl xl:w-[50%]" onSubmit={handleSubmit}>
                    <textarea value={comm} onChange={(e) => handleCommentChange(e, article.id, current_user.id)} className="flex w-full h-44 text-2xl"></textarea>
                    <button type="submit" className="flex justify-end">Ajouter un commentaire</button>
                </form>
                {
                    article.commentaires.map((comm, i) => {
                        return(
                            <div key={i} className="flex flex-col xl:w-[50%] border space-y-3 p-4">
                                <div>Utilisateur: {comm.utilisateur}</div>
                                <div className="">{comm.text}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

)

}

export default ArticleItem

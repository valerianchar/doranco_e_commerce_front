import NavigationBar from "../../router";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {addOneArticle, removeOneArticle, updateOneArticle} from "../../store/reducer/article_reducer";

const ManageArticles = () => {

    const articles = useSelector(state => state.articles.data)
    const categorieState = useSelector((state => state.categories.data))
    const [updateElement, setUpdateElement] = useState(false)
    const [updatingIndex, setUpdatingIndex] = useState(0)
    const [formType, setFormType] = useState("")
    const dispatch = useDispatch()

    const [nom, setNom] = useState("")
    const [description, setDescription] = useState("")
    const [prix, setPrix] = useState(0)
    const [remise, setRemise] = useState(0)
    const [stock, setStock] = useState(0)
    const [isVendable, setIsVendable] = useState(false)
    const [photo, setPhoto] = useState("")
    const [video, setVideo] = useState("")
    const [categorie, setCategorie] = useState(0)

    const updateSwitcher = (index) => {
        setFormType("update")
        setUpdatingIndex(index)
        setUpdateElement(!updateElement)
        setNom(articles[index].nom)
        setDescription(articles[index].description)
        setPrix(articles[index].prix)
        setRemise(articles[index].remise)
        setStock(articles[index].stock)
        setIsVendable(articles[index].is_vendable)
        setPhoto(articles[index].photo)
        setVideo(articles[index].video)
        setCategorie(articles[index].categorie.id)
    }
    const handleNomChange = (e) => setNom(e.target.value)
    const handleDescriptionChange = (e) => setDescription(e.target.value)
    const handlePrixChange = (e) => setPrix(e.target.value)
    const handleRemiseChange = (e) => setRemise(e.target.value)
    const handleStockChange = (e) => setStock(e.target.value)
    const handleIsVendableChange = (e) => setIsVendable(!isVendable)
    const handlePhotoChange = (e) => setPhoto(e.target.value)
    const handleVideoChange = (e) => setVideo(e.target.value)
    const handleCategorieChange = (e) => setCategorie(e.target.value)
    const handleUpdateElementSubmit = (e) => {
        e.preventDefault()
        switch (formType) {
            case "update":
                let payloadUpdate = {
                    index: updatingIndex,
                    update: {
                        id: articles[updatingIndex].id,
                        nom: nom,
                        description: description,
                        prix: prix,
                        remise: remise,
                        stock: stock,
                        is_vendable: isVendable,
                        photo: photo,
                        video: video,
                        commentaires: articles[updatingIndex].commentaires,
                        categorie: categorie,
                    }
                }
                dispatch(updateOneArticle(payloadUpdate))
                setUpdateElement(!updateElement)
                break
            case "create":
                let payloadCreate = {
                    id: 0,
                    nom: nom,
                    description: description,
                    prix: prix,
                    remise: remise,
                    stock: stock,
                    is_vendable: isVendable,
                    photo: photo,
                    video: video,
                    commentaires: [],
                    categorie: categorie
                }
                dispatch(addOneArticle(payloadCreate))
                setUpdateElement(!updateElement)
                break
            default:
                return
        }

    }
    const CreateNewArticle = () => {
        setFormType("create")
        setUpdateElement(!updateElement)
        setNom("")
        setDescription("")
        setPrix(0)
        setRemise(0)
        setStock(0)
        setIsVendable(false)
        setPhoto("")
        setVideo("")
        setCategorie(0)
    }
    const RemoveArticle = (index) => {
        let payload = {
            index: index
        }
        dispatch(removeOneArticle(payload))
    }

    return (<div className="flex flex-row">
            <NavigationBar />
            <div className="flex flex-col w-full items-center">
                {!updateElement ?
                    <>
                        <h1 className="text-2xl font-bold underline pt-10">Gestion des produits</h1>
                        <table className="table w-fit h-fit items-center border-2 m-10 rounded-t-2xl mt-14">
                            <thead>
                            <tr>
                                <th className="bg-blue-100 border px-8 py-2">Nom du produit</th>
                                <th className="bg-blue-100 border px-16 py-2">Description</th>
                                <th className="bg-blue-100 border  px-8 py-2">Est vendable ?</th>
                                <th className="bg-blue-100 border px-5 py-2"></th>
                            </tr>
                            </thead>
                            <tbody >
                            {
                                articles.length > 0 ?
                                    articles.map((article, index) => {
                                        return(
                                            <tr key={index} className="h-fit">
                                                <th className="border px-8">{article.nom}</th>
                                                <th className="border px-8 truncate max-w-2xl">{article.description}</th>
                                                <th className="border px-8">{article.is_vendable === true ? "Vendable" : "Non vendable"}</th>
                                                <th className="border px-8 space-x-7">
                                                    <i onClick={() => updateSwitcher(index)} className="fa-solid fa-pen-to-square hover:cursor-pointer"></i>
                                                    <i onClick={() => RemoveArticle(index)} className="fa-solid fa-trash fa-spin-pulse hover:cursor-pointer"></i>
                                                </th>
                                            </tr>
                                        )
                                    })
                                    :
                                    <></>
                            }
                            <tr className="h-fit">
                                <th></th>
                                <th></th>
                                <th></th>
                                <th className="hover:cursor-pointer" onClick={CreateNewArticle}><i
                                    className="fa-solid fa-plus fa-beat-fade fa-lg text-2xl"></i></th>
                            </tr>
                            </tbody>
                        </table>
                    </> :
                    <>
                        <div className="flex justify-center border bg-zinc-100 mt-10">
                            <form onSubmit={handleUpdateElementSubmit} className="flex flex-col">
                                <div className="flex flex-row space-x-14  py-6">
                                    <div className="flex flex-col w-96">
                                        <label className="font-bold underline">Nom du produit</label>
                                        <input className="bg-transparent border-b-2 h-10" type="text" value={nom} onChange={handleNomChange}/>
                                    </div>
                                    <div className="flex flex-col w-96">
                                        <label className="font-bold underline">description du produit</label>
                                        <textarea className="bg-transparent border-b-2 h-10" value={description} onChange={handleDescriptionChange}/>
                                    </div>
                                </div>
                                <div className="flex flex-row space-x-14 py-6">
                                    <div className="flex flex-col w-96">
                                        <label className="font-bold underline">Prix du produit</label>
                                        <input className="bg-transparent border-b-2 h-10" type="number" value={prix}  onChange={handlePrixChange}/>
                                    </div>
                                    <div className="flex flex-col w-96">
                                        <label  className="font-bold underline">Stock disponible</label>
                                        <input  className="bg-transparent border-b-2 h-10 " type="number" value={stock} onChange={handleStockChange}/>
                                    </div>
                                </div>
                                <div className="flex flex-row space-x-14 py-6">
                                    <div className="flex flex-col w-96">
                                        <label  className="font-bold underline">Remise sur le produit (%)</label>
                                        <input className="bg-transparent border-b-2 h-10 " type="number" value={remise} onChange={handleRemiseChange} />
                                    </div>
                                    <div className="flex flex-col w-96">
                                        <label  className="font-bold underline">Eligibilité à la vente</label>
                                        <input type="checkbox" checked={isVendable} onChange={handleIsVendableChange}/>
                                    </div>
                                </div>
                                <div className="flex flex-row space-x-14 py-6">
                                    <div className="flex flex-col w-96">
                                        <label  className="font-bold underline">Lien de la photo</label>
                                        <input className="bg-transparent border-b-2 h-10 " type="text" value={photo} onChange={handlePhotoChange} />
                                    </div>
                                    <div className="flex flex-col w-96">
                                        <label  className="font-bold underline">Lien de la vidéo (si nécessité)</label>
                                        <input className="bg-transparent border-b-2 h-10 " type="text" value={video} onChange={handleVideoChange} />
                                    </div>
                                </div>
                                <div className="flex flex-row space-x-14 py-6">
                                    <div className="flex flex-col w-96">
                                        <label  className="font-bold underline">Sélectionnez une catégorie</label>
                                        <select onChange={handleCategorieChange}>
                                            <option>Sélectionner une catégorie</option>
                                            {categorieState.map((item, i) => {
                                                return(<option key={i} value={item.id}>{item.nom}</option>)
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="w-max flex justify-center">
                                    <button className="border p-2 rounded bg-blue-400 w-fit">Valider les modifications</button>
                                </div>
                            </form>
                        </div>
                    </>
                }
            </div>
        </div>)
}

export default ManageArticles
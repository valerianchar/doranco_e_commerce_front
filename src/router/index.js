import {createBrowserRouter, Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import LoginScreen from "../component/auth/login";
import {useSelector} from "react-redux";
import ArticlesListPage from "../component/articles/articles_list";
import ArticleItem from "../component/articles/article_item";
import ManageArticles from "../component/articles/manage_articles";
import PanierScreen from "../component/panier/panier";
import {GetAllArticles, GetAllCategories} from "../api/article";

export const routes = createBrowserRouter([
    {
        path: "/",
        name: "Articles",
        errorElement: "404",
        children: [
            {
                path: "/",
                name: "Liste des articles",
                element: <ArticlesListPage />
            },
            {
                path: "/articles/:id",
                element: <ArticleItem />
            },
            {
                path: "/articles/manage",
                name: "Gestion des articles",
                element: <ManageArticles />
            },
            {
                path: "/articles/panier",
                name: "Mon panier",
                element: <PanierScreen />,
            },
            {
                path: "/articles/panier/resume",
                element: <h1>2</h1>
            },
            {
                path: "/articles/commentaires",
                name: "Mes commentaires",
                element: <p>Liste des commentaires de l'utilisateurs</p>
            }
        ]
    },
    {
        path: "/admin",
        name: "Administration",
        children: [
            {
                path: "/admin",
                name: "Gestion des administrateurs",
                element: <h1>Gestion des Administrateurs</h1>
            },
        ]
    },
    {
        path: "/auth",
        name: "auth",
        errorElement: <h1>404</h1>,
        children: [
            {
                path: "/auth/register",
                name: "S'enregistrer",
                element: <h1>Register Page</h1>
            },
            {
                path: "/auth/login",
                name: "Se connecter",
                element: <LoginScreen />
            }
        ]
    }
])

const NavigationBar = () => {
    const auth = useSelector(state => state.auth.data)
    const articles = useSelector(state => state.articles.data)
    const categories = useSelector(state => state.categories.data)
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate()  //pour la gestion de state
    const locator = useLocation()

    useEffect(() => {
        console.log(auth)
        if(auth.id === undefined){
            console.log(2)
            navigate("/auth/login")
        }
        if(articles.length < 1) {
            GetAllArticles()
        }
        if(categories.length < 1){
            GetAllCategories()
        }
    }, [articles, auth, categories, navigate])

    return (
        <>
            <div className="flex flex-col min-w-max w-[320px] px-8 max-w-sm h-screen bg-black text-white items-center justify-center text-center">
                    <ul>
                        <li>
                            <Link to="/logout" className="text-2xl">{ auth.data !== undefined ? <>{auth.data.prenom} {auth.data.nom} </>: <></> }</Link>
                        </li>
                        {
                            routes.routes.map((route, index) => {
                                if(auth.data === {}) {
                                    if(route.name !== "auth") {
                                        return (<></>)
                                    }else {
                                        return (
                                            <li key={index} className="py-5">
                                                <h1 className="text-2xl"> {route.name} </h1>
                                                <ul className="mt-4">
                                                    {route.children ?
                                                        route.children.map((child, i) => {
                                                            return(
                                                                <li key={i}>
                                                                    {locator.pathname === child.path ?
                                                                        <Link to={child.path} className="underline font-bold">{child.name}</Link>
                                                                        :
                                                                        <Link to={child.path}>{child.name}</Link>
                                                                    }
                                                                </li>
                                                            )
                                                        })
                                                        :
                                                        <></>}
                                                </ul>
                                            </li>
                                        )
                                    }
                                }else{
                                    if(auth.profil === "Admin") {
                                        if(route.name === "auth" || route.name === "Resume"){
                                            return(<div key={index}></div>)
                                        }else{
                                            return (<li key={index} className="py-5">
                                                    <h1 className="text-2xl"> {route.name} </h1>
                                                    <ul className="mt-4">
                                                        {route.children ?
                                                            route.children.map((child, i) => {
                                                                return(
                                                                    <li key={i}>
                                                                        {locator.pathname === child.path ?
                                                                            <Link to={child.path} className="underline font-bold">{child.name}</Link>
                                                                            :
                                                                            <Link to={child.path}>{child.name}</Link>
                                                                        }
                                                                    </li>
                                                                )
                                                            })
                                                            :
                                                            <></>}
                                                    </ul>
                                                </li>
                                            )
                                        }
                                    }else if(auth.profil === "Magasinier"){
                                        if(route.name === "auth" || route.name === "Administration"){
                                            return (
                                                <div key={index}></div>
                                            )
                                        }else{
                                            return(
                                                <li key={index} className="py-5">
                                                    <h1 className="text-2xl"> {route.name} </h1>
                                                    <ul className="mt-4">
                                                        {route.children ?
                                                            route.children.map((child, i) => {
                                                                if(child.name === "Resume" || child.name === "Mon panier" || child.name === "Liste des articles") {
                                                                    return (<div key={i}></div>)
                                                                }else {
                                                                    return(
                                                                        <li key={i}>
                                                                            {locator.pathname === child.path ?
                                                                                <Link to={child.path} className="underline font-bold">{child.name}</Link>
                                                                                :
                                                                                <Link to={child.path}>{child.name}</Link>
                                                                            }
                                                                        </li>
                                                                    )
                                                                }
                                                            })
                                                            :
                                                            <></>}
                                                    </ul>
                                                </li>
                                            )
                                        }
                                    }else {
                                        if(route.name === "auth" || route.name === "Administration" || route.name === "Resume"){
                                            return (
                                                <div key={index}></div>
                                            )
                                        }else{
                                            return(
                                                <li key={index} className="py-5">
                                                    <h1 className="text-2xl"> {route.name} </h1>
                                                    <ul className="mt-4">
                                                        {route.children ?
                                                            route.children.map((child, i) => {
                                                                if(child.name === "Gestion des articles" || child.name === "Resume") {
                                                                    return (<div key={i}></div>)
                                                                }else {
                                                                    return (
                                                                        <li key={i}>
                                                                            {locator.pathname === child.path ?
                                                                                <Link to={child.path}
                                                                                      className="underline font-bold">{child.name}</Link>
                                                                                :
                                                                                <Link
                                                                                    to={child.path}>{child.name}</Link>
                                                                            }
                                                                        </li>
                                                                    )
                                                                }
                                                            })
                                                            :
                                                            <></>}
                                                    </ul>
                                                </li>
                                            )
                                        }
                                    }
                                }
                            })
                        }
                </ul>
            </div>
        </>
    )
}

export default NavigationBar;
import React from "react";
import { FavoritePreview } from "../Favorites/FavoritePreview";

export const FavoriteList=({favorites})=>{
    
    return(
        <section className="favorite-list flex">
            {favorites?.map((favorite)=>{
                return(
                    <FavoritePreview location={favorite} key={favorite.info.Key}/>
                )
            })}
        </section>
    )
}
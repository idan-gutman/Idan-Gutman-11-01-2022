import React from "react";
import { Box, Card } from "@material-ui/core";
import { weatherService } from "../../services/weatherService";
import { useDispatch } from "react-redux";
import { removeFromFavorites, setCurrentLocation } from "../../store/actions/WeatherActions";
import { useHistory } from "react-router-dom";
import {ReactComponent as Delete} from '../../assets/images/delete.svg'
import { TempPreview } from "../TempPreview";


export const FavoritePreview = ({ location }) => {
    
    const { setIcon } = weatherService;
    const dispatch = useDispatch();
    const history = useHistory();
    

    const onSelectLocation = (ev)=>{
        ev.stopPropagation()
        ev.preventDefault()
        dispatch(setCurrentLocation(location.info));
        history.push('/')
    }

    const onRemoveFavorite = (ev) =>{
        ev.stopPropagation()
        dispatch(removeFromFavorites(location))
    }

  return (
    <Box className="favorite-preview card-hover" key={location.info.Key}>
      <Card className="favorite-card" onClick={(ev)=>onSelectLocation(ev)}>
        <section className="card-container flex column align-center">
          <p className={'title'}>{location.info.LocalizedName}</p>
          <img src={`https://www.accuweather.com/images/weathericons/${setIcon(location.currWeather[0].Day.Icon)}.svg`} alt="" />
              <TempPreview dailyForecast={location.currWeather[0]}/>
            <Delete onClick={(ev)=>onRemoveFavorite(ev)} className='delete-btn pointer'/>
        </section>
      </Card>
    </Box>
  );
};

import { Grid, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { handleSearch } from '../../helpers/BackendAPICalls';
import { UserContext } from '../../helpers/Contexts';
import { Commodity, Items } from '..';
import useStyles from './styles';
import FilterContainer from './FilterContainer';

const Search = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { searchQuery } = useParams();
    const { setSearchTerm, setSort, setCategories, isLoading, setIsLoading } = useContext(UserContext);
    const [commodities, setCommodities] = useState(null);

    useEffect(() => {
        if (searchQuery) {
            setIsLoading(true);
            const payload = {};
            const array = searchQuery.split('&');
            array.forEach((query) => {
                const queryArray = query.split('=');
                switch (queryArray[0]) {
                    case 'search':
                        payload.searchTerm = queryArray[1];
                        setSearchTerm(queryArray[1]);
                        break;
                    case 'sort':
                        payload.sort = queryArray[1];
                        setSort(queryArray[1]);
                        break;
                    case 'categories':
                        payload.categories = queryArray[1];
                        break;
                    default:
                        break;
                }
            });
            if (!payload.sort) {
                var url = `/search=${payload.searchTerm}&sort=Relevance`;
                if (payload.categories) {
                    url += `&categories=${payload.categories}`;
                }
                setIsLoading(false);
                navigate(url);
                window.scrollTo(0, 0);
            } else {
                if (payload.categories) {
                    payload.categories = payload.categories.split('_').filter(function (e) {
                        return e != null && e.length > 0;
                    });
                } else {
                    payload.categories = [];
                }
                setCategories(payload.categories);
                handleSearch(payload).then((commodities) => {
                    setCommodities(commodities);
                    setIsLoading(false);
                });
            }
        }
    }, [navigate, searchQuery, setCategories, setIsLoading, setSearchTerm, setSort]);

    return (
        <>
            {!isLoading && commodities && (
                <Grid container spacing={2} className={classes.root} align="center">
                    <Grid item xs={12} key="options">
                        <FilterContainer />
                    </Grid>
                    <Grid item xs={12} key="commodities">
                        {commodities.length === 0 ?
                            <Typography variant="caption" color="textSecondary">
                                <br />
                                "No result is found"
                            </Typography>
                            :
                            <Items items={commodities} Item={Commodity} />
                        }
                        
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default Search
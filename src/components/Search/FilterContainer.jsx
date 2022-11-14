import { Button, CircularProgress, Collapse, Container, Grid } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp, Category, FilterList, Sort } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { fetchCategories, fetchSorts } from '../../helpers/BackendAPICalls';
import { UserContext } from '../../helpers/Contexts';
import { RadioInput } from '..';
import CheckBoxInputs from './CheckBoxInputs';
import Options from './Options';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';

const FilterContainer = () => {
    const classes = useStyles();
    const methods = useForm();
    const navigate = useNavigate();
    const { searchTerm, sort, setSort, categories, setCategories } = useContext(UserContext);
    const [categoryOptions, setCategoryOptions] = useState(null);
    const [sortOptions, setSortOptions] = useState(null);
    const [isFiltersDisplayed, setIsFiltersDisplayed] = useState(true);

    useEffect(() => {
        if (sort) {
            fetchCategories().then((categories) => {
                let options = [];
                categories.forEach((category) => {
                    options.push(category.name);
                });
                setCategoryOptions(options);
            });
            fetchSorts().then((sorts) => {
                setSortOptions(sorts);
            });
        }
    }, [sort]);

    const handleCategoryChange = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        var array = categories;
        if (array.includes(name) && !checked) {
            array.splice(array.indexOf(name), 1);
        } else if (!array.includes(name) && checked) {
            array.push(name)
        }
        setCategories(array);
    }

    const handleSortChange = (e) => {
        setSort(e.target.value);
    }

    const onConfirm = (data) => {
        var url = `/search=${searchTerm}&sort=`;
        var categoriesParam = '&categories='
        for (const [key, value] of Object.entries(data)) {
            if (key === 'Sorts') {
                url += `${value}`;
            } else if (value) {
                categoriesParam += `${key}_`;
            }
        }
        if (categoriesParam.includes('_')) {
            url += categoriesParam.slice(0, -1);
        }
        navigate(url);
        window.scrollTo(0, 0);
    };


    return (
        <Container
            maxWidth="lg"
            className={classes.filterContainer}
        >
            <Button
                fullWidth
                variant="outlined"
                onClick={() => setIsFiltersDisplayed(!isFiltersDisplayed)}
            >
                <FilterList />
                Filter
                {isFiltersDisplayed ?
                    <ArrowDropUp />
                    :
                    <ArrowDropDown />
                }
            </Button>
            <Collapse in={isFiltersDisplayed}>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit((data) => (onConfirm({ ...data })))}>
                        <Grid container spacing={2} align="center">
                            <Grid item xs={12}>
                                {!categories || !categoryOptions ?
                                    <CircularProgress />
                                    : <Options
                                        label="Categories"
                                        options={categoryOptions}
                                        defaultOption={categories}
                                        Icon={Category}
                                        Type={CheckBoxInputs}
                                        handleChange={handleCategoryChange}
                                    />
                                }
                                {!sort || !sortOptions ?
                                    <CircularProgress />
                                    : <Options
                                        label="Sorts"
                                        options={sortOptions}
                                        defaultOption={sort}
                                        Icon={Sort}
                                        Type={RadioInput}
                                        handleChange={handleSortChange}
                                    />
                                }
                            </Grid>
                            <Grid item xs={12} >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Confirm
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </FormProvider>
            </Collapse>
        </Container>
    )
}

export default FilterContainer
import React from 'react';

import { Grid } from '@material-ui/core';

import useStyles from './styles';

const Items = ({ items, Item }) => {
    const classes = useStyles();

    return (
        <main className={classes.root}>
            <Grid container justifyContent="center" spacing={4} className={classes.content}>
                {items.map((item) => (
                    <Grid item key={item.cid ? item.cid : item.name} xs={12} sm={6} md={4} lg={3}>
                        <Item
                            item={item}
                        />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
};

export default Items;
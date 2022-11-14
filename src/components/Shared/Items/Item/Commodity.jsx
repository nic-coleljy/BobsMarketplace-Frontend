import React, { useContext } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Button, Link } from '@material-ui/core';
import { ShoppingBasket } from '@material-ui/icons';

import useStyles from './styles';
import { RoleEnum } from '../../../../helpers/Role';
import { UserContext } from '../../../../helpers/Contexts';
import { useNavigate } from 'react-router-dom';

const Commodity = ({ item }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);

    const handleOnCategoryClicked = () => {
        navigate(`/search=${item.categoryEntity.name}&categories=${item.categoryEntity.name}`);
        window.scrollTo(0, 0);
    };

    return (
        <>
            {item &&
                <Card className={classes.root}>
                    <CardMedia component={Link} href={`/commodity/${item.cnid}`} className={classes.media} image={item.pictureUrl} title={item.name} />
                    <CardContent component={Link} href={`/commodity/${item.cnid}`} className={classes.cardContent}>
                        <div className={classes.cardContentPrimary}>
                            <Typography variant="h5" color="textPrimary" gutterBottom>
                                {item.name}
                            </Typography>
                            {item.commodity &&
                                <Typography variant="h6" color="textPrimary">
                                    SGD {item.commodity.price}/{item.uom}
                                </Typography>
                            }
                        </div>
                    </CardContent>
                    <CardActions disableSpacing className={classes.cardActions}>
                        {item.categoryEntity &&
                            <Button
                                onClick={handleOnCategoryClicked}
                                variant="outlined"
                            >
                                {item.categoryEntity.name}
                            </Button>
                        }
                        {currentUser && currentUser.role === RoleEnum.BUYER && item.commodity &&
                            <IconButton
                                href={`/purchase/${item.cnid}`}
                                color="primary"
                            >
                                <ShoppingBasket />
                            </IconButton>
                        }
                    </CardActions>
                </Card>
            }
        </>
    )
};

export default Commodity;

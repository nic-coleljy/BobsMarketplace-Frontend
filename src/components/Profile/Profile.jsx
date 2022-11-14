import { Divider, Link, Paper, Typography } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../helpers/Contexts';
import { EditableProfileFieldEnum } from '../../helpers/EditableProfileField';
import { RoleEnum } from '../../helpers/Role';
import { DataField, AvatarIcon } from '..';
import useStyles from './styles';
import { fetchSellerLicenses } from '../../helpers/BackendAPICalls';

const Profile = () => {
    const classes = useStyles();
    const { currentUser, setIsLoading, isLoading } = useContext(UserContext);
    const [licenses, setLicenses] = useState([]);

    useEffect(() => {
        if (currentUser && currentUser.role === RoleEnum.SELLER) {
            setIsLoading(true);
            fetchSellerLicenses(currentUser.id).then((licenses) => {
                setLicenses(licenses);
                setIsLoading(false);
            });
        }
    }, [currentUser, setIsLoading]);

    return (
        <>
            {currentUser && !isLoading && (
                <Paper className={classes.root} align='center'>
                    <AvatarIcon
                        Icon={Person}
                    />
                    <br />
                    <Typography variant='h4' >
                        Profile
                    </Typography>
                    <br />
                    <Divider />
                    <br />
                    <DataField
                        label="Name"
                        data={currentUser.companyName}
                    />
                    {/* <Link href={`/profile/edit/${EditableProfileFieldEnum.NAME}`}>
                            Edit
                        </Link>
                        <br />
                        <br /> */}
                    <DataField
                        label="Email"
                        data={currentUser.email}
                    />
                    {/* <Link href={`/profile/edit/${EditableProfileFieldEnum.EMAIL}`}>
                            Edit
                        </Link>
                        <br />
                        <br /> */}
                    <DataField
                        label="Role"
                        data={currentUser.role}
                    />
                    {currentUser.role === RoleEnum.SELLER && (
                        <>
                            <DataField
                                label="Number of Licenses"
                                data={licenses.length}
                                href="/license"
                            />
                            <DataField
                                label="Credibility"
                                data={currentUser.credibility}
                            />
                        </>
                    )}
                    {currentUser.role === RoleEnum.BUYER && (
                        <>
                            <DataField
                                label="Business Profile URL"
                                data={currentUser.businessProfileUrl}
                            />
                            {/* <Link href={`/profile/edit/${EditableProfileFieldEnum.BUSINESS_PROFILE_URL}`}>
                                    Edit
                                </Link>
                                <br />
                                <br /> */}
                            <DataField
                                label="Credit Score"
                                data={currentUser.creditScore + "/100"}
                            />
                        </>
                    )}
                </Paper>
            )}
        </>
    )
}

export default Profile
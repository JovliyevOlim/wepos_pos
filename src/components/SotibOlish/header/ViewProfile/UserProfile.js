import {useTranslation} from 'react-i18next';
import React from "react";
import {connect} from "react-redux";
import users, {userInfo} from "../../../../reducer/users";
import XodimReducer, {getXodim} from "../../Sidebar/Hodimlar/reducer/XodimReducer";

function UserProfile() {


    // const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'))


    return (
        <div className={'p-2 col-md-12 mb-3'}>
            <div className={'colorback'}>
                {/*{*/}
                {/*    user.photoId ?*/}
                {/*        <img style={{maxWidth: '200px', maxHeight: '200px', borderRadius: '50%'}}*/}
                {/*             src={`${BaseUrl}/attachment/download/${user.photoId}`}*/}
                {/*             alt=""/> :*/}
                {/*        <Avatar*/}
                {/*            sx={{*/}
                {/*                width: `${theme.spacing(14)}`,*/}
                {/*                height: `${theme.spacing(14)}`,*/}
                {/*                mb: 1.5,*/}
                {/*                border: `${theme.colors.alpha.white[100]} solid 4px`,*/}
                {/*                boxShadow: `0 2rem 8rem 0 ${alpha(*/}
                {/*                    theme.colors.alpha.black[100],*/}
                {/*                    0.05*/}
                {/*                )}, */}
                {/*0 0.6rem 1.6rem ${alpha(*/}
                {/*                    theme.colors.alpha.black[100],*/}
                {/*                    0.15*/}
                {/*                )}, */}
                {/*0 0.2rem 0.2rem ${alpha(*/}
                {/*                    theme.colors.alpha.black[100],*/}
                {/*                    0.1*/}
                {/*                )}`*/}
                {/*            }}*/}

                {/*            src={'/static/images/avatars/3.jpg'}*/}
                {/*        />*/}
                {/*}*/}
            </div>
        </div>
    );
}

export default connect((users, XodimReducer), {
    userInfo,
    getXodim,
})(UserProfile);

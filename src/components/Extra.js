import React, {useEffect} from 'react';

const Extra = () => {

    useEffect(() => {
        const currentURL = window.location.href;
        let full_url = new URL(currentURL);
        let url = full_url.href;
        let temp = url.replace("http://localhost:3000/authe/password-reset/%3",'');
        let code = temp.slice(6,9);
        console.log(code);
        temp = temp.replace('Fuidb=MzE&token=','');
        const token = temp.slice(0,temp.length-1);

        console.log(token);


    //     console.log(typeof (url.href))
    //     let token = url.searchParams.get("token");
    //     console.log(token)
    })
    return (
        <div>
            <h1>extra</h1>
        </div>
    );
};

export default Extra;
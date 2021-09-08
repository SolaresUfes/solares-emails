import React from 'react';
import Lottie from 'react-lottie';

import welcome from './lotties/welcome.json';
import sendEmail from './lotties/send_email.json';

export function WelcomeAnimation() {
    return (
        <Lottie 
            options={{
                loop: false,
                autoplay: true, 
                animationData: welcome,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice'
                }
            }}
            height={400}
            width={400}
        />
    )
}

export function SendEmail() {
    return (
        <Lottie 
            options={{
                loop: true,
                autoplay: true, 
                animationData: sendEmail,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice'
                }
            }}
            height={400}
            width={400}
        />
    )
}
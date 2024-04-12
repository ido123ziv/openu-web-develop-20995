import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';

function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    const checkVisibility = () => {
        setVisible(window.pageYOffset > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', checkVisibility);
        return () => {
            window.removeEventListener('scroll', checkVisibility);
        };
    }, []);

    return (
        visible && (
            <Button
                circular
                icon="arrow up"
                onClick={scrollToTop}
                color='blue'
                style={{ position: 'fixed', bottom: '20px', right: '20px' }}
            />
        )
    );
}

export default ScrollToTopButton;

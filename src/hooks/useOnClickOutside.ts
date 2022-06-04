import React, { MutableRefObject, useEffect, useRef } from 'react';

const useOnClickOutside = (
    $ref: React.MutableRefObject<HTMLElement>,
    isListening: boolean,
    handler: () => any,
) => {
    const $mouseCurrentRef = useRef<Node | null>();
    useEffect(() => {
        const handleMouseDown = (event: MouseEvent ) => {
            $mouseCurrentRef.current = event.target as Node;
            if (!($ref?.current?.contains($mouseCurrentRef.current))){
                handler();
            }
        };

        if (isListening) {
            document.addEventListener('mousedown', handleMouseDown);
        }

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    });
};

export default useOnClickOutside;

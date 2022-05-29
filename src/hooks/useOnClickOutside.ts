import { MutableRefObject, useEffect, useRef } from 'react';

const useOnClickOutside = (
    $ref: React.MutableRefObject<null>,
    isListening: boolean,
    handler: () => any,
) => {
    const $mouseCurrentRef = useRef(null);

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            // @ts-ignore
            $mouseCurrentRef.current = event.target;
            if (!$ref?.current?.contains($mouseCurrentRef.current)) {
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

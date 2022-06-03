import { MutableRefObject, useEffect, useRef } from 'react';

const useOnClickOutside = (
    $ref: React.MutableRefObject<null>,
    isListening: boolean,
    handler: () => any,
) => {
    const $mouseCurrentRef = useRef<EventTarget | null>();
    useEffect(() => {
        const handleMouseDown = (event: MouseEvent ) => {
            $mouseCurrentRef.current = event.target;
            // @ts-ignore
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

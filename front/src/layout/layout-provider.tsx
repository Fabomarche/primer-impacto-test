import { createContext, useContext, useState } from 'react';

type LayoutContextType = {
    displayMenu: boolean;
};

type Props = {
    children: JSX.Element;
};

const defaultLayoutState: LayoutContextType = {
    displayMenu: true,
};
const LayoutContext = createContext<{
    layoutState: LayoutContextType;
    setLayoutState: (layoutState: LayoutContextType) => void;
} | null>(null);

export default function LayoutProvider(props: Props) {
    const [layoutState, setLayoutState] = useState<LayoutContextType>();

    return (
        <LayoutContext.Provider value={{ layoutState: layoutState ?? defaultLayoutState, setLayoutState }}>
            {props.children}
        </LayoutContext.Provider>
    );
}

export function useLayoutContext() {
    const layoutContext = useContext(LayoutContext);

    return {
        ...(layoutContext ?? {
            layoutState: defaultLayoutState,
            setLayoutState: () => {},
        }),
        isLoaded: layoutContext !== null,
    };
}

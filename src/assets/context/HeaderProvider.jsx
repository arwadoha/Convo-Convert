import React, { createContext, useState } from "react";

export const HeaderContext = createContext(null);

const HeaderProvider = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <HeaderContext.Provider
            value={{
                open,
                setOpen,
            }}
        >
            {children}
        </HeaderContext.Provider>
    );
};

export default HeaderProvider;

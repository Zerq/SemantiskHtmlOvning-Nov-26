import React from "react";


declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name: string]: any
        }
    }
}

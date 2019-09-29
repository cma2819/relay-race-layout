
export interface ColorSet {
    main: string;
    back: string;
}

export function Red(): ColorSet {
    return {
        main: '#ffffff',
        back: '#d42d2d'
    };
}

export function Green(): ColorSet {
    return {
        main: '#ffffff',
        back: '#5BA664'
    };
}


export function Yellow(): ColorSet {
    return {
        main: '#000000',
        back: '#ffc700'
    }
}
export function Purple(): ColorSet {
    return {
        main: '#ffffff',
        back: '#69359c'
    };
}
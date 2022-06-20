export const noId = (path: string) => {
    return `No named export 'id' in ${path}.`
}

export const duplicatedName = ([first, second]: [string, string]) => {
    return `Filename should be unique. '${first} and ${second}' are duplicated.`
}

export const duplicatedId = (id: string) => {
    return `Id should be unique. '${id}' is duplicated.`
}

export const multipleStartingPoints = (paths: string[]) => {
    return `There can be only one starting point. '${paths.join(', ')}' is missing named export 'previous'.`;
}


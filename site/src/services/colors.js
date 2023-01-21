export function getColorBG(color) {
    const dic = {
        'cyan': 'bg-cyan-500 hover:bg-cyan-700',
        'indigo': 'bg-indigo-500 hover:bg-indigo-700',
        'orange': 'bg-orange-500 hover:bg-orange-700',
        'green': 'bg-green-500 hover:bg-green-700',
        'blue': 'bg-blue-500 hover:bg-blue-700'
    }
    return dic[color]
}

export function getBranchCol(branch) {
    const dic = {
        'default': 'blue',
        'Human Resources': 'cyan',
        'Product Design': 'indigo',
        'Supply Chain': 'orange',
        'Marketing': 'green'
    }
    return dic[branch]
}
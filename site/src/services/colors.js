export function getColorBG(color) {
    const dic = {
        'cyan': 'bg-cyan-500 hover:bg-cyan-700',
        'indigo': 'bg-indigo-500 hover:bg-indigo-700',
        'orange': 'bg-orange-500 hover:bg-orange-700',
        'green': 'bg-green-500 hover:bg-green-700',
        'blue': 'bg-blue-500 hover:bg-blue-700',
        
        'violet': 'bg-violet-500 hover:bg-violet-700',
        'fuchsia': 'bg-fuchsia-400 hover:bg-fuchsia-600',
        'pink': 'bg-pink-500 hover:bg-pink-700',
        'rose': 'bg-rose-500 hover:bg-rose-700',
        
        'def': 'bg-indigo-400 hover:bg-indigo-600',
    }
    return dic[color]
}

export function getBranchCol(branch) {
    const dic = {
        'default': 'def',
        /*
        'Human Resources': 'cyan',
        'Product Design': 'indigo',
        'Supply Chain': 'orange',
        'Marketing': 'green'
        */
        'Human Resources': 'violet',
        'Product Design': 'fuchsia',
        'Supply Chain': 'pink',
        'Marketing': 'rose'
    }
    return dic[branch]
}